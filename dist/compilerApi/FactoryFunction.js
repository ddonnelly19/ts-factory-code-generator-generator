"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryFunction = void 0;
const ts_morph_1 = require("ts-morph");
const TsParameter_1 = require("./TsParameter");
// It will be a method signature in TS 4.0
class FactoryFunction {
    factory;
    declaration;
    constructor(factory, declaration) {
        this.factory = factory;
        this.declaration = declaration;
    }
    getName() {
        if (ts_morph_1.Node.isFunctionDeclaration(this.declaration)) {
            return this.declaration.getNameOrThrow();
        }
        return this.declaration.getName();
    }
    getParameters() {
        const params = this.declaration.getParameters().map(p => new TsParameter_1.TsParameter(this.factory, this, p));
        if (this.getName() === "createNumericLiteral") {
            return params.filter(p => p.getName() !== "numericLiteralFlags");
        }
        if (this.getName() === "createStringLiteral") {
            return params.filter(p => p.getName() !== "isSingleQuote");
        }
        if (this.getName() === "createTemplateHead" || this.getName() === "createTemplateMiddle"
            || this.getName() === "createTemplateTail") {
            return params.filter(p => p.getName() !== "templateFlags");
        }
        return params;
    }
    getNode() {
        return this.factory.getNode(this.declaration.getReturnType());
    }
    getKindNames() {
        const kindNames = this.getNode().getKindNames();
        if (this.getName() === "createKeywordTypeNode") {
            return kindNames.filter(kindName => {
                switch (kindName) {
                    case nameof(ts_morph_1.SyntaxKind.NullKeyword): // use createNull
                    case nameof(ts_morph_1.SyntaxKind.ThisKeyword): // use createThis
                    case nameof(ts_morph_1.SyntaxKind.VoidKeyword): // use createVoid
                        return false;
                    default:
                        return true;
                }
            });
        }
        return kindNames;
    }
}
exports.FactoryFunction = FactoryFunction;
