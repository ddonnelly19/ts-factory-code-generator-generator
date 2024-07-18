import { ts, Type } from "ts-morph";
import { Factory } from "./Factory";
import { TsParameter } from "./TsParameter";
export declare class TsNode {
    private readonly factory;
    private readonly type;
    private readonly declaration;
    constructor(factory: Factory, type: Type);
    getName(): string;
    getPropertyForParam(param: TsParameter): import("./TsNodeProperty").TsNodeProperty;
    doesExtendNode(node: TsNode): boolean;
    getKindNames(): string[];
    getKindType(): Type<ts.Type>;
    getTestFunctionName(): string | undefined;
}
