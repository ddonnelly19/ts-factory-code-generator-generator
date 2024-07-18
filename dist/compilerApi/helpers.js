"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTypeToTypeParamConstraintIfNecessary = resolveTypeToTypeParamConstraintIfNecessary;
const ts_morph_1 = require("ts-morph");
function resolveTypeToTypeParamConstraintIfNecessary(type, declaration) {
    if (!ts_morph_1.Node.isTypeParametered(declaration)) {
        return type;
    }
    const typeText = type.getText(declaration);
    const typeParams = declaration.getTypeParameters();
    const typeParam = typeParams.find(p => p.getName() === typeText);
    if (typeParam != null) {
        return typeParam.getConstraintOrThrow().getType();
    }
    return type;
}
