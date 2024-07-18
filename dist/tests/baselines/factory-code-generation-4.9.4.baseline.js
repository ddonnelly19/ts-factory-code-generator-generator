"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_4_9_4_1 = __importDefault(require("typescript-4.9.4"));
const factory = typescript_4_9_4_1.default.factory;
[
    factory.createInterfaceDeclaration([factory.createToken(typescript_4_9_4_1.default.SyntaxKind.ExportKeyword)], factory.createIdentifier("Interface"), undefined, undefined, [
        factory.createPropertySignature(undefined, factory.createIdentifier("prop"), undefined, factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword)),
        factory.createPropertySignature([factory.createToken(typescript_4_9_4_1.default.SyntaxKind.ReadonlyKeyword)], factory.createIdentifier("readonlyProp"), undefined, factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword)),
        factory.createIndexSignature(undefined, [factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier("test"), undefined, factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword), undefined)], factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword))
    ]),
    factory.createInterfaceDeclaration(undefined, factory.createIdentifier("OtherInterface"), undefined, undefined, [
        factory.createMethodSignature(undefined, factory.createIdentifier("method"), undefined, undefined, [factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier("p"), undefined, factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword), undefined)], factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword)),
        factory.createConstructSignature(undefined, [factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier("p"), undefined, factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.NumberKeyword), undefined)], factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword))
    ]),
    factory.createClassDeclaration(undefined, factory.createIdentifier("Class"), undefined, undefined, [
        factory.createPropertyDeclaration(undefined, factory.createIdentifier("prop"), factory.createToken(typescript_4_9_4_1.default.SyntaxKind.ExclamationToken), factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword), undefined),
        factory.createConstructorDeclaration(undefined, [factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier("testing"), undefined, factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword), undefined)], factory.createBlock([], true)),
        factory.createMethodDeclaration(undefined, undefined, factory.createIdentifier("method"), undefined, undefined, [], undefined, factory.createBlock([factory.createReturnStatement(factory.createNumericLiteral("5"))], true))
    ]),
    factory.createClassDeclaration([factory.createToken(typescript_4_9_4_1.default.SyntaxKind.DeclareKeyword)], factory.createIdentifier("Class2"), undefined, undefined, [
        factory.createPropertyDeclaration([factory.createToken(typescript_4_9_4_1.default.SyntaxKind.ReadonlyKeyword)], factory.createIdentifier("other"), undefined, factory.createUnionTypeNode([
            factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword),
            factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.VoidKeyword)
        ]), undefined),
        factory.createMethodDeclaration(undefined, undefined, factory.createIdentifier("method"), undefined, undefined, [factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier("p"), undefined, factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword), undefined)], factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword), undefined)
    ]),
    factory.createVariableStatement(undefined, factory.createVariableDeclarationList([factory.createVariableDeclaration(factory.createIdentifier("myVar"), undefined, undefined, factory.createNumericLiteral("6"))], typescript_4_9_4_1.default.NodeFlags.Const)),
    factory.createVariableStatement(undefined, factory.createVariableDeclarationList([
        factory.createVariableDeclaration(factory.createIdentifier("myVar2"), undefined, undefined, factory.createNumericLiteral("6")),
        factory.createVariableDeclaration(factory.createIdentifier("myVar3"), undefined, factory.createUnionTypeNode([
            factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword),
            factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.UndefinedKeyword)
        ]), undefined)
    ], typescript_4_9_4_1.default.NodeFlags.Let)),
    factory.createVariableStatement(undefined, factory.createVariableDeclarationList([factory.createVariableDeclaration(factory.createIdentifier("otherVar"), undefined, undefined, factory.createBinaryExpression(factory.createNumericLiteral("4"), factory.createToken(typescript_4_9_4_1.default.SyntaxKind.PlusToken), factory.createBinaryExpression(factory.createNumericLiteral("5"), factory.createToken(typescript_4_9_4_1.default.SyntaxKind.AsteriskToken), factory.createNumericLiteral("12"))))], typescript_4_9_4_1.default.NodeFlags.None)),
    factory.createFunctionDeclaration(undefined, undefined, factory.createIdentifier("Function"), undefined, [factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier("p"), undefined, factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.StringKeyword), undefined)], factory.createKeywordTypeNode(typescript_4_9_4_1.default.SyntaxKind.NumberKeyword), factory.createBlock([factory.createReturnStatement(factory.createNumericLiteral("5"))], true)),
    factory.createFunctionDeclaration(undefined, undefined, factory.createIdentifier("test"), undefined, [], undefined, factory.createBlock([], false))
];
