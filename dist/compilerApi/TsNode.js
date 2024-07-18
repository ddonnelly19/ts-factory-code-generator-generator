"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsNode = void 0;
const string_similarity_1 = require("string-similarity");
const ts_morph_1 = require("ts-morph");
const helpers_1 = require("./helpers");
class TsNode {
    factory;
    type;
    declaration;
    constructor(factory, type) {
        this.factory = factory;
        this.type = type;
        const symbol = getSymbol();
        const dec = symbol.getDeclarations()[0]; // this does return more than one for Node, but don't care...
        if (!ts_morph_1.Node.isInterfaceDeclaration(dec)) {
            throw new Error(`Expected the type ${type.getText()} to be of an interface declaration.`);
        }
        this.declaration = dec;
        function getSymbol() {
            if (type.isIntersection()) {
                return type.getIntersectionTypes()[0].getSymbolOrThrow();
            }
            const symbol = type.getSymbol();
            if (symbol == null) {
                throw new Error(`Could not find symbol for type ${type.getText()}`);
            }
            return symbol;
        }
    }
    getName() {
        return this.declaration.getName();
    }
    getPropertyForParam(param) {
        return this.factory.getNodeProperty(getExplicitProperty.call(this) || getPropertyByEstimate.call(this));
        function getExplicitProperty() {
            const propertyName = getExplicitPropertyName.call(this);
            return propertyName == null ? undefined : this.type.getProperty(propertyName);
        }
        function getExplicitPropertyName() {
            const nodeName = this.getName();
            const paramName = param.getName();
            if (nodeName === nameof() && paramName === "value") {
                return nameof(n => n.text);
            }
            if (nodeName === nameof() && paramName === "value") {
                return nameof(n => n.text);
            }
            if (nodeName === nameof() && paramName === "defaultType") {
                return nameof(n => n.default);
            }
            if ((nodeName === nameof() || nodeName === "ElementAccessChain") && paramName === "index") {
                return nameof(n => n.argumentExpression);
            }
            if ((nodeName === nameof() || nodeName === "CallChain") && paramName === "argumentsArray") {
                return nameof(n => n.arguments);
            }
            if (nodeName === nameof() && paramName === "argumentsArray") {
                return nameof(n => n.arguments);
            }
            if (nodeName === nameof() && paramName === "operator") {
                return nameof(n => n.operatorToken);
            }
            if (nodeName === "ImportTypeAssertionContainer" && paramName === "clause") {
                return "assertClause"; // nameof<ts.ImportTypeAssertionContainer>(n => n.assertClause);
            }
            return undefined;
        }
        function getPropertyByEstimate() {
            // this is good enough
            let highestScore = 0;
            let foundProp;
            for (const prop of this.type.getProperties()) {
                const score = (0, string_similarity_1.compareTwoStrings)(prop.getName(), param.getName());
                if (score > highestScore) {
                    highestScore = score;
                    foundProp = prop;
                }
            }
            if (highestScore < 0.9) {
                throw new Error(`Could not find property for parameter: ${param.getName()} (${this.getName()})`);
            }
            return foundProp;
        }
    }
    doesExtendNode(node) {
        return this.type.getBaseTypes().some(t => t === node.type);
    }
    getKindNames() {
        if (this.getName() === nameof()) {
            return [nameof(ts_morph_1.SyntaxKind.JsxAttributes)];
        }
        const kindType = this.getKindType();
        if (kindType.isUnion()) {
            return Array.from(new Set(kindType.getUnionTypes().map(t => sanitizeName(t.getText(this.declaration)))));
        }
        return [sanitizeName(kindType.getText(this.declaration))];
        function sanitizeName(name) {
            return name.replace(/SyntaxKind\./g, "");
        }
    }
    getKindType() {
        // Find the type of the "kind" property.
        const kindType = this.type.getProperty("kind").getTypeAtLocation(this.declaration);
        return (0, helpers_1.resolveTypeToTypeParamConstraintIfNecessary)(kindType, this.declaration);
    }
    getTestFunctionName() {
        const tsSymbol = this.declaration.getSourceFile().getModuleOrThrow("ts").getSymbolOrThrow();
        for (const symbol of tsSymbol.getExports()) {
            if (!symbol.getName().startsWith("is")) {
                continue;
            }
            const valueDec = symbol.getValueDeclaration();
            if (valueDec == null || !ts_morph_1.Node.isFunctionDeclaration(valueDec)) {
                continue;
            }
            // todo: use typeChecker.getTypePredicateOfSignature once wrapped in ts-morph
            // todo: use TypePedicateNode once wrapped (but prefer using getTypePredicateOfSignature)
            const returnTypeNode = valueDec.getReturnTypeNode();
            if (returnTypeNode == null || returnTypeNode.getKind() !== ts_morph_1.SyntaxKind.TypePredicate) {
                continue;
            }
            const typePredicateNode = returnTypeNode;
            const typePredicateType = typePredicateNode.getNodeProperty("type")?.getType();
            if (typePredicateType != null && this.factory.hasNode(typePredicateType)) {
                const node = this.factory.getNode(typePredicateType);
                if (node === this) {
                    return valueDec.getName();
                }
            }
        }
        throw new Error("Could not find test function name");
    }
}
exports.TsNode = TsNode;
