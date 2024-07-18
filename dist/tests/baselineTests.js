"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ts_morph_1 = require("ts-morph");
const ts363 = __importStar(require("typescript-3.6.3"));
const ts494 = __importStar(require("typescript-4.9.4"));
const generateCode_1 = require("../generateCode");
const typescript_3_6_3_baseline_1 = require("./baselines/code-generation/typescript-3.6.3.baseline");
const typescript_4_9_4_baseline_1 = require("./baselines/code-generation/typescript-4.9.4.baseline");
describe(nameof(generateCode_1.generateCode), () => {
    it("should equal the baseline for 3.2.1", () => {
        runBaseLineForPackage("typescript-3.2.1");
    });
    it("should equal the baseline for 3.6.3", () => {
        runBaseLineForPackage("typescript-3.6.3");
    });
    // uses NodeFactory at this point
    it("should equal the baseline for 4.8.3", () => {
        runBaseLineForPackage("typescript-4.8.3");
    });
    it("should equal the baseline for 4.9.4", () => {
        runBaseLineForPackage("typescript-4.9.4");
    });
    it("should equal the baseline for @next", () => {
        runBaseLineForPackage("typescript-next");
    });
    function runBaseLineForPackage(packageName) {
        // get generated code
        const result = (0, generateCode_1.generateCode)(packageName);
        // ensure no diagnostics
        ensureNoDiagnostics(result);
        // compare
        const specFileName = path.join(__dirname, `baselines/code-generation/${packageName}.baseline.ts`);
        const specText = fs.readFileSync(specFileName, { encoding: "utf8" });
        fs.writeFileSync(specFileName, result, { encoding: "utf8" }); // overwrite
        (0, chai_1.expect)(result).to.equal(specText);
    }
});
describe(nameof(typescript_4_9_4_baseline_1.generateFactoryCode), () => {
    it("should generate factory code from the provided source file", () => {
        // get generated code
        const languageFeaturesFileName = path.join(__dirname, "baselines/language-features.ts");
        const languageFeaturesText = fs.readFileSync(languageFeaturesFileName, { encoding: "utf8" });
        const languageFeaturesSourceFile = ts494.createSourceFile("languageFeatures.ts", languageFeaturesText, ts494.ScriptTarget.Latest, false);
        const result = `import * as ts from "typescript-4.9.4";\n\n`
            + "const factory = ts.factory;\n"
            + (0, typescript_4_9_4_baseline_1.generateFactoryCode)(ts494, languageFeaturesSourceFile);
        // ensure no diagnostics
        ensureNoDiagnostics(result);
        // compare
        const specFileName = path.join(__dirname, "baselines/factory-code-generation-4.9.4.baseline.ts");
        const specText = fs.readFileSync(specFileName, { encoding: "utf8" });
        fs.writeFileSync(specFileName, result, { encoding: "utf8" }); // overwrite
        (0, chai_1.expect)(result).to.equal(specText);
    });
});
describe(nameof(typescript_3_6_3_baseline_1.generateFactoryCode), () => {
    it("should generate factory code from the provided source file", () => {
        // get generated code
        const languageFeaturesFileName = path.join(__dirname, "baselines/language-features.ts");
        const languageFeaturesText = fs.readFileSync(languageFeaturesFileName, { encoding: "utf8" });
        const languageFeaturesSourceFile = ts363.createSourceFile("languageFeatures.ts", languageFeaturesText, ts363.ScriptTarget.Latest, false);
        const result = `import * as ts from "typescript-3.6.3";\n\n` + (0, typescript_3_6_3_baseline_1.generateFactoryCode)(ts363, languageFeaturesSourceFile);
        // ensure no diagnostics
        ensureNoDiagnostics(result);
        // compare
        const specFileName = path.join(__dirname, "baselines/factory-code-generation-3.6.3.baseline.ts");
        const specText = fs.readFileSync(specFileName, { encoding: "utf8" });
        fs.writeFileSync(specFileName, result, { encoding: "utf8" }); // overwrite
        (0, chai_1.expect)(result).to.equal(specText);
    });
});
function ensureNoDiagnostics(fileText) {
    const project = new ts_morph_1.Project({ compilerOptions: { strictNullChecks: true } });
    const sourceFile = project.createSourceFile("__test__.ts", fileText);
    const diagnostics = sourceFile.getPreEmitDiagnostics();
    if (diagnostics.length > 0) {
        console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));
        throw "ERROR";
    }
}
