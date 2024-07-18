"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const FactoryFunction_1 = require("./FactoryFunction");
const TsNode_1 = require("./TsNode");
const TsNodeProperty_1 = require("./TsNodeProperty");
class Factory {
    factoryFunctions = new Map();
    nodes = new Map();
    nodeProperties = new Map();
    getFactoryFunction(declaration) {
        let func = this.factoryFunctions.get(declaration);
        if (func == null) {
            func = new FactoryFunction_1.FactoryFunction(this, declaration);
            this.factoryFunctions.set(declaration, func);
        }
        return func;
    }
    getNode(type) {
        let node = this.nodes.get(type);
        if (node == null) {
            node = new TsNode_1.TsNode(this, type);
            this.nodes.set(type, node);
        }
        return node;
    }
    hasNode(type) {
        return this.nodes.has(type);
    }
    getNodeProperty(symbol) {
        let prop = this.nodeProperties.get(symbol);
        if (prop == null) {
            prop = new TsNodeProperty_1.TsNodeProperty(this, symbol);
            this.nodeProperties.set(symbol, prop);
        }
        return prop;
    }
}
exports.Factory = Factory;
