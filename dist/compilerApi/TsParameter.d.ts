import { ParameterDeclaration, Type } from "ts-morph";
import { Factory } from "./Factory";
import { FactoryFunction } from "./FactoryFunction";
export declare class TsParameter {
    private readonly factory;
    private readonly parent;
    private readonly declaration;
    private readonly type;
    constructor(factory: Factory, parent: FactoryFunction, declaration: ParameterDeclaration);
    getName(): string;
    getType(): Type<import("ts-morph").ts.Type>;
    getArrayElementType(): Type<import("ts-morph").ts.Type> | undefined;
    isArray(): boolean;
    isLiteral(): boolean;
    isNode(): boolean;
    isString(): boolean;
}
