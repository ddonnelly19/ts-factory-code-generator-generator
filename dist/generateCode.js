"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = generateCode;
const ts_morph_1 = require("ts-morph");
const compilerApi_1 = require("./compilerApi");
function generateCode(typeScriptModuleName, path) {
    //const path = `../node_modules/${typeScriptModuleName}/lib/typescript.d.ts` as const;
    const factory = new compilerApi_1.Factory();
    const project = new ts_morph_1.Project({ compilerOptions: { strictNullChecks: true } });
    const newSourceFile = project.createSourceFile("____temp___.ts");
    const tsSourceFile = project.addSourceFileAtPath(path);
    const tsSymbol = tsSourceFile.getModuleOrThrow("ts").getSymbolOrThrow();
    const nodeFactory = tsSymbol.getExport("NodeFactory");
    const ts = require(path);
    const kindToFactoryFunctions = getKindToFactoryFunctions();
    newSourceFile.addStatements([{
            kind: ts_morph_1.StructureKind.ImportDeclaration,
            defaultImport: "CodeBlockWriter",
            moduleSpecifier: "code-block-writer",
        }, {
            kind: ts_morph_1.StructureKind.Function,
            isExported: true,
            name: "generateFactoryCode",
            parameters: [{ name: "ts", type: `typeof import("${typeScriptModuleName}")` }, { name: "initialNode", type: getTsTypeText("Node") }],
            statements: [
                writer => {
                    writer.writeLine(`const writer = new CodeBlockWriter({ newLine: "\\n", indentNumberOfSpaces: 2 });`);
                    writer.writeLine("const syntaxKindToName = createSyntaxKindToNameMap();");
                    writer.blankLine();
                    writer.write("if (ts.isSourceFile(initialNode))").block(() => {
                        writer.writeLine(`writer.write("[");`);
                        writer.write("if (initialNode.statements.length > 0)").block(() => {
                            writer.write("writer.indent(() => ").inlineBlock(() => {
                                writer.write("for (let i = 0; i < initialNode.statements.length; i++)").block(() => {
                                    writer.writeLine("const statement = initialNode.statements[i];");
                                    writer.writeLine("if (i > 0)");
                                    writer.indent().write(`writer.write(",").newLine();`).newLine();
                                    writer.writeLine(`writeNodeText(statement);`);
                                });
                            }).write(").newLine();");
                        });
                        writer.writeLine(`writer.write("];");`);
                    });
                    writer.write("else").block(() => {
                        writer.writeLine("writeNodeText(initialNode);");
                    });
                    writer.writeLine("writer.newLineIfLastNot();");
                    writer.blankLine().writeLine("return writer.toString();");
                },
                writeNodeTextFunction(),
                writeNodeTextForTypeNodeFunction(),
                ...Array.from(new Set(Array.from(kindToFactoryFunctions.values()).reduce((a, b) => [...a, ...b], []))).map(getFunctionStructure),
                getSyntaxKindToNameFunction(),
                getNodeFlagValuesFunction(),
                getFlagValuesAsStringFunction(),
                getFlagValuesFunction(),
            ],
        }]);
    return newSourceFile.getFullText();
    function getKindToFactoryFunctions() {
        const map = new Map();
        for (const func of getInternal()) {
            for (const name of func.getKindNames()) {
                let factoryFunctions;
                if (map.has(name)) {
                    if (isAllowedDuplicateFactoryFunction(func)) {
                        factoryFunctions = map.get(name);
                    }
                    else {
                        throw new Error(`Found duplicate name: ${name} (existing: ${map.get(name).map(f => f.getName())}, new: ${func.getName()})`);
                    }
                }
                else {
                    factoryFunctions = [];
                    map.set(name, factoryFunctions);
                }
                factoryFunctions.push(func);
            }
        }
        return map;
        function* getInternal() {
            const searchSymbols = nodeFactory == null ? tsSymbol.getExports() : nodeFactory.getMembers();
            for (const symbol of searchSymbols) {
                if (!symbol.getName().startsWith("create")) {
                    continue;
                }
                const decls = symbol.getDeclarations();
                const valueDec = decls.find(decl => {
                    if (!ts_morph_1.Node.isFunctionDeclaration(decl) && !ts_morph_1.Node.isMethodSignature(decl)) {
                        return false;
                    }
                    const hasDeprecated = decl.getJsDocs().some(s => s.getTags().some(t => t.getTagName() === "deprecated"));
                    return !hasDeprecated;
                });
                if (valueDec == null || !ts_morph_1.Node.isFunctionDeclaration(valueDec) && !ts_morph_1.Node.isMethodSignature(valueDec)) {
                    continue;
                }
                const returnType = valueDec.getReturnType();
                if (returnType.getProperty("kind") == null) {
                    continue;
                }
                // console.log(symbol.getName() + ": " + returnType.getText());
                const factoryFunction = factory.getFactoryFunction(valueDec);
                if (isAllowedFactoryFunction(factoryFunction)) {
                    yield factoryFunction;
                }
            }
        }
    }
    function writeNodeTextFunction() {
        return {
            kind: ts_morph_1.StructureKind.Function,
            name: "writeNodeText",
            parameters: [{ name: "node", type: getTsTypeText("Node") }],
            statements: writer => {
                writer.write("switch (node.kind)").block(() => {
                    for (const [syntaxKindName, factoryFuncs] of kindToFactoryFunctions.entries()) {
                        if (factoryFuncs.length === 1) {
                            const factoryFunc = factoryFuncs[0];
                            writer.writeLine(`case ts.SyntaxKind.${syntaxKindName}:`);
                            writer.indent(() => {
                                writeFunctionCall(writer, factoryFunc);
                                writer.write("return;").newLine();
                            });
                        }
                        else if (factoryFuncs.length === 2) {
                            writer.writeLine(`case ts.SyntaxKind.${syntaxKindName}:`);
                            writer.indent(() => {
                                factoryFuncs.sort((a, b) => {
                                    if (a.getNode().doesExtendNode(b.getNode())) {
                                        return -1;
                                    }
                                    if (b.getNode().doesExtendNode(a.getNode())) {
                                        return 1;
                                    }
                                    else {
                                        throw new Error(`Unhandled scenario where neither ${a.getNode().getName()} or `
                                            + `${b.getNode().getName()} extended each other`);
                                    }
                                });
                                for (const factoryFunc of factoryFuncs) {
                                    if (factoryFunc.getKindNames().length !== 1) {
                                        throw new Error(`Unexpected: Factory function had more than one kind name ${factoryFunc.getName()}`);
                                    }
                                    writer.write(`if (ts.${factoryFunc.getNode().getTestFunctionName()}(node))`).block(() => {
                                        writeFunctionCall(writer, factoryFunc);
                                        writer.write("return;");
                                    });
                                }
                                writer.write(`throw new Error("Unhandled node: " + node.getText());`);
                            });
                        }
                    }
                    writer.writeLine(`default:`);
                    writer.indent(() => {
                        writer.write("if (node.kind >= ts.SyntaxKind.FirstToken && node.kind <= ts.SyntaxKind.LastToken)").block(() => {
                            writer.writeLine(`writer.write("${getFactoryName()}.createToken(ts.SyntaxKind.").write(syntaxKindToName[node.kind]).write(")");`);
                            writer.writeLine("return;");
                        });
                        writer.writeLine(`writer.write("/* Unhandled node kind: ").write(syntaxKindToName[node.kind]).write(" */")`);
                    });
                });
            },
        };
        function writeFunctionCall(writer, factoryFunc) {
            writer.write(`${factoryFunc.getName()}(node as ${getTsTypeText(factoryFunc.getNode().getName())});`).newLine();
        }
    }
    function writeNodeTextForTypeNodeFunction() {
        return {
            kind: ts_morph_1.StructureKind.Function,
            name: "writeNodeTextForTypeNode",
            parameters: [{ name: "node", type: getTsTypeText("TypeNode") }],
            statements: writer => {
                writer.write("if (node.kind >= ts.SyntaxKind.FirstKeyword && node.kind <= ts.SyntaxKind.LastKeyword)").block(() => {
                    writer.writeLine(`writer.write("${getFactoryName()}.createKeywordTypeNode(ts.SyntaxKind.").write(syntaxKindToName[node.kind]).write(")");`);
                }).write("else").block(() => {
                    writer.writeLine("writeNodeText(node);");
                });
            },
        };
    }
    function getFunctionStructure(func) {
        return {
            kind: ts_morph_1.StructureKind.Function,
            name: func.getName(),
            parameters: [{ name: "node", type: getTsTypeText(func.getNode().getName()) }],
            statements: writer => printBody(writer),
        };
        function printBody(writer) {
            const params = func.getParameters();
            writer.write(`writer.write("`);
            if (nodeFactory == null) {
                writer.write("ts"); // ts < 4.0 before API change
            }
            else {
                writer.write("factory");
            }
            writer.write(`.${func.getName()}(");`).newLine();
            if (params.length === 1) {
                printParamText(writer, params[0]);
            }
            else if (params.length > 1) {
                writer.writeLine(`writer.newLine();`);
                writer.write("writer.indent(() => ").inlineBlock(() => {
                    for (let i = 0; i < params.length; i++) {
                        const param = params[i];
                        if (i > 0) {
                            writer.writeLine(`writer.write(",").newLine();`);
                        }
                        printParamText(writer, param);
                    }
                }).write(");").newLine();
            }
            writer.writeLine(`writer.write(")");`);
        }
        function printParamText(writer, param) {
            if (writeCustomParamText(writer, func, param)) {
                return;
            }
            const prop = func.getNode().getPropertyForParam(param);
            const propAccess = `node.${prop.getName()}`;
            const propType = prop.getType();
            writeNullableIfNecessary(writer, propType, propAccess, () => writeTypeText());
            function writeTypeText() {
                if (param.isArray()) {
                    const arrayElementType = param.getArrayElementType();
                    writeArrayText(writer, propAccess, () => writeTextForType("item", arrayElementType));
                }
                else {
                    writeTextForType(propAccess, propType.getNonNullableType());
                }
            }
            // todo: rename
            function writeTextForType(text, type) {
                if (isNodeTypeNodeType()) {
                    writer.write(`writeNodeTextForTypeNode(${text})`);
                }
                else if (isNodeType()) {
                    writer.write(`writeNodeText(${text})`);
                }
                else if (isSyntaxKindType()) {
                    writer.write(`writer.write("ts.SyntaxKind.").write(syntaxKindToName[${text}])`);
                }
                else if (type.isString() || type.isStringLiteral()) {
                    writer.write(`writer.quote(${text}.toString())`);
                }
                else if (type.isBoolean() || type.isBooleanLiteral()) {
                    writer.write(`writer.write(${text}.toString())`);
                }
                else if (type.getText().endsWith(".NodeFlags")) {
                    writer.write(`writer.write(getNodeFlagValues(${text} || 0));`);
                }
                else {
                    console.error(`Could not find text for param ${func.getName()}::${param.getName()} -- ${type.getText()}`);
                    writer.write(`writer.write("/* unknown */")`);
                }
                function isSyntaxKindType() {
                    // good enough...
                    return isSyntaxKind(type) || type.getUnionTypes().some(isSyntaxKind);
                    function isSyntaxKind(t) {
                        return (t.isEnum() || t.isEnumLiteral()) && t.getText().includes(".SyntaxKind");
                    }
                }
                function isNodeTypeNodeType() {
                    return isNodeType() && type.getText().endsWith(".TypeNode");
                }
                function isNodeType() {
                    // always default to using the node union type
                    return type.getProperty("kind") != null
                        || type.getUnionTypes().some(t => t.getProperty("kind") != null);
                }
            }
        }
    }
    function getSyntaxKindToNameFunction() {
        return {
            kind: ts_morph_1.StructureKind.Function,
            name: "createSyntaxKindToNameMap",
            statements: writer => {
                writer.writeLine("const map: { [kind: number]: string } = {};");
                writer.write("for (const name of Object.keys(ts.SyntaxKind).filter(k => isNaN(parseInt(k, 10))))").block(() => {
                    writer.writeLine(`const value = (ts.SyntaxKind as any)[name] as number;`);
                    writer.writeLine(`if (map[value] == null)`);
                    writer.indent().write(`map[value] = name;`).newLine();
                });
                writer.write("return map;");
            },
        };
    }
    function getNodeFlagValuesFunction() {
        return {
            kind: ts_morph_1.StructureKind.Function,
            name: "getNodeFlagValues",
            parameters: [{ name: "value", type: "number" }],
            statements: writer => {
                writer.writeLine("// ignore the BlockScoped node flag");
                writer.writeLine(`return getFlagValuesAsString(ts.NodeFlags, "ts.NodeFlags", `
                    + `value || 0, "None", getFlagValues(ts.NodeFlags, value).filter(v => v !== ts.NodeFlags.BlockScoped));`);
            },
        };
    }
    function getFlagValuesAsStringFunction() {
        return {
            kind: ts_morph_1.StructureKind.Function,
            name: "getFlagValuesAsString",
            parameters: [
                { name: "enumObj", type: "any" },
                { name: "enumName", type: "string" },
                { name: "value", type: "number" },
                { name: "defaultName", type: "string" },
                { name: "flagValues", hasQuestionToken: true, type: "number[]" },
            ],
            statements: writer => {
                writer.writeLine("flagValues = flagValues || getFlagValues(enumObj, value);");
                writer.writeLine("const members: string[] = [];");
                writer.writeLine("for (const flagValue of flagValues)");
                writer.indent().write(`members.push(enumName + "." + enumObj[flagValue]);`).newLine();
                writer.writeLine("if (members.length === 0)");
                writer.indent().write(`members.push(enumName + "." + defaultName);`).newLine();
                writer.writeLine(`return members.join(" | ");`);
            },
        };
    }
    function getFlagValuesFunction() {
        return {
            kind: ts_morph_1.StructureKind.Function,
            name: "getFlagValues",
            parameters: [
                { name: "enumObj", type: "any" },
                { name: "value", type: "number" },
            ],
            statements: writer => {
                writer.writeLine("const members: number[] = [];");
                writer.write("for (const prop in enumObj)").block(() => {
                    writer.writeLine(`if (typeof enumObj[prop] === "string")`);
                    writer.indent().write("continue;").newLine();
                    writer.writeLine("if ((enumObj[prop] & value) !== 0)");
                    writer.indent().write(`members.push(enumObj[prop]);`).newLine();
                });
                writer.writeLine(`return members;`);
            },
        };
    }
    function getTsTypeText(typeText) {
        return `import("${typeScriptModuleName}").${typeText}`;
    }
    function writeCustomParamText(writer, func, param) {
        const funcName = func.getName();
        const paramName = param.getName();
        const initialLength = writer.getLength();
        const isPropertyDecl = funcName === nameof(ts.createProperty) || funcName === nameof(f => f.createPropertyDeclaration);
        if (isPropertyDecl && paramName === "questionOrExclamationToken") {
            writer.writeLine("if (node.questionToken != null)");
            writer.indent().write(`writer.write("${getFactoryName()}.createToken(ts.SyntaxKind.QuestionToken)");`).newLine();
            writer.writeLine("else if (node.exclamationToken != null)");
            writer.indent().write(`writer.write("${getFactoryName()}.createToken(ts.SyntaxKind.ExclamationToken)");`).newLine();
            writer.writeLine("else");
            writer.indent().write(`writer.write("undefined");`).newLine();
        }
        const isMultiLineFunc = funcName === nameof(ts.createObjectLiteral)
            || funcName === nameof(ts.createArrayLiteral)
            || funcName === nameof(ts.createBlock)
            || funcName === nameof(f => f.createObjectLiteralExpression)
            || funcName === nameof(f => f.createArrayLiteralExpression);
        if (isMultiLineFunc && paramName === "multiLine") {
            writer.write("writer.write(((node as any).multiLine || false).toString())");
        }
        // if (paramName === "modifiers") {
        //   writeNullableIfNecessary(writer, param.getType(), "node.modifiers", () => {
        //     writeArrayText(
        //       writer,
        //       "node.modifiers",
        //       () => writer.writeLine(`writer.write("${getFactoryName()}.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");`),
        //     );
        //   });
        // }
        return writer.getLength() !== initialLength;
    }
    function writeArrayText(writer, propAccess, writeItemText) {
        writer.writeLine(`writer.write("[");`);
        writer.write(`if (${propAccess}.length === 1)`).block(() => {
            writer.writeLine(`const item = ${propAccess}![0];`);
            writeItemText();
        });
        writer.write(`else if (${propAccess}.length > 1)`).block(() => {
            writer.write("writer.indent(() => ").inlineBlock(() => {
                writer.write(`for (let i = 0; i < ${propAccess}!.length; i++)`).block(() => {
                    writer.write(`const item = ${propAccess}![i];`);
                    writer.writeLine("if (i > 0)");
                    writer.indent().write(`writer.write(",").newLine();`).newLine();
                    writeItemText();
                });
            }).write(");").newLine();
        });
        writer.writeLine(`writer.write("]");`);
    }
    function writeNullableIfNecessary(writer, type, propAccess, writeTypeText) {
        if (type.isNullable()) {
            writer.writeLine(`if (${propAccess} == null)`);
            writer.indent().write(`writer.write("undefined");`).newLine();
            writer.write("else").block(() => {
                writeTypeText();
            });
        }
        else {
            writeTypeText();
        }
    }
    function getFactoryName() {
        if (nodeFactory == null) {
            return "ts";
        }
        else {
            return "factory";
        }
    }
    function isAllowedFactoryFunction(func) {
        const name = func.getName();
        if (name.startsWith("createJSDoc")) {
            return false;
        }
        // some of these could probably be figured out by inspecting
        // the code, but this is the lazy way to do it... I'll just
        // manually maintain this list.
        switch (func.getName()) {
            // handled by createTrue, createFalse, createBigIntLiteral, createNumericLiteral
            case nameof(ts.createLiteral):
            // handled by createVoid
            case nameof(ts.createVoidZero):
            // handled by createBinary
            case nameof(ts.createAssignment):
            case nameof(n => n.createBitwiseAnd):
            case nameof(n => n.createBitwiseNot):
            case nameof(n => n.createBitwiseOr):
            case nameof(n => n.createBitwiseXor):
            case nameof(n => n.createDivide):
            case nameof(n => n.createExponent):
            case nameof(n => n.createModulo):
            case nameof(n => n.createEquality):
            case nameof(n => n.createInequality):
            case nameof(n => n.createStrictEquality):
            case nameof(n => n.createLessThan):
            case nameof(n => n.createLessThanEquals):
            case nameof(n => n.createGreaterThan):
            case nameof(n => n.createGreaterThanEquals):
            case nameof(n => n.createLeftShift):
            case nameof(n => n.createRightShift):
            case nameof(n => n.createUnsignedRightShift):
            case nameof(n => n.createMultiply):
            case nameof(ts.createLogicalAnd):
            case nameof(ts.createLogicalOr):
            case nameof(ts.createLogicalNot):
            case nameof(ts.createAdd):
            case nameof(ts.createSubtract):
            case nameof(ts.createStrictEquality):
            case nameof(ts.createStrictInequality):
            case nameof(ts.createLessThan):
            case nameof(ts.createComma):
            // handled by createCall
            case nameof(ts.createImmediatelyInvokedFunctionExpression):
            case nameof(ts.createImmediatelyInvokedArrowFunction):
            // handled by createPrefixUnaryExpression
            case nameof(n => n.createPrefixDecrement):
            case nameof(n => n.createPrefixIncrement):
            case nameof(n => n.createPrefixMinus):
            case nameof(n => n.createPrefixPlus):
            // handled by createPostfixUnaryExpression
            case nameof(n => n.createPostfixDecrement):
            case nameof(n => n.createPostfixIncrement):
            // handled by createUnionTypeNode and createIntersectionTypeNode
            case "createUnionOrIntersectionTypeNode": // doesn't exist anymore in 4.0?
            // handled by createPostfix
            case nameof(ts.createPostfixIncrement):
            // handled by createExportDeclaration
            case nameof(ts.createExternalModuleExport):
            // handled by createExportAssignment
            case nameof(ts.createExportDefault):
            // handled by createBinary
            case "createNullishCoalesce": // nameof(ts.createNullishCoalesce):
            // handled by other more specific functions
            case "createJSDocTag": // todo: nameof
            // handled by createStringLiteral
            case nameof(ts.createStringLiteralFromNode):
            // not used
            case nameof(ts.createNode):
            case nameof(ts.createSourceFile):
            case nameof(ts.createLanguageServiceSourceFile):
            case nameof(ts.createTempVariable):
            case nameof(ts.createLoopVariable):
            case nameof(ts.createUniqueName):
            case nameof(ts.createOptimisticUniqueName):
            case nameof(ts.createFileLevelUniqueName):
            case nameof(ts.createModifiersFromModifierFlags):
            case nameof(ts.createInputFiles):
            case nameof(ts.createBundle):
            case nameof(ts.createUnparsedSourceFile):
            case nameof(ts.createNotEmittedStatement):
            case nameof(ts.createPartiallyEmittedExpression):
            case "createUniquePrivateName": // handled by createPrivateIdentifier
            // custom handled
            case nameof(ts.createToken):
            case nameof(ts.createModifier):
                return false;
            // only use this if the new createTypePredicateNodeWithModifier function doesn't exist
            case nameof(ts.createTypePredicateNode):
                // todo: nameof
                return tsSymbol.getExport("createTypePredicateNodeWithModifier") == null;
            // deprecated
            case "createJSDocParamTag":
                // todo: nameof
                return tsSymbol.getExport("createJSDocParameterTag") == null;
        }
        return true;
    }
    function isAllowedDuplicateFactoryFunction(func) {
        // todo: nameof
        switch (func.getName()) {
            case "createPropertyAccess":
            case "createPropertyAccessChain":
                return true;
            case "createElementAccess":
            case "createElementAccessChain":
                return true;
            case "createCall":
            case "createCallChain":
                return true;
            case "createNonNullExpression":
            case "createNonNullChain":
                return true;
        }
        return false;
    }
}
