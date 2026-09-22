// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { formatDiagnostics } from "../../src/index.ts";
import type { CompileResult } from "../../src/index.ts";

function makeDiagnostic(
  category: ts.DiagnosticCategory,
  code: number,
  messageText: string,
  fileName?: string,
  line?: number,
  character?: number,
): ts.Diagnostic {
  if (fileName && line !== undefined && character !== undefined) {
    // Create a minimal source file to test file-based diagnostics
    const sourceText = "\n".repeat(line) + " ".repeat(character) + "x";
    const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest);
    const start = ts.getPositionOfLineAndCharacter(sourceFile, line, character);

    return {
      category,
      code,
      messageText,
      file: sourceFile,
      start,
      length: 1,
    };
  }

  return {
    category,
    code,
    messageText,
    file: undefined,
    start: undefined,
    length: undefined,
  };
}

describe("formatDiagnostics", () => {
  it("returns empty string for no diagnostics", () => {
    const results: CompileResult[] = [
      {
        target: { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        diagnostics: [],
        success: true,
        outDir: "dist/esm",
        rootDir: "src",
        compileTimeMs: 100,
        deduped: false,
      },
    ];
    expect(formatDiagnostics(results)).toBe("");
  });

  it("prefixes diagnostics with target name", () => {
    const results: CompileResult[] = [
      {
        target: { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        diagnostics: [makeDiagnostic(ts.DiagnosticCategory.Error, 2322, "Type mismatch")],
        success: false,
        outDir: "dist/esm",
        rootDir: "src",
        compileTimeMs: 100,
        deduped: false,
      },
    ];
    const output = formatDiagnostics(results);
    expect(output).toContain("[esm]");
    expect(output).toContain("error TS2322");
    expect(output).toContain("Type mismatch");
  });

  it("includes file position for file-based diagnostics", () => {
    const results: CompileResult[] = [
      {
        target: { name: "browser", condition: "browser", tsconfig: "./tsconfig.browser.json" },
        diagnostics: [
          makeDiagnostic(
            ts.DiagnosticCategory.Error,
            2339,
            "Property 'subtle' does not exist",
            "src/crypto/subtle.ts",
            17,
            2,
          ),
        ],
        success: false,
        outDir: "dist/browser",
        rootDir: "src",
        compileTimeMs: 100,
        deduped: false,
      },
    ];
    const output = formatDiagnostics(results);
    expect(output).toContain("[browser]");
    expect(output).toContain("src/crypto/subtle.ts(18,3)");
    expect(output).toContain("error TS2339");
  });

  it("groups diagnostics by target", () => {
    const results: CompileResult[] = [
      {
        target: { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        diagnostics: [makeDiagnostic(ts.DiagnosticCategory.Error, 2322, "Error in ESM")],
        success: false,
        outDir: "dist/esm",
        rootDir: "src",
        compileTimeMs: 100,
        deduped: false,
      },
      {
        target: { name: "cjs", condition: "require", tsconfig: "./tsconfig.cjs.json" },
        diagnostics: [makeDiagnostic(ts.DiagnosticCategory.Warning, 6059, "Warning in CJS")],
        success: true,
        outDir: "dist/commonjs",
        rootDir: "src",
        compileTimeMs: 50,
        deduped: false,
      },
    ];
    const output = formatDiagnostics(results);
    expect(output).toContain("[esm]");
    expect(output).toContain("[cjs]");
    expect(output).toContain("error TS2322");
    expect(output).toContain("warning TS6059");
  });
});
