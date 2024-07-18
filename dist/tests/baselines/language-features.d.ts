export interface Interface {
    prop: string;
    readonly readonlyProp: string;
    [test: string]: string;
}
