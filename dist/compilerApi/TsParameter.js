"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParameter = void 0;
class TsParameter {
    factory;
    parent;
    declaration;
    type;
    constructor(factory, parent, declaration) {
        this.factory = factory;
        this.parent = parent;
        this.declaration = declaration;
        this.type = declaration.getType();
    }
    getName() {
        return this.declaration.getName();
    }
    getType() {
        return this.type;
    }
    getArrayElementType() {
        const type = this.type.getNonNullableType();
        const typeText = type.getText();
        if (!typeText.endsWith("[]")) {
            return undefined;
        }
        return type.getTypeArguments()[0];
    }
    isArray() {
        return this.getArrayElementType() != null;
    }
    isLiteral() {
        return this.type.isLiteral();
    }
    isNode() {
        return this.type.getProperty("kind") != null;
    }
    isString() {
        return false;
    }
}
exports.TsParameter = TsParameter;
