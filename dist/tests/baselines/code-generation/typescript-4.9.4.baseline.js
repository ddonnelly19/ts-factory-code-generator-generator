"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFactoryCode = generateFactoryCode;
const code_block_writer_1 = __importDefault(require("code-block-writer"));
function generateFactoryCode(ts, initialNode) {
    const writer = new code_block_writer_1.default({ newLine: "\n", indentNumberOfSpaces: 2 });
    const syntaxKindToName = createSyntaxKindToNameMap();
    if (ts.isSourceFile(initialNode)) {
        writer.write("[");
        if (initialNode.statements.length > 0) {
            writer.indent(() => {
                for (let i = 0; i < initialNode.statements.length; i++) {
                    const statement = initialNode.statements[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(statement);
                }
            }).newLine();
        }
        writer.write("];");
    }
    else {
        writeNodeText(initialNode);
    }
    writer.newLineIfLastNot();
    return writer.toString();
    function writeNodeText(node) {
        switch (node.kind) {
            case ts.SyntaxKind.NumericLiteral:
                createNumericLiteral(node);
                return;
            case ts.SyntaxKind.BigIntLiteral:
                createBigIntLiteral(node);
                return;
            case ts.SyntaxKind.StringLiteral:
                createStringLiteral(node);
                return;
            case ts.SyntaxKind.RegularExpressionLiteral:
                createRegularExpressionLiteral(node);
                return;
            case ts.SyntaxKind.Identifier:
                createIdentifier(node);
                return;
            case ts.SyntaxKind.PrivateIdentifier:
                createPrivateIdentifier(node);
                return;
            case ts.SyntaxKind.SuperKeyword:
                createSuper(node);
                return;
            case ts.SyntaxKind.ThisKeyword:
                createThis(node);
                return;
            case ts.SyntaxKind.NullKeyword:
                createNull(node);
                return;
            case ts.SyntaxKind.TrueKeyword:
                createTrue(node);
                return;
            case ts.SyntaxKind.FalseKeyword:
                createFalse(node);
                return;
            case ts.SyntaxKind.QualifiedName:
                createQualifiedName(node);
                return;
            case ts.SyntaxKind.ComputedPropertyName:
                createComputedPropertyName(node);
                return;
            case ts.SyntaxKind.TypeParameter:
                createTypeParameterDeclaration(node);
                return;
            case ts.SyntaxKind.Parameter:
                createParameterDeclaration(node);
                return;
            case ts.SyntaxKind.Decorator:
                createDecorator(node);
                return;
            case ts.SyntaxKind.PropertySignature:
                createPropertySignature(node);
                return;
            case ts.SyntaxKind.PropertyDeclaration:
                createPropertyDeclaration(node);
                return;
            case ts.SyntaxKind.MethodSignature:
                createMethodSignature(node);
                return;
            case ts.SyntaxKind.MethodDeclaration:
                createMethodDeclaration(node);
                return;
            case ts.SyntaxKind.Constructor:
                createConstructorDeclaration(node);
                return;
            case ts.SyntaxKind.GetAccessor:
                createGetAccessorDeclaration(node);
                return;
            case ts.SyntaxKind.SetAccessor:
                createSetAccessorDeclaration(node);
                return;
            case ts.SyntaxKind.CallSignature:
                createCallSignature(node);
                return;
            case ts.SyntaxKind.ConstructSignature:
                createConstructSignature(node);
                return;
            case ts.SyntaxKind.IndexSignature:
                createIndexSignature(node);
                return;
            case ts.SyntaxKind.TemplateLiteralTypeSpan:
                createTemplateLiteralTypeSpan(node);
                return;
            case ts.SyntaxKind.ClassStaticBlockDeclaration:
                createClassStaticBlockDeclaration(node);
                return;
            case ts.SyntaxKind.AnyKeyword:
                createKeywordTypeNode(node);
                return;
            case ts.SyntaxKind.BooleanKeyword:
                createKeywordTypeNode(node);
                return;
            case ts.SyntaxKind.IntrinsicKeyword:
                createKeywordTypeNode(node);
                return;
            case ts.SyntaxKind.NeverKeyword:
                createKeywordTypeNode(node);
                return;
            case ts.SyntaxKind.NumberKeyword:
                createKeywordTypeNode(node);
                return;
            case ts.SyntaxKind.ObjectKeyword:
                createKeywordTypeNode(node);
                return;
            case ts.SyntaxKind.StringKeyword:
                createKeywordTypeNode(node);
                return;
            case ts.SyntaxKind.SymbolKeyword:
                createKeywordTypeNode(node);
                return;
            case ts.SyntaxKind.UndefinedKeyword:
                createKeywordTypeNode(node);
                return;
            case ts.SyntaxKind.UnknownKeyword:
                createKeywordTypeNode(node);
                return;
            case ts.SyntaxKind.BigIntKeyword:
                createKeywordTypeNode(node);
                return;
            case ts.SyntaxKind.TypeReference:
                createTypeReferenceNode(node);
                return;
            case ts.SyntaxKind.FunctionType:
                createFunctionTypeNode(node);
                return;
            case ts.SyntaxKind.ConstructorType:
                createConstructorTypeNode(node);
                return;
            case ts.SyntaxKind.TypeQuery:
                createTypeQueryNode(node);
                return;
            case ts.SyntaxKind.TypeLiteral:
                createTypeLiteralNode(node);
                return;
            case ts.SyntaxKind.ArrayType:
                createArrayTypeNode(node);
                return;
            case ts.SyntaxKind.TupleType:
                createTupleTypeNode(node);
                return;
            case ts.SyntaxKind.NamedTupleMember:
                createNamedTupleMember(node);
                return;
            case ts.SyntaxKind.OptionalType:
                createOptionalTypeNode(node);
                return;
            case ts.SyntaxKind.RestType:
                createRestTypeNode(node);
                return;
            case ts.SyntaxKind.UnionType:
                createUnionTypeNode(node);
                return;
            case ts.SyntaxKind.IntersectionType:
                createIntersectionTypeNode(node);
                return;
            case ts.SyntaxKind.ConditionalType:
                createConditionalTypeNode(node);
                return;
            case ts.SyntaxKind.InferType:
                createInferTypeNode(node);
                return;
            case ts.SyntaxKind.ImportType:
                createImportTypeNode(node);
                return;
            case ts.SyntaxKind.ParenthesizedType:
                createParenthesizedType(node);
                return;
            case ts.SyntaxKind.ThisType:
                createThisTypeNode(node);
                return;
            case ts.SyntaxKind.TypeOperator:
                createTypeOperatorNode(node);
                return;
            case ts.SyntaxKind.IndexedAccessType:
                createIndexedAccessTypeNode(node);
                return;
            case ts.SyntaxKind.MappedType:
                createMappedTypeNode(node);
                return;
            case ts.SyntaxKind.LiteralType:
                createLiteralTypeNode(node);
                return;
            case ts.SyntaxKind.TemplateLiteralType:
                createTemplateLiteralType(node);
                return;
            case ts.SyntaxKind.ObjectBindingPattern:
                createObjectBindingPattern(node);
                return;
            case ts.SyntaxKind.ArrayBindingPattern:
                createArrayBindingPattern(node);
                return;
            case ts.SyntaxKind.BindingElement:
                createBindingElement(node);
                return;
            case ts.SyntaxKind.ArrayLiteralExpression:
                createArrayLiteralExpression(node);
                return;
            case ts.SyntaxKind.ObjectLiteralExpression:
                createObjectLiteralExpression(node);
                return;
            case ts.SyntaxKind.PropertyAccessExpression:
                if (ts.isPropertyAccessChain(node)) {
                    createPropertyAccessChain(node);
                    return;
                }
                if (ts.isPropertyAccessExpression(node)) {
                    createPropertyAccessExpression(node);
                    return;
                }
                throw new Error("Unhandled node: " + node.getText());
            case ts.SyntaxKind.ElementAccessExpression:
                if (ts.isElementAccessChain(node)) {
                    createElementAccessChain(node);
                    return;
                }
                if (ts.isElementAccessExpression(node)) {
                    createElementAccessExpression(node);
                    return;
                }
                throw new Error("Unhandled node: " + node.getText());
            case ts.SyntaxKind.CallExpression:
                if (ts.isCallChain(node)) {
                    createCallChain(node);
                    return;
                }
                if (ts.isCallExpression(node)) {
                    createCallExpression(node);
                    return;
                }
                throw new Error("Unhandled node: " + node.getText());
            case ts.SyntaxKind.NewExpression:
                createNewExpression(node);
                return;
            case ts.SyntaxKind.TaggedTemplateExpression:
                createTaggedTemplateExpression(node);
                return;
            case ts.SyntaxKind.TypeAssertionExpression:
                createTypeAssertion(node);
                return;
            case ts.SyntaxKind.ParenthesizedExpression:
                createParenthesizedExpression(node);
                return;
            case ts.SyntaxKind.FunctionExpression:
                createFunctionExpression(node);
                return;
            case ts.SyntaxKind.ArrowFunction:
                createArrowFunction(node);
                return;
            case ts.SyntaxKind.DeleteExpression:
                createDeleteExpression(node);
                return;
            case ts.SyntaxKind.TypeOfExpression:
                createTypeOfExpression(node);
                return;
            case ts.SyntaxKind.VoidExpression:
                createVoidExpression(node);
                return;
            case ts.SyntaxKind.AwaitExpression:
                createAwaitExpression(node);
                return;
            case ts.SyntaxKind.PrefixUnaryExpression:
                createPrefixUnaryExpression(node);
                return;
            case ts.SyntaxKind.PostfixUnaryExpression:
                createPostfixUnaryExpression(node);
                return;
            case ts.SyntaxKind.BinaryExpression:
                createBinaryExpression(node);
                return;
            case ts.SyntaxKind.ConditionalExpression:
                createConditionalExpression(node);
                return;
            case ts.SyntaxKind.TemplateExpression:
                createTemplateExpression(node);
                return;
            case ts.SyntaxKind.TemplateHead:
                createTemplateHead(node);
                return;
            case ts.SyntaxKind.TemplateMiddle:
                createTemplateMiddle(node);
                return;
            case ts.SyntaxKind.TemplateTail:
                createTemplateTail(node);
                return;
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                createNoSubstitutionTemplateLiteral(node);
                return;
            case ts.SyntaxKind.YieldExpression:
                createYieldExpression(node);
                return;
            case ts.SyntaxKind.SpreadElement:
                createSpreadElement(node);
                return;
            case ts.SyntaxKind.ClassExpression:
                createClassExpression(node);
                return;
            case ts.SyntaxKind.OmittedExpression:
                createOmittedExpression(node);
                return;
            case ts.SyntaxKind.ExpressionWithTypeArguments:
                createExpressionWithTypeArguments(node);
                return;
            case ts.SyntaxKind.AsExpression:
                createAsExpression(node);
                return;
            case ts.SyntaxKind.NonNullExpression:
                if (ts.isNonNullChain(node)) {
                    createNonNullChain(node);
                    return;
                }
                if (ts.isNonNullExpression(node)) {
                    createNonNullExpression(node);
                    return;
                }
                throw new Error("Unhandled node: " + node.getText());
            case ts.SyntaxKind.MetaProperty:
                createMetaProperty(node);
                return;
            case ts.SyntaxKind.SatisfiesExpression:
                createSatisfiesExpression(node);
                return;
            case ts.SyntaxKind.TemplateSpan:
                createTemplateSpan(node);
                return;
            case ts.SyntaxKind.SemicolonClassElement:
                createSemicolonClassElement(node);
                return;
            case ts.SyntaxKind.Block:
                createBlock(node);
                return;
            case ts.SyntaxKind.VariableStatement:
                createVariableStatement(node);
                return;
            case ts.SyntaxKind.EmptyStatement:
                createEmptyStatement(node);
                return;
            case ts.SyntaxKind.ExpressionStatement:
                createExpressionStatement(node);
                return;
            case ts.SyntaxKind.IfStatement:
                createIfStatement(node);
                return;
            case ts.SyntaxKind.DoStatement:
                createDoStatement(node);
                return;
            case ts.SyntaxKind.WhileStatement:
                createWhileStatement(node);
                return;
            case ts.SyntaxKind.ForStatement:
                createForStatement(node);
                return;
            case ts.SyntaxKind.ForInStatement:
                createForInStatement(node);
                return;
            case ts.SyntaxKind.ForOfStatement:
                createForOfStatement(node);
                return;
            case ts.SyntaxKind.ContinueStatement:
                createContinueStatement(node);
                return;
            case ts.SyntaxKind.BreakStatement:
                createBreakStatement(node);
                return;
            case ts.SyntaxKind.ReturnStatement:
                createReturnStatement(node);
                return;
            case ts.SyntaxKind.WithStatement:
                createWithStatement(node);
                return;
            case ts.SyntaxKind.SwitchStatement:
                createSwitchStatement(node);
                return;
            case ts.SyntaxKind.LabeledStatement:
                createLabeledStatement(node);
                return;
            case ts.SyntaxKind.ThrowStatement:
                createThrowStatement(node);
                return;
            case ts.SyntaxKind.TryStatement:
                createTryStatement(node);
                return;
            case ts.SyntaxKind.DebuggerStatement:
                createDebuggerStatement(node);
                return;
            case ts.SyntaxKind.VariableDeclaration:
                createVariableDeclaration(node);
                return;
            case ts.SyntaxKind.VariableDeclarationList:
                createVariableDeclarationList(node);
                return;
            case ts.SyntaxKind.FunctionDeclaration:
                createFunctionDeclaration(node);
                return;
            case ts.SyntaxKind.ClassDeclaration:
                createClassDeclaration(node);
                return;
            case ts.SyntaxKind.InterfaceDeclaration:
                createInterfaceDeclaration(node);
                return;
            case ts.SyntaxKind.TypeAliasDeclaration:
                createTypeAliasDeclaration(node);
                return;
            case ts.SyntaxKind.EnumDeclaration:
                createEnumDeclaration(node);
                return;
            case ts.SyntaxKind.ModuleDeclaration:
                createModuleDeclaration(node);
                return;
            case ts.SyntaxKind.ModuleBlock:
                createModuleBlock(node);
                return;
            case ts.SyntaxKind.CaseBlock:
                createCaseBlock(node);
                return;
            case ts.SyntaxKind.NamespaceExportDeclaration:
                createNamespaceExportDeclaration(node);
                return;
            case ts.SyntaxKind.ImportEqualsDeclaration:
                createImportEqualsDeclaration(node);
                return;
            case ts.SyntaxKind.ImportDeclaration:
                createImportDeclaration(node);
                return;
            case ts.SyntaxKind.ImportClause:
                createImportClause(node);
                return;
            case ts.SyntaxKind.AssertClause:
                createAssertClause(node);
                return;
            case ts.SyntaxKind.AssertEntry:
                createAssertEntry(node);
                return;
            case ts.SyntaxKind.ImportTypeAssertionContainer:
                createImportTypeAssertionContainer(node);
                return;
            case ts.SyntaxKind.NamespaceImport:
                createNamespaceImport(node);
                return;
            case ts.SyntaxKind.NamespaceExport:
                createNamespaceExport(node);
                return;
            case ts.SyntaxKind.NamedImports:
                createNamedImports(node);
                return;
            case ts.SyntaxKind.ImportSpecifier:
                createImportSpecifier(node);
                return;
            case ts.SyntaxKind.ExportAssignment:
                createExportAssignment(node);
                return;
            case ts.SyntaxKind.ExportDeclaration:
                createExportDeclaration(node);
                return;
            case ts.SyntaxKind.NamedExports:
                createNamedExports(node);
                return;
            case ts.SyntaxKind.ExportSpecifier:
                createExportSpecifier(node);
                return;
            case ts.SyntaxKind.ExternalModuleReference:
                createExternalModuleReference(node);
                return;
            case ts.SyntaxKind.JsxElement:
                createJsxElement(node);
                return;
            case ts.SyntaxKind.JsxSelfClosingElement:
                createJsxSelfClosingElement(node);
                return;
            case ts.SyntaxKind.JsxOpeningElement:
                createJsxOpeningElement(node);
                return;
            case ts.SyntaxKind.JsxClosingElement:
                createJsxClosingElement(node);
                return;
            case ts.SyntaxKind.JsxFragment:
                createJsxFragment(node);
                return;
            case ts.SyntaxKind.JsxText:
                createJsxText(node);
                return;
            case ts.SyntaxKind.JsxOpeningFragment:
                createJsxOpeningFragment(node);
                return;
            case ts.SyntaxKind.JsxClosingFragment:
                createJsxJsxClosingFragment(node);
                return;
            case ts.SyntaxKind.JsxAttribute:
                createJsxAttribute(node);
                return;
            case ts.SyntaxKind.JsxAttributes:
                createJsxAttributes(node);
                return;
            case ts.SyntaxKind.JsxSpreadAttribute:
                createJsxSpreadAttribute(node);
                return;
            case ts.SyntaxKind.JsxExpression:
                createJsxExpression(node);
                return;
            case ts.SyntaxKind.CaseClause:
                createCaseClause(node);
                return;
            case ts.SyntaxKind.DefaultClause:
                createDefaultClause(node);
                return;
            case ts.SyntaxKind.HeritageClause:
                createHeritageClause(node);
                return;
            case ts.SyntaxKind.CatchClause:
                createCatchClause(node);
                return;
            case ts.SyntaxKind.PropertyAssignment:
                createPropertyAssignment(node);
                return;
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                createShorthandPropertyAssignment(node);
                return;
            case ts.SyntaxKind.SpreadAssignment:
                createSpreadAssignment(node);
                return;
            case ts.SyntaxKind.EnumMember:
                createEnumMember(node);
                return;
            case ts.SyntaxKind.CommaListExpression:
                createCommaListExpression(node);
                return;
            default:
                if (node.kind >= ts.SyntaxKind.FirstToken && node.kind <= ts.SyntaxKind.LastToken) {
                    writer.write("factory.createToken(ts.SyntaxKind.").write(syntaxKindToName[node.kind]).write(")");
                    return;
                }
                writer.write("/* Unhandled node kind: ").write(syntaxKindToName[node.kind]).write(" */");
        }
    }
    function writeNodeTextForTypeNode(node) {
        if (node.kind >= ts.SyntaxKind.FirstKeyword && node.kind <= ts.SyntaxKind.LastKeyword) {
            writer.write("factory.createKeywordTypeNode(ts.SyntaxKind.").write(syntaxKindToName[node.kind]).write(")");
        }
        else {
            writeNodeText(node);
        }
    }
    function createNumericLiteral(node) {
        writer.write("factory.createNumericLiteral(");
        writer.quote(node.text.toString());
        writer.write(")");
    }
    function createBigIntLiteral(node) {
        writer.write("factory.createBigIntLiteral(");
        writer.quote(node.text.toString());
        writer.write(")");
    }
    function createStringLiteral(node) {
        writer.write("factory.createStringLiteral(");
        writer.quote(node.text.toString());
        writer.write(")");
    }
    function createRegularExpressionLiteral(node) {
        writer.write("factory.createRegularExpressionLiteral(");
        writer.quote(node.text.toString());
        writer.write(")");
    }
    function createIdentifier(node) {
        writer.write("factory.createIdentifier(");
        writer.quote(node.text.toString());
        writer.write(")");
    }
    function createPrivateIdentifier(node) {
        writer.write("factory.createPrivateIdentifier(");
        writer.quote(node.text.toString());
        writer.write(")");
    }
    function createSuper(node) {
        writer.write("factory.createSuper(");
        writer.write(")");
    }
    function createThis(node) {
        writer.write("factory.createThis(");
        writer.write(")");
    }
    function createNull(node) {
        writer.write("factory.createNull(");
        writer.write(")");
    }
    function createTrue(node) {
        writer.write("factory.createTrue(");
        writer.write(")");
    }
    function createFalse(node) {
        writer.write("factory.createFalse(");
        writer.write(")");
    }
    function createQualifiedName(node) {
        writer.write("factory.createQualifiedName(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.left);
            writer.write(",").newLine();
            writeNodeText(node.right);
        });
        writer.write(")");
    }
    function createComputedPropertyName(node) {
        writer.write("factory.createComputedPropertyName(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createTypeParameterDeclaration(node) {
        writer.write("factory.createTypeParameterDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.constraint == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.constraint);
            }
            writer.write(",").newLine();
            if (node.default == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.default);
            }
        });
        writer.write(")");
    }
    function createParameterDeclaration(node) {
        writer.write("factory.createParameterDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.dotDotDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.dotDotDotToken);
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken);
            }
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer);
            }
        });
        writer.write(")");
    }
    function createDecorator(node) {
        writer.write("factory.createDecorator(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createPropertySignature(node) {
        writer.write("factory.createPropertySignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken);
            }
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
        });
        writer.write(")");
    }
    function createPropertyDeclaration(node) {
        writer.write("factory.createPropertyDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.questionToken != null)
                writer.write("factory.createToken(ts.SyntaxKind.QuestionToken)");
            else if (node.exclamationToken != null)
                writer.write("factory.createToken(ts.SyntaxKind.ExclamationToken)");
            else
                writer.write("undefined");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer);
            }
        });
        writer.write(")");
    }
    function createMethodSignature(node) {
        writer.write("factory.createMethodSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken);
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
        });
        writer.write(")");
    }
    function createMethodDeclaration(node) {
        writer.write("factory.createMethodDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.asteriskToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.asteriskToken);
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken);
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body);
            }
        });
        writer.write(")");
    }
    function createConstructorDeclaration(node) {
        writer.write("factory.createConstructorDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body);
            }
        });
        writer.write(")");
    }
    function createGetAccessorDeclaration(node) {
        writer.write("factory.createGetAccessorDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body);
            }
        });
        writer.write(")");
    }
    function createSetAccessorDeclaration(node) {
        writer.write("factory.createSetAccessorDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body);
            }
        });
        writer.write(")");
    }
    function createCallSignature(node) {
        writer.write("factory.createCallSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
        });
        writer.write(")");
    }
    function createConstructSignature(node) {
        writer.write("factory.createConstructSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
        });
        writer.write(")");
    }
    function createIndexSignature(node) {
        writer.write("factory.createIndexSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type);
        });
        writer.write(")");
    }
    function createTemplateLiteralTypeSpan(node) {
        writer.write("factory.createTemplateLiteralTypeSpan(");
        writer.newLine();
        writer.indent(() => {
            writeNodeTextForTypeNode(node.type);
            writer.write(",").newLine();
            writeNodeText(node.literal);
        });
        writer.write(")");
    }
    function createClassStaticBlockDeclaration(node) {
        writer.write("factory.createClassStaticBlockDeclaration(");
        writeNodeText(node.body);
        writer.write(")");
    }
    function createKeywordTypeNode(node) {
        writer.write("factory.createKeywordTypeNode(");
        writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.kind]);
        writer.write(")");
    }
    function createTypeReferenceNode(node) {
        writer.write("factory.createTypeReferenceNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.typeName);
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments[0];
                    writeNodeTextForTypeNode(item);
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments.length; i++) {
                            const item = node.typeArguments[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item);
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }
    function createFunctionTypeNode(node) {
        writer.write("factory.createFunctionTypeNode(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type);
        });
        writer.write(")");
    }
    function createConstructorTypeNode(node) {
        writer.write("factory.createConstructorTypeNode(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type);
        });
        writer.write(")");
    }
    function createTypeQueryNode(node) {
        writer.write("factory.createTypeQueryNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.exprName);
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments[0];
                    writeNodeTextForTypeNode(item);
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments.length; i++) {
                            const item = node.typeArguments[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item);
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }
    function createTypeLiteralNode(node) {
        writer.write("factory.createTypeLiteralNode(");
        writer.write("[");
        if (node.members.length === 1) {
            const item = node.members[0];
            writeNodeText(item);
        }
        else if (node.members.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.members.length; i++) {
                    const item = node.members[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createArrayTypeNode(node) {
        writer.write("factory.createArrayTypeNode(");
        writeNodeTextForTypeNode(node.elementType);
        writer.write(")");
    }
    function createTupleTypeNode(node) {
        writer.write("factory.createTupleTypeNode(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements[0];
            writeNodeText(item);
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements.length; i++) {
                    const item = node.elements[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createNamedTupleMember(node) {
        writer.write("factory.createNamedTupleMember(");
        writer.newLine();
        writer.indent(() => {
            if (node.dotDotDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.dotDotDotToken);
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken);
            }
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type);
        });
        writer.write(")");
    }
    function createOptionalTypeNode(node) {
        writer.write("factory.createOptionalTypeNode(");
        writeNodeTextForTypeNode(node.type);
        writer.write(")");
    }
    function createRestTypeNode(node) {
        writer.write("factory.createRestTypeNode(");
        writeNodeTextForTypeNode(node.type);
        writer.write(")");
    }
    function createUnionTypeNode(node) {
        writer.write("factory.createUnionTypeNode(");
        writer.write("[");
        if (node.types.length === 1) {
            const item = node.types[0];
            writeNodeTextForTypeNode(item);
        }
        else if (node.types.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.types.length; i++) {
                    const item = node.types[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeTextForTypeNode(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createIntersectionTypeNode(node) {
        writer.write("factory.createIntersectionTypeNode(");
        writer.write("[");
        if (node.types.length === 1) {
            const item = node.types[0];
            writeNodeTextForTypeNode(item);
        }
        else if (node.types.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.types.length; i++) {
                    const item = node.types[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeTextForTypeNode(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createConditionalTypeNode(node) {
        writer.write("factory.createConditionalTypeNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeTextForTypeNode(node.checkType);
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.extendsType);
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.trueType);
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.falseType);
        });
        writer.write(")");
    }
    function createInferTypeNode(node) {
        writer.write("factory.createInferTypeNode(");
        writeNodeText(node.typeParameter);
        writer.write(")");
    }
    function createImportTypeNode(node) {
        writer.write("factory.createImportTypeNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeTextForTypeNode(node.argument);
            writer.write(",").newLine();
            if (node.assertions == null)
                writer.write("undefined");
            else {
                writeNodeText(node.assertions);
            }
            writer.write(",").newLine();
            if (node.qualifier == null)
                writer.write("undefined");
            else {
                writeNodeText(node.qualifier);
            }
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments[0];
                    writeNodeTextForTypeNode(item);
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments.length; i++) {
                            const item = node.typeArguments[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write(node.isTypeOf.toString());
        });
        writer.write(")");
    }
    function createParenthesizedType(node) {
        writer.write("factory.createParenthesizedType(");
        writeNodeTextForTypeNode(node.type);
        writer.write(")");
    }
    function createThisTypeNode(node) {
        writer.write("factory.createThisTypeNode(");
        writer.write(")");
    }
    function createTypeOperatorNode(node) {
        writer.write("factory.createTypeOperatorNode(");
        writer.newLine();
        writer.indent(() => {
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.operator]);
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type);
        });
        writer.write(")");
    }
    function createIndexedAccessTypeNode(node) {
        writer.write("factory.createIndexedAccessTypeNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeTextForTypeNode(node.objectType);
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.indexType);
        });
        writer.write(")");
    }
    function createMappedTypeNode(node) {
        writer.write("factory.createMappedTypeNode(");
        writer.newLine();
        writer.indent(() => {
            if (node.readonlyToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.readonlyToken);
            }
            writer.write(",").newLine();
            writeNodeText(node.typeParameter);
            writer.write(",").newLine();
            if (node.nameType == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.nameType);
            }
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken);
            }
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
            writer.write(",").newLine();
            if (node.members == null)
                writer.write("undefined");
            else {
                writer.write("/* unknown */");
            }
        });
        writer.write(")");
    }
    function createLiteralTypeNode(node) {
        writer.write("factory.createLiteralTypeNode(");
        writeNodeText(node.literal);
        writer.write(")");
    }
    function createTemplateLiteralType(node) {
        writer.write("factory.createTemplateLiteralType(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.head);
            writer.write(",").newLine();
            writer.write("[");
            if (node.templateSpans.length === 1) {
                const item = node.templateSpans[0];
                writeNodeText(item);
            }
            else if (node.templateSpans.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.templateSpans.length; i++) {
                        const item = node.templateSpans[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }
    function createObjectBindingPattern(node) {
        writer.write("factory.createObjectBindingPattern(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements[0];
            writeNodeText(item);
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements.length; i++) {
                    const item = node.elements[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createArrayBindingPattern(node) {
        writer.write("factory.createArrayBindingPattern(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements[0];
            writeNodeText(item);
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements.length; i++) {
                    const item = node.elements[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createBindingElement(node) {
        writer.write("factory.createBindingElement(");
        writer.newLine();
        writer.indent(() => {
            if (node.dotDotDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.dotDotDotToken);
            }
            writer.write(",").newLine();
            if (node.propertyName == null)
                writer.write("undefined");
            else {
                writeNodeText(node.propertyName);
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer);
            }
        });
        writer.write(")");
    }
    function createArrayLiteralExpression(node) {
        writer.write("factory.createArrayLiteralExpression(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.elements.length === 1) {
                const item = node.elements[0];
                writeNodeText(item);
            }
            else if (node.elements.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.elements.length; i++) {
                        const item = node.elements[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write((node.multiLine || false).toString());
        });
        writer.write(")");
    }
    function createObjectLiteralExpression(node) {
        writer.write("factory.createObjectLiteralExpression(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.properties.length === 1) {
                const item = node.properties[0];
                writeNodeText(item);
            }
            else if (node.properties.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.properties.length; i++) {
                        const item = node.properties[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write((node.multiLine || false).toString());
        });
        writer.write(")");
    }
    function createPropertyAccessExpression(node) {
        writer.write("factory.createPropertyAccessExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writeNodeText(node.name);
        });
        writer.write(")");
    }
    function createPropertyAccessChain(node) {
        writer.write("factory.createPropertyAccessChain(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            if (node.questionDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionDotToken);
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
        });
        writer.write(")");
    }
    function createElementAccessExpression(node) {
        writer.write("factory.createElementAccessExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writeNodeText(node.argumentExpression);
        });
        writer.write(")");
    }
    function createElementAccessChain(node) {
        writer.write("factory.createElementAccessChain(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            if (node.questionDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionDotToken);
            }
            writer.write(",").newLine();
            writeNodeText(node.argumentExpression);
        });
        writer.write(")");
    }
    function createCallExpression(node) {
        writer.write("factory.createCallExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments[0];
                    writeNodeTextForTypeNode(item);
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments.length; i++) {
                            const item = node.typeArguments[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.arguments.length === 1) {
                const item = node.arguments[0];
                writeNodeText(item);
            }
            else if (node.arguments.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.arguments.length; i++) {
                        const item = node.arguments[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }
    function createCallChain(node) {
        writer.write("factory.createCallChain(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            if (node.questionDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionDotToken);
            }
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments[0];
                    writeNodeTextForTypeNode(item);
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments.length; i++) {
                            const item = node.typeArguments[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.arguments.length === 1) {
                const item = node.arguments[0];
                writeNodeText(item);
            }
            else if (node.arguments.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.arguments.length; i++) {
                        const item = node.arguments[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }
    function createNewExpression(node) {
        writer.write("factory.createNewExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments[0];
                    writeNodeTextForTypeNode(item);
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments.length; i++) {
                            const item = node.typeArguments[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.arguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.arguments.length === 1) {
                    const item = node.arguments[0];
                    writeNodeText(item);
                }
                else if (node.arguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.arguments.length; i++) {
                            const item = node.arguments[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }
    function createTaggedTemplateExpression(node) {
        writer.write("factory.createTaggedTemplateExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.tag);
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments[0];
                    writeNodeTextForTypeNode(item);
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments.length; i++) {
                            const item = node.typeArguments[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.template);
        });
        writer.write(")");
    }
    function createTypeAssertion(node) {
        writer.write("factory.createTypeAssertion(");
        writer.newLine();
        writer.indent(() => {
            writeNodeTextForTypeNode(node.type);
            writer.write(",").newLine();
            writeNodeText(node.expression);
        });
        writer.write(")");
    }
    function createParenthesizedExpression(node) {
        writer.write("factory.createParenthesizedExpression(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createFunctionExpression(node) {
        writer.write("factory.createFunctionExpression(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.asteriskToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.asteriskToken);
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name);
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
            writer.write(",").newLine();
            writeNodeText(node.body);
        });
        writer.write(")");
    }
    function createArrowFunction(node) {
        writer.write("factory.createArrowFunction(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
            writer.write(",").newLine();
            writeNodeText(node.equalsGreaterThanToken);
            writer.write(",").newLine();
            writeNodeText(node.body);
        });
        writer.write(")");
    }
    function createDeleteExpression(node) {
        writer.write("factory.createDeleteExpression(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createTypeOfExpression(node) {
        writer.write("factory.createTypeOfExpression(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createVoidExpression(node) {
        writer.write("factory.createVoidExpression(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createAwaitExpression(node) {
        writer.write("factory.createAwaitExpression(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createPrefixUnaryExpression(node) {
        writer.write("factory.createPrefixUnaryExpression(");
        writer.newLine();
        writer.indent(() => {
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.operator]);
            writer.write(",").newLine();
            writeNodeText(node.operand);
        });
        writer.write(")");
    }
    function createPostfixUnaryExpression(node) {
        writer.write("factory.createPostfixUnaryExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.operand);
            writer.write(",").newLine();
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.operator]);
        });
        writer.write(")");
    }
    function createBinaryExpression(node) {
        writer.write("factory.createBinaryExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.left);
            writer.write(",").newLine();
            writeNodeText(node.operatorToken);
            writer.write(",").newLine();
            writeNodeText(node.right);
        });
        writer.write(")");
    }
    function createConditionalExpression(node) {
        writer.write("factory.createConditionalExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.condition);
            writer.write(",").newLine();
            writeNodeText(node.questionToken);
            writer.write(",").newLine();
            writeNodeText(node.whenTrue);
            writer.write(",").newLine();
            writeNodeText(node.colonToken);
            writer.write(",").newLine();
            writeNodeText(node.whenFalse);
        });
        writer.write(")");
    }
    function createTemplateExpression(node) {
        writer.write("factory.createTemplateExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.head);
            writer.write(",").newLine();
            writer.write("[");
            if (node.templateSpans.length === 1) {
                const item = node.templateSpans[0];
                writeNodeText(item);
            }
            else if (node.templateSpans.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.templateSpans.length; i++) {
                        const item = node.templateSpans[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }
    function createTemplateHead(node) {
        writer.write("factory.createTemplateHead(");
        writer.newLine();
        writer.indent(() => {
            writer.quote(node.text.toString());
            writer.write(",").newLine();
            if (node.rawText == null)
                writer.write("undefined");
            else {
                writer.quote(node.rawText.toString());
            }
        });
        writer.write(")");
    }
    function createTemplateMiddle(node) {
        writer.write("factory.createTemplateMiddle(");
        writer.newLine();
        writer.indent(() => {
            writer.quote(node.text.toString());
            writer.write(",").newLine();
            if (node.rawText == null)
                writer.write("undefined");
            else {
                writer.quote(node.rawText.toString());
            }
        });
        writer.write(")");
    }
    function createTemplateTail(node) {
        writer.write("factory.createTemplateTail(");
        writer.newLine();
        writer.indent(() => {
            writer.quote(node.text.toString());
            writer.write(",").newLine();
            if (node.rawText == null)
                writer.write("undefined");
            else {
                writer.quote(node.rawText.toString());
            }
        });
        writer.write(")");
    }
    function createNoSubstitutionTemplateLiteral(node) {
        writer.write("factory.createNoSubstitutionTemplateLiteral(");
        writer.newLine();
        writer.indent(() => {
            writer.quote(node.text.toString());
            writer.write(",").newLine();
            if (node.rawText == null)
                writer.write("undefined");
            else {
                writer.quote(node.rawText.toString());
            }
        });
        writer.write(")");
    }
    function createYieldExpression(node) {
        writer.write("factory.createYieldExpression(");
        writer.newLine();
        writer.indent(() => {
            if (node.asteriskToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.asteriskToken);
            }
            writer.write(",").newLine();
            if (node.expression == null)
                writer.write("undefined");
            else {
                writeNodeText(node.expression);
            }
        });
        writer.write(")");
    }
    function createSpreadElement(node) {
        writer.write("factory.createSpreadElement(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createClassExpression(node) {
        writer.write("factory.createClassExpression(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name);
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.heritageClauses == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.heritageClauses.length === 1) {
                    const item = node.heritageClauses[0];
                    writeNodeText(item);
                }
                else if (node.heritageClauses.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.heritageClauses.length; i++) {
                            const item = node.heritageClauses[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members[0];
                writeNodeText(item);
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members.length; i++) {
                        const item = node.members[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }
    function createOmittedExpression(node) {
        writer.write("factory.createOmittedExpression(");
        writer.write(")");
    }
    function createExpressionWithTypeArguments(node) {
        writer.write("factory.createExpressionWithTypeArguments(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments[0];
                    writeNodeTextForTypeNode(item);
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments.length; i++) {
                            const item = node.typeArguments[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item);
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }
    function createAsExpression(node) {
        writer.write("factory.createAsExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type);
        });
        writer.write(")");
    }
    function createNonNullExpression(node) {
        writer.write("factory.createNonNullExpression(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createNonNullChain(node) {
        writer.write("factory.createNonNullChain(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createMetaProperty(node) {
        writer.write("factory.createMetaProperty(");
        writer.newLine();
        writer.indent(() => {
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.keywordToken]);
            writer.write(",").newLine();
            writeNodeText(node.name);
        });
        writer.write(")");
    }
    function createSatisfiesExpression(node) {
        writer.write("factory.createSatisfiesExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type);
        });
        writer.write(")");
    }
    function createTemplateSpan(node) {
        writer.write("factory.createTemplateSpan(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writeNodeText(node.literal);
        });
        writer.write(")");
    }
    function createSemicolonClassElement(node) {
        writer.write("factory.createSemicolonClassElement(");
        writer.write(")");
    }
    function createBlock(node) {
        writer.write("factory.createBlock(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.statements.length === 1) {
                const item = node.statements[0];
                writeNodeText(item);
            }
            else if (node.statements.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.statements.length; i++) {
                        const item = node.statements[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write((node.multiLine || false).toString());
        });
        writer.write(")");
    }
    function createVariableStatement(node) {
        writer.write("factory.createVariableStatement(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.declarationList);
        });
        writer.write(")");
    }
    function createEmptyStatement(node) {
        writer.write("factory.createEmptyStatement(");
        writer.write(")");
    }
    function createExpressionStatement(node) {
        writer.write("factory.createExpressionStatement(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createIfStatement(node) {
        writer.write("factory.createIfStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writeNodeText(node.thenStatement);
            writer.write(",").newLine();
            if (node.elseStatement == null)
                writer.write("undefined");
            else {
                writeNodeText(node.elseStatement);
            }
        });
        writer.write(")");
    }
    function createDoStatement(node) {
        writer.write("factory.createDoStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.statement);
            writer.write(",").newLine();
            writeNodeText(node.expression);
        });
        writer.write(")");
    }
    function createWhileStatement(node) {
        writer.write("factory.createWhileStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writeNodeText(node.statement);
        });
        writer.write(")");
    }
    function createForStatement(node) {
        writer.write("factory.createForStatement(");
        writer.newLine();
        writer.indent(() => {
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer);
            }
            writer.write(",").newLine();
            if (node.condition == null)
                writer.write("undefined");
            else {
                writeNodeText(node.condition);
            }
            writer.write(",").newLine();
            if (node.incrementor == null)
                writer.write("undefined");
            else {
                writeNodeText(node.incrementor);
            }
            writer.write(",").newLine();
            writeNodeText(node.statement);
        });
        writer.write(")");
    }
    function createForInStatement(node) {
        writer.write("factory.createForInStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.initializer);
            writer.write(",").newLine();
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writeNodeText(node.statement);
        });
        writer.write(")");
    }
    function createForOfStatement(node) {
        writer.write("factory.createForOfStatement(");
        writer.newLine();
        writer.indent(() => {
            if (node.awaitModifier == null)
                writer.write("undefined");
            else {
                writeNodeText(node.awaitModifier);
            }
            writer.write(",").newLine();
            writeNodeText(node.initializer);
            writer.write(",").newLine();
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writeNodeText(node.statement);
        });
        writer.write(")");
    }
    function createContinueStatement(node) {
        writer.write("factory.createContinueStatement(");
        if (node.label == null)
            writer.write("undefined");
        else {
            writeNodeText(node.label);
        }
        writer.write(")");
    }
    function createBreakStatement(node) {
        writer.write("factory.createBreakStatement(");
        if (node.label == null)
            writer.write("undefined");
        else {
            writeNodeText(node.label);
        }
        writer.write(")");
    }
    function createReturnStatement(node) {
        writer.write("factory.createReturnStatement(");
        if (node.expression == null)
            writer.write("undefined");
        else {
            writeNodeText(node.expression);
        }
        writer.write(")");
    }
    function createWithStatement(node) {
        writer.write("factory.createWithStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writeNodeText(node.statement);
        });
        writer.write(")");
    }
    function createSwitchStatement(node) {
        writer.write("factory.createSwitchStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writeNodeText(node.caseBlock);
        });
        writer.write(")");
    }
    function createLabeledStatement(node) {
        writer.write("factory.createLabeledStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.label);
            writer.write(",").newLine();
            writeNodeText(node.statement);
        });
        writer.write(")");
    }
    function createThrowStatement(node) {
        writer.write("factory.createThrowStatement(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createTryStatement(node) {
        writer.write("factory.createTryStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.tryBlock);
            writer.write(",").newLine();
            if (node.catchClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.catchClause);
            }
            writer.write(",").newLine();
            if (node.finallyBlock == null)
                writer.write("undefined");
            else {
                writeNodeText(node.finallyBlock);
            }
        });
        writer.write(")");
    }
    function createDebuggerStatement(node) {
        writer.write("factory.createDebuggerStatement(");
        writer.write(")");
    }
    function createVariableDeclaration(node) {
        writer.write("factory.createVariableDeclaration(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.exclamationToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.exclamationToken);
            }
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer);
            }
        });
        writer.write(")");
    }
    function createVariableDeclarationList(node) {
        writer.write("factory.createVariableDeclarationList(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.declarations.length === 1) {
                const item = node.declarations[0];
                writeNodeText(item);
            }
            else if (node.declarations.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.declarations.length; i++) {
                        const item = node.declarations[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write(getNodeFlagValues(node.flags || 0));
        });
        writer.write(")");
    }
    function createFunctionDeclaration(node) {
        writer.write("factory.createFunctionDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.asteriskToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.asteriskToken);
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name);
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters[0];
                writeNodeText(item);
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters.length; i++) {
                        const item = node.parameters[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type);
            }
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body);
            }
        });
        writer.write(")");
    }
    function createClassDeclaration(node) {
        writer.write("factory.createClassDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name);
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.heritageClauses == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.heritageClauses.length === 1) {
                    const item = node.heritageClauses[0];
                    writeNodeText(item);
                }
                else if (node.heritageClauses.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.heritageClauses.length; i++) {
                            const item = node.heritageClauses[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members[0];
                writeNodeText(item);
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members.length; i++) {
                        const item = node.members[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }
    function createInterfaceDeclaration(node) {
        writer.write("factory.createInterfaceDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.heritageClauses == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.heritageClauses.length === 1) {
                    const item = node.heritageClauses[0];
                    writeNodeText(item);
                }
                else if (node.heritageClauses.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.heritageClauses.length; i++) {
                            const item = node.heritageClauses[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members[0];
                writeNodeText(item);
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members.length; i++) {
                        const item = node.members[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }
    function createTypeAliasDeclaration(node) {
        writer.write("factory.createTypeAliasDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters[0];
                    writeNodeText(item);
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters.length; i++) {
                            const item = node.typeParameters[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type);
        });
        writer.write(")");
    }
    function createEnumDeclaration(node) {
        writer.write("factory.createEnumDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members[0];
                writeNodeText(item);
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members.length; i++) {
                        const item = node.members[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }
    function createModuleDeclaration(node) {
        writer.write("factory.createModuleDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body);
            }
            writer.write(",").newLine();
            writer.write(getNodeFlagValues(node.flags || 0));
        });
        writer.write(")");
    }
    function createModuleBlock(node) {
        writer.write("factory.createModuleBlock(");
        writer.write("[");
        if (node.statements.length === 1) {
            const item = node.statements[0];
            writeNodeText(item);
        }
        else if (node.statements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.statements.length; i++) {
                    const item = node.statements[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createCaseBlock(node) {
        writer.write("factory.createCaseBlock(");
        writer.write("[");
        if (node.clauses.length === 1) {
            const item = node.clauses[0];
            writeNodeText(item);
        }
        else if (node.clauses.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.clauses.length; i++) {
                    const item = node.clauses[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createNamespaceExportDeclaration(node) {
        writer.write("factory.createNamespaceExportDeclaration(");
        writeNodeText(node.name);
        writer.write(")");
    }
    function createImportEqualsDeclaration(node) {
        writer.write("factory.createImportEqualsDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write(node.isTypeOnly.toString());
            writer.write(",").newLine();
            writeNodeText(node.name);
            writer.write(",").newLine();
            writeNodeText(node.moduleReference);
        });
        writer.write(")");
    }
    function createImportDeclaration(node) {
        writer.write("factory.createImportDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.importClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.importClause);
            }
            writer.write(",").newLine();
            writeNodeText(node.moduleSpecifier);
            writer.write(",").newLine();
            if (node.assertClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.assertClause);
            }
        });
        writer.write(")");
    }
    function createImportClause(node) {
        writer.write("factory.createImportClause(");
        writer.newLine();
        writer.indent(() => {
            writer.write(node.isTypeOnly.toString());
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name);
            }
            writer.write(",").newLine();
            if (node.namedBindings == null)
                writer.write("undefined");
            else {
                writeNodeText(node.namedBindings);
            }
        });
        writer.write(")");
    }
    function createAssertClause(node) {
        writer.write("factory.createAssertClause(");
        writer.newLine();
        writer.indent(() => {
            writer.write("/* unknown */");
            writer.write(",").newLine();
            if (node.multiLine == null)
                writer.write("undefined");
            else {
                writer.write(node.multiLine.toString());
            }
        });
        writer.write(")");
    }
    function createAssertEntry(node) {
        writer.write("factory.createAssertEntry(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name);
            writer.write(",").newLine();
            writeNodeText(node.value);
        });
        writer.write(")");
    }
    function createImportTypeAssertionContainer(node) {
        writer.write("factory.createImportTypeAssertionContainer(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.assertClause);
            writer.write(",").newLine();
            if (node.multiLine == null)
                writer.write("undefined");
            else {
                writer.write(node.multiLine.toString());
            }
        });
        writer.write(")");
    }
    function createNamespaceImport(node) {
        writer.write("factory.createNamespaceImport(");
        writeNodeText(node.name);
        writer.write(")");
    }
    function createNamespaceExport(node) {
        writer.write("factory.createNamespaceExport(");
        writeNodeText(node.name);
        writer.write(")");
    }
    function createNamedImports(node) {
        writer.write("factory.createNamedImports(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements[0];
            writeNodeText(item);
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements.length; i++) {
                    const item = node.elements[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createImportSpecifier(node) {
        writer.write("factory.createImportSpecifier(");
        writer.newLine();
        writer.indent(() => {
            writer.write(node.isTypeOnly.toString());
            writer.write(",").newLine();
            if (node.propertyName == null)
                writer.write("undefined");
            else {
                writeNodeText(node.propertyName);
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
        });
        writer.write(")");
    }
    function createExportAssignment(node) {
        writer.write("factory.createExportAssignment(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.isExportEquals == null)
                writer.write("undefined");
            else {
                writer.write(node.isExportEquals.toString());
            }
            writer.write(",").newLine();
            writeNodeText(node.expression);
        });
        writer.write(")");
    }
    function createExportDeclaration(node) {
        writer.write("factory.createExportDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers[0];
                    writeNodeText(item);
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers.length; i++) {
                            const item = node.modifiers[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write(node.isTypeOnly.toString());
            writer.write(",").newLine();
            if (node.exportClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.exportClause);
            }
            writer.write(",").newLine();
            if (node.moduleSpecifier == null)
                writer.write("undefined");
            else {
                writeNodeText(node.moduleSpecifier);
            }
            writer.write(",").newLine();
            if (node.assertClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.assertClause);
            }
        });
        writer.write(")");
    }
    function createNamedExports(node) {
        writer.write("factory.createNamedExports(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements[0];
            writeNodeText(item);
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements.length; i++) {
                    const item = node.elements[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createExportSpecifier(node) {
        writer.write("factory.createExportSpecifier(");
        writer.newLine();
        writer.indent(() => {
            writer.write(node.isTypeOnly.toString());
            writer.write(",").newLine();
            if (node.propertyName == null)
                writer.write("undefined");
            else {
                writeNodeText(node.propertyName);
            }
            writer.write(",").newLine();
            writeNodeText(node.name);
        });
        writer.write(")");
    }
    function createExternalModuleReference(node) {
        writer.write("factory.createExternalModuleReference(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createJsxElement(node) {
        writer.write("factory.createJsxElement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.openingElement);
            writer.write(",").newLine();
            writer.write("[");
            if (node.children.length === 1) {
                const item = node.children[0];
                writeNodeText(item);
            }
            else if (node.children.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.children.length; i++) {
                        const item = node.children[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeText(node.closingElement);
        });
        writer.write(")");
    }
    function createJsxSelfClosingElement(node) {
        writer.write("factory.createJsxSelfClosingElement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.tagName);
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments[0];
                    writeNodeTextForTypeNode(item);
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments.length; i++) {
                            const item = node.typeArguments[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.attributes);
        });
        writer.write(")");
    }
    function createJsxOpeningElement(node) {
        writer.write("factory.createJsxOpeningElement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.tagName);
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments[0];
                    writeNodeTextForTypeNode(item);
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments.length; i++) {
                            const item = node.typeArguments[i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item);
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.attributes);
        });
        writer.write(")");
    }
    function createJsxClosingElement(node) {
        writer.write("factory.createJsxClosingElement(");
        writeNodeText(node.tagName);
        writer.write(")");
    }
    function createJsxFragment(node) {
        writer.write("factory.createJsxFragment(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.openingFragment);
            writer.write(",").newLine();
            writer.write("[");
            if (node.children.length === 1) {
                const item = node.children[0];
                writeNodeText(item);
            }
            else if (node.children.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.children.length; i++) {
                        const item = node.children[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeText(node.closingFragment);
        });
        writer.write(")");
    }
    function createJsxText(node) {
        writer.write("factory.createJsxText(");
        writer.newLine();
        writer.indent(() => {
            writer.quote(node.text.toString());
            writer.write(",").newLine();
            writer.write(node.containsOnlyTriviaWhiteSpaces.toString());
        });
        writer.write(")");
    }
    function createJsxOpeningFragment(node) {
        writer.write("factory.createJsxOpeningFragment(");
        writer.write(")");
    }
    function createJsxJsxClosingFragment(node) {
        writer.write("factory.createJsxJsxClosingFragment(");
        writer.write(")");
    }
    function createJsxAttribute(node) {
        writer.write("factory.createJsxAttribute(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer);
            }
        });
        writer.write(")");
    }
    function createJsxAttributes(node) {
        writer.write("factory.createJsxAttributes(");
        writer.write("[");
        if (node.properties.length === 1) {
            const item = node.properties[0];
            writeNodeText(item);
        }
        else if (node.properties.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.properties.length; i++) {
                    const item = node.properties[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createJsxSpreadAttribute(node) {
        writer.write("factory.createJsxSpreadAttribute(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createJsxExpression(node) {
        writer.write("factory.createJsxExpression(");
        writer.newLine();
        writer.indent(() => {
            if (node.dotDotDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.dotDotDotToken);
            }
            writer.write(",").newLine();
            if (node.expression == null)
                writer.write("undefined");
            else {
                writeNodeText(node.expression);
            }
        });
        writer.write(")");
    }
    function createCaseClause(node) {
        writer.write("factory.createCaseClause(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression);
            writer.write(",").newLine();
            writer.write("[");
            if (node.statements.length === 1) {
                const item = node.statements[0];
                writeNodeText(item);
            }
            else if (node.statements.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.statements.length; i++) {
                        const item = node.statements[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }
    function createDefaultClause(node) {
        writer.write("factory.createDefaultClause(");
        writer.write("[");
        if (node.statements.length === 1) {
            const item = node.statements[0];
            writeNodeText(item);
        }
        else if (node.statements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.statements.length; i++) {
                    const item = node.statements[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createHeritageClause(node) {
        writer.write("factory.createHeritageClause(");
        writer.newLine();
        writer.indent(() => {
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.token]);
            writer.write(",").newLine();
            writer.write("[");
            if (node.types.length === 1) {
                const item = node.types[0];
                writeNodeText(item);
            }
            else if (node.types.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.types.length; i++) {
                        const item = node.types[i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item);
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }
    function createCatchClause(node) {
        writer.write("factory.createCatchClause(");
        writer.newLine();
        writer.indent(() => {
            if (node.variableDeclaration == null)
                writer.write("undefined");
            else {
                writeNodeText(node.variableDeclaration);
            }
            writer.write(",").newLine();
            writeNodeText(node.block);
        });
        writer.write(")");
    }
    function createPropertyAssignment(node) {
        writer.write("factory.createPropertyAssignment(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name);
            writer.write(",").newLine();
            writeNodeText(node.initializer);
        });
        writer.write(")");
    }
    function createShorthandPropertyAssignment(node) {
        writer.write("factory.createShorthandPropertyAssignment(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.objectAssignmentInitializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.objectAssignmentInitializer);
            }
        });
        writer.write(")");
    }
    function createSpreadAssignment(node) {
        writer.write("factory.createSpreadAssignment(");
        writeNodeText(node.expression);
        writer.write(")");
    }
    function createEnumMember(node) {
        writer.write("factory.createEnumMember(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name);
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer);
            }
        });
        writer.write(")");
    }
    function createCommaListExpression(node) {
        writer.write("factory.createCommaListExpression(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements[0];
            writeNodeText(item);
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements.length; i++) {
                    const item = node.elements[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item);
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }
    function createSyntaxKindToNameMap() {
        const map = {};
        for (const name of Object.keys(ts.SyntaxKind).filter(k => isNaN(parseInt(k, 10)))) {
            const value = ts.SyntaxKind[name];
            if (map[value] == null)
                map[value] = name;
        }
        return map;
    }
    function getNodeFlagValues(value) {
        // ignore the BlockScoped node flag
        return getFlagValuesAsString(ts.NodeFlags, "ts.NodeFlags", value || 0, "None", getFlagValues(ts.NodeFlags, value).filter(v => v !== ts.NodeFlags.BlockScoped));
    }
    function getFlagValuesAsString(enumObj, enumName, value, defaultName, flagValues) {
        flagValues = flagValues || getFlagValues(enumObj, value);
        const members = [];
        for (const flagValue of flagValues)
            members.push(enumName + "." + enumObj[flagValue]);
        if (members.length === 0)
            members.push(enumName + "." + defaultName);
        return members.join(" | ");
    }
    function getFlagValues(enumObj, value) {
        const members = [];
        for (const prop in enumObj) {
            if (typeof enumObj[prop] === "string")
                continue;
            if ((enumObj[prop] & value) !== 0)
                members.push(enumObj[prop]);
        }
        return members;
    }
}
