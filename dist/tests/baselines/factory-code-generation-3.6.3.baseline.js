"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_3_6_3_1 = __importDefault(require("typescript-3.6.3"));
[
    typescript_3_6_3_1.default.createInterfaceDeclaration(undefined, [typescript_3_6_3_1.default.createToken(typescript_3_6_3_1.default.SyntaxKind.ExportKeyword)], typescript_3_6_3_1.default.createIdentifier("Interface"), undefined, undefined, [
        typescript_3_6_3_1.default.createPropertySignature(undefined, typescript_3_6_3_1.default.createIdentifier("prop"), undefined, typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword), undefined),
        typescript_3_6_3_1.default.createPropertySignature([typescript_3_6_3_1.default.createToken(typescript_3_6_3_1.default.SyntaxKind.ReadonlyKeyword)], typescript_3_6_3_1.default.createIdentifier("readonlyProp"), undefined, typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword), undefined),
        typescript_3_6_3_1.default.createIndexSignature(undefined, undefined, [typescript_3_6_3_1.default.createParameter(undefined, undefined, undefined, typescript_3_6_3_1.default.createIdentifier("test"), undefined, typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword), undefined)], typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword))
    ]),
    typescript_3_6_3_1.default.createInterfaceDeclaration(undefined, undefined, typescript_3_6_3_1.default.createIdentifier("OtherInterface"), undefined, undefined, [
        typescript_3_6_3_1.default.createMethodSignature(undefined, [typescript_3_6_3_1.default.createParameter(undefined, undefined, undefined, typescript_3_6_3_1.default.createIdentifier("p"), undefined, typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword), undefined)], typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword), typescript_3_6_3_1.default.createIdentifier("method"), undefined),
        typescript_3_6_3_1.default.createConstructSignature(undefined, [typescript_3_6_3_1.default.createParameter(undefined, undefined, undefined, typescript_3_6_3_1.default.createIdentifier("p"), undefined, typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.NumberKeyword), undefined)], typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword))
    ]),
    typescript_3_6_3_1.default.createClassDeclaration(undefined, undefined, typescript_3_6_3_1.default.createIdentifier("Class"), undefined, undefined, [
        typescript_3_6_3_1.default.createProperty(undefined, undefined, typescript_3_6_3_1.default.createIdentifier("prop"), typescript_3_6_3_1.default.createToken(typescript_3_6_3_1.default.SyntaxKind.ExclamationToken), typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword), undefined),
        typescript_3_6_3_1.default.createConstructor(undefined, undefined, [typescript_3_6_3_1.default.createParameter(undefined, undefined, undefined, typescript_3_6_3_1.default.createIdentifier("testing"), undefined, typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword), undefined)], typescript_3_6_3_1.default.createBlock([], true)),
        typescript_3_6_3_1.default.createMethod(undefined, undefined, undefined, typescript_3_6_3_1.default.createIdentifier("method"), undefined, undefined, [], undefined, typescript_3_6_3_1.default.createBlock([typescript_3_6_3_1.default.createReturn(typescript_3_6_3_1.default.createNumericLiteral("5"))], true))
    ]),
    typescript_3_6_3_1.default.createClassDeclaration(undefined, [typescript_3_6_3_1.default.createToken(typescript_3_6_3_1.default.SyntaxKind.DeclareKeyword)], typescript_3_6_3_1.default.createIdentifier("Class2"), undefined, undefined, [
        typescript_3_6_3_1.default.createProperty(undefined, [typescript_3_6_3_1.default.createToken(typescript_3_6_3_1.default.SyntaxKind.ReadonlyKeyword)], typescript_3_6_3_1.default.createIdentifier("other"), undefined, typescript_3_6_3_1.default.createUnionTypeNode([
            typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword),
            typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.VoidKeyword)
        ]), undefined),
        typescript_3_6_3_1.default.createMethod(undefined, undefined, undefined, typescript_3_6_3_1.default.createIdentifier("method"), undefined, undefined, [typescript_3_6_3_1.default.createParameter(undefined, undefined, undefined, typescript_3_6_3_1.default.createIdentifier("p"), undefined, typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword), undefined)], typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword), undefined)
    ]),
    typescript_3_6_3_1.default.createVariableStatement(undefined, typescript_3_6_3_1.default.createVariableDeclarationList([typescript_3_6_3_1.default.createVariableDeclaration(typescript_3_6_3_1.default.createIdentifier("myVar"), undefined, typescript_3_6_3_1.default.createNumericLiteral("6"))], typescript_3_6_3_1.default.NodeFlags.Const)),
    typescript_3_6_3_1.default.createVariableStatement(undefined, typescript_3_6_3_1.default.createVariableDeclarationList([
        typescript_3_6_3_1.default.createVariableDeclaration(typescript_3_6_3_1.default.createIdentifier("myVar2"), undefined, typescript_3_6_3_1.default.createNumericLiteral("6")),
        typescript_3_6_3_1.default.createVariableDeclaration(typescript_3_6_3_1.default.createIdentifier("myVar3"), typescript_3_6_3_1.default.createUnionTypeNode([
            typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword),
            typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.UndefinedKeyword)
        ]), undefined)
    ], typescript_3_6_3_1.default.NodeFlags.Let)),
    typescript_3_6_3_1.default.createVariableStatement(undefined, typescript_3_6_3_1.default.createVariableDeclarationList([typescript_3_6_3_1.default.createVariableDeclaration(typescript_3_6_3_1.default.createIdentifier("otherVar"), undefined, typescript_3_6_3_1.default.createBinary(typescript_3_6_3_1.default.createNumericLiteral("4"), typescript_3_6_3_1.default.createToken(typescript_3_6_3_1.default.SyntaxKind.PlusToken), typescript_3_6_3_1.default.createBinary(typescript_3_6_3_1.default.createNumericLiteral("5"), typescript_3_6_3_1.default.createToken(typescript_3_6_3_1.default.SyntaxKind.AsteriskToken), typescript_3_6_3_1.default.createNumericLiteral("12"))))], typescript_3_6_3_1.default.NodeFlags.None)),
    typescript_3_6_3_1.default.createFunctionDeclaration(undefined, undefined, undefined, typescript_3_6_3_1.default.createIdentifier("Function"), undefined, [typescript_3_6_3_1.default.createParameter(undefined, undefined, undefined, typescript_3_6_3_1.default.createIdentifier("p"), undefined, typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.StringKeyword), undefined)], typescript_3_6_3_1.default.createKeywordTypeNode(typescript_3_6_3_1.default.SyntaxKind.NumberKeyword), typescript_3_6_3_1.default.createBlock([typescript_3_6_3_1.default.createReturn(typescript_3_6_3_1.default.createNumericLiteral("5"))], true)),
    typescript_3_6_3_1.default.createFunctionDeclaration(undefined, undefined, undefined, typescript_3_6_3_1.default.createIdentifier("test"), undefined, [], undefined, typescript_3_6_3_1.default.createBlock([], false))
];
