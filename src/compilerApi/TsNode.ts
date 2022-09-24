import { compareTwoStrings } from "string-similarity";
import { InterfaceDeclaration, Node, Symbol, SyntaxKind, ts, Type, TypeNode } from "ts-morph";
import { Factory } from "./Factory";
import { resolveTypeToTypeParamConstraintIfNecessary } from "./helpers";
import { TsParameter } from "./TsParameter";

export class TsNode {
  private readonly declaration: InterfaceDeclaration;

  constructor(private readonly factory: Factory, private readonly type: Type) {
    const symbol = getSymbol();
    const dec = symbol.getDeclarations()[0]; // this does return more than one for Node, but don't care...

    if (!Node.isInterfaceDeclaration(dec)) {
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

  getPropertyForParam(param: TsParameter) {
    return this.factory.getNodeProperty(getExplicitProperty.call(this) || getPropertyByEstimate.call(this));

    function getExplicitProperty(this: TsNode) {
      const propertyName = getExplicitPropertyName.call(this);
      return propertyName == null ? undefined : this.type.getProperty(propertyName);
    }

    function getExplicitPropertyName(this: TsNode) {
      const nodeName = this.getName();
      const paramName = param.getName();

      if (nodeName === nameof<ts.NumericLiteral>() && paramName === "value") {
        return nameof<ts.NumericLiteral>(n => n.text);
      }
      if (nodeName === nameof<ts.BigIntLiteral>() && paramName === "value") {
        return nameof<ts.BigIntLiteral>(n => n.text);
      }
      if (nodeName === nameof<ts.TypeParameterDeclaration>() && paramName === "defaultType") {
        return nameof<ts.TypeParameterDeclaration>(n => n.default);
      }
      if ((nodeName === nameof<ts.ElementAccessExpression>() || nodeName === "ElementAccessChain") && paramName === "index") {
        return nameof<ts.ElementAccessExpression>(n => n.argumentExpression);
      }
      if ((nodeName === nameof<ts.CallExpression>() || nodeName === "CallChain") && paramName === "argumentsArray") {
        return nameof<ts.CallExpression>(n => n.arguments);
      }
      if (nodeName === nameof<ts.NewExpression>() && paramName === "argumentsArray") {
        return nameof<ts.NewExpression>(n => n.arguments);
      }
      if (nodeName === nameof<ts.BinaryExpression>() && paramName === "operator") {
        return nameof<ts.BinaryExpression>(n => n.operatorToken);
      }
      if (nodeName === "ImportTypeAssertionContainer" && paramName === "clause") {
        return "assertClause"; // nameof<ts.ImportTypeAssertionContainer>(n => n.assertClause);
      }

      return undefined;
    }

    function getPropertyByEstimate(this: TsNode) {
      // this is good enough
      let highestScore = 0;
      let foundProp: Symbol | undefined;
      for (const prop of this.type.getProperties()) {
        const score = compareTwoStrings(prop.getName(), param.getName());
        if (score > highestScore) {
          highestScore = score;
          foundProp = prop;
        }
      }

      if (highestScore < 0.9) {
        throw new Error(`Could not find property for parameter: ${param.getName()} (${this.getName()})`);
      }

      return foundProp!;
    }
  }

  doesExtendNode(node: TsNode) {
    return this.type.getBaseTypes().some(t => t === node.type);
  }

  getKindNames() {
    if (this.getName() === nameof<ts.JsxAttributes>()) {
      return [nameof(SyntaxKind.JsxAttributes)];
    }

    const kindType = this.getKindType();

    if (kindType.isUnion()) {
      return Array.from(new Set(kindType.getUnionTypes().map(t => sanitizeName(t.getText(this.declaration)))));
    }

    return [sanitizeName(kindType.getText(this.declaration))];

    function sanitizeName(name: string) {
      return name.replace(/SyntaxKind\./g, "");
    }
  }

  getKindType() {
    // Find the type of the "kind" property.
    const kindType = this.type.getProperty("kind")!.getTypeAtLocation(this.declaration);
    return resolveTypeToTypeParamConstraintIfNecessary(kindType, this.declaration);
  }

  getTestFunctionName() {
    const tsSymbol = this.declaration.getSourceFile().getModuleOrThrow("ts").getSymbolOrThrow();
    for (const symbol of tsSymbol.getExports()) {
      if (!symbol.getName().startsWith("is")) {
        continue;
      }
      const valueDec = symbol.getValueDeclaration();
      if (valueDec == null || !Node.isFunctionDeclaration(valueDec)) {
        continue;
      }
      // todo: use typeChecker.getTypePredicateOfSignature once wrapped in ts-morph
      // todo: use TypePedicateNode once wrapped (but prefer using getTypePredicateOfSignature)
      const returnTypeNode = valueDec.getReturnTypeNode();
      if (returnTypeNode == null || returnTypeNode.getKind() !== SyntaxKind.TypePredicate) {
        continue;
      }
      const typePredicateNode = returnTypeNode as any as TypeNode<ts.TypePredicateNode>;
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
