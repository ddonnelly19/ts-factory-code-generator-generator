import { Symbol, Type } from "ts-morph";
import { Factory } from "./Factory";
export declare class TsNodeProperty {
    private readonly factory;
    private readonly symbol;
    private readonly type;
    private readonly declaration;
    constructor(factory: Factory, symbol: Symbol);
    getName(): string;
    getType(): Type<import("ts-morph").ts.Type>;
}
