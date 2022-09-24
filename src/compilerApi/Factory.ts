import { FunctionDeclaration, MethodSignature, Symbol, Type } from "ts-morph";
import { FactoryFunction } from "./FactoryFunction";
import { TsNode } from "./TsNode";
import { TsNodeProperty } from "./TsNodeProperty";

export class Factory {
  private readonly factoryFunctions = new Map<FunctionDeclaration | MethodSignature, FactoryFunction>();
  private readonly nodes = new Map<Type, TsNode>();
  private readonly nodeProperties = new Map<Symbol, TsNodeProperty>();

  getFactoryFunction(declaration: FunctionDeclaration | MethodSignature) {
    let func = this.factoryFunctions.get(declaration);
    if (func == null) {
      func = new FactoryFunction(this, declaration);
      this.factoryFunctions.set(declaration, func);
    }
    return func;
  }

  getNode(type: Type) {
    let node = this.nodes.get(type);
    if (node == null) {
      node = new TsNode(this, type);
      this.nodes.set(type, node);
    }
    return node;
  }

  hasNode(type: Type) {
    return this.nodes.has(type);
  }

  getNodeProperty(symbol: Symbol) {
    let prop = this.nodeProperties.get(symbol);
    if (prop == null) {
      prop = new TsNodeProperty(this, symbol);
      this.nodeProperties.set(symbol, prop);
    }
    return prop;
  }
}
