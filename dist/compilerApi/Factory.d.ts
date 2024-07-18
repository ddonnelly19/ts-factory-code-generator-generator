import { FunctionDeclaration, MethodSignature, Symbol, Type } from "ts-morph";
import { FactoryFunction } from "./FactoryFunction";
import { TsNode } from "./TsNode";
import { TsNodeProperty } from "./TsNodeProperty";
export declare class Factory {
    private readonly factoryFunctions;
    private readonly nodes;
    private readonly nodeProperties;
    getFactoryFunction(declaration: FunctionDeclaration | MethodSignature): FactoryFunction;
    getNode(type: Type): TsNode;
    hasNode(type: Type): boolean;
    getNodeProperty(symbol: Symbol): TsNodeProperty;
}
