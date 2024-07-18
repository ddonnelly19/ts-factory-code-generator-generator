import { FunctionDeclaration, MethodSignature } from "ts-morph";
import { Factory } from "./Factory";
import { TsParameter } from "./TsParameter";
export declare class FactoryFunction {
    private readonly factory;
    private readonly declaration;
    constructor(factory: Factory, declaration: FunctionDeclaration | MethodSignature);
    getName(): string;
    getParameters(): TsParameter[];
    getNode(): import("./TsNode").TsNode;
    getKindNames(): string[];
}
