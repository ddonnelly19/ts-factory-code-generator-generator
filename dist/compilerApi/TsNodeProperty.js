"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsNodeProperty = void 0;
const helpers_1 = require("./helpers");
class TsNodeProperty {
    factory;
    symbol;
    type;
    declaration;
    constructor(factory, symbol) {
        this.factory = factory;
        this.symbol = symbol;
        this.declaration = symbol.getDeclarations()[0];
        this.type = this.declaration.getType();
    }
    getName() {
        return this.symbol.getName();
    }
    getType() {
        return (0, helpers_1.resolveTypeToTypeParamConstraintIfNecessary)(this.type, this.declaration.getParentOrThrow());
    }
}
exports.TsNodeProperty = TsNodeProperty;
