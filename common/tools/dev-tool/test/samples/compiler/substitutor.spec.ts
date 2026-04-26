// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import {
  substituteForPublishing,
  substituteSampleOnly,
  collectFreeVariables,
} from "../../../src/util/samples/compiler/substitutor.js";
import ts from "typescript";
import { parseSource, normalizeWhitespace } from "./helpers.js";
import { CompilerError } from "../../../src/util/samples/compiler/types.js";
import { createAnalyzer } from "../../../src/util/samples/compiler/bindingAnalyzer.js";

function printFile(sourceFile: ts.SourceFile): string {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printFile(sourceFile);
}

/** Helper: apply substitution to a source string and return trimmed output + substitutions. */
function substitute(source: string, fileName?: string) {
  // Inject forPublishing import if not already present
  const sourceWithImport = source.includes("import")
    ? source
    : `import { forPublishing } from "@azure-tools/test-publishing";\n${source}`;
  const sf = parseSource(sourceWithImport, fileName);
  const result = substituteForPublishing(sf, fileName);

  // Remove the injected import from output for cleaner test assertions
  let output = normalizeWhitespace(printFile(result.transformedFile));
  if (!source.includes("import")) {
    output = output
      .replace(/import\s*\{\s*forPublishing\s*\}\s*from\s*"@azure-tools\/test-publishing";\s*/g, "")
      .trim();
  }

  return {
    output,
    substitutions: result.substitutions,
  };
}

describe("substituteForPublishing", () => {
  // --- basic substitutions ---

  it("simple string substitution", () => {
    const { output, substitutions } = substitute(`forPublishing("test", () => "published");`);
    expect(output).toBe(`"published";`);
    expect(substitutions).toHaveLength(1);
  });

  it("constructor substitution", () => {
    const { output } = substitute(
      `forPublishing(createTestCredential(), () => new DefaultAzureCredential());`,
    );
    expect(output).toBe(`new DefaultAzureCredential();`);
  });

  it("object literal substitution", () => {
    const { output } = substitute(
      `forPublishing(recorder.configureClientOptions({}), () => ({}));`,
    );
    expect(output).toBe(`({});`);
  });

  it("complex expression substitution", () => {
    const { output } = substitute(
      `forPublishing(envVar("X"), () => process.env.X || "<default>");`,
    );
    expect(output).toContain(`process.env.X || "<default>"`);
  });

  it("multiple substitutions in one file", () => {
    const { output, substitutions } = substitute(
      [
        `const a = forPublishing("testA", () => "pubA");`,
        `const b = forPublishing("testB", () => "pubB");`,
      ].join("\n"),
    );
    expect(substitutions).toHaveLength(2);
    expect(output).toContain(`"pubA"`);
    expect(output).toContain(`"pubB"`);
    expect(output).not.toContain("forPublishing");
  });

  // --- nested contexts ---

  it("nested in variable declaration", () => {
    const { output } = substitute(`const x = forPublishing(a, () => b);`);
    expect(output).toBe(`const x = b;`);
  });

  it("nested in function argument", () => {
    const { output } = substitute(`new Client(forPublishing(a, () => b));`);
    expect(output).toBe(`new Client(b);`);
  });

  // --- referenced symbols ---

  it("collects referenced symbols from constructor", () => {
    const { substitutions } = substitute(
      `forPublishing(createTestCredential(), () => new DefaultAzureCredential());`,
    );
    expect(substitutions[0].referencedSymbols).toContain("DefaultAzureCredential");
  });

  it("collects referenced symbols from process.env", () => {
    const { substitutions } = substitute(
      `forPublishing(envVar("X"), () => process.env.X || "<default>");`,
    );
    expect(substitutions[0].referencedSymbols).toContain("process");
  });

  // --- error cases ---

  it("throws CompilerError for block-bodied arrow", () => {
    expect(() => substitute(`forPublishing(a, () => { return b; });`, "test.ts")).toThrow(
      CompilerError,
    );
  });

  it("throws CompilerError for non-arrow second argument", () => {
    expect(() => substitute(`forPublishing(a, b);`, "test.ts")).toThrow(CompilerError);
  });

  it("throws CompilerError for arrow with parameters", () => {
    expect(() => substitute(`forPublishing(a, (v) => v + 1);`, "test.ts")).toThrow(CompilerError);
    expect(() => substitute(`forPublishing(a, (v) => v + 1);`, "test.ts")).toThrow(/no parameters/);
  });

  it("throws CompilerError for wrong number of args (too few)", () => {
    expect(() => substitute(`forPublishing(a);`, "test.ts")).toThrow(CompilerError);
  });

  it("throws CompilerError for wrong number of args (too many)", () => {
    expect(() => substitute(`forPublishing(a, () => b, c);`, "test.ts")).toThrow(CompilerError);
  });

  // --- edge cases ---

  it("returns unchanged source when no forPublishing calls exist", () => {
    const source = `const x = 42;`;
    const { output, substitutions } = substitute(source);
    expect(output).toBe(`const x = 42;`);
    expect(substitutions).toHaveLength(0);
  });

  it("does not transform forPublishing used as an identifier (not a call)", () => {
    const source = `const f = forPublishing;`;
    const { output, substitutions } = substitute(source);
    expect(output).toBe(`const f = forPublishing;`);
    expect(substitutions).toHaveLength(0);
  });

  // --- freeVariables field ---

  it("populates freeVariables on substitution", () => {
    const { substitutions } = substitute(
      `forPublishing(createTestCredential(), () => new DefaultAzureCredential());`,
    );
    expect(substitutions[0].freeVariables).toBeInstanceOf(Set);
    expect(substitutions[0].freeVariables).toContain("DefaultAzureCredential");
  });

  it("freeVariables excludes property access names", () => {
    const { substitutions } = substitute(
      `forPublishing(envVar("X"), () => process.env.X || "<default>");`,
    );
    expect(substitutions[0].freeVariables).toContain("process");
    expect(substitutions[0].freeVariables).not.toContain("env");
    expect(substitutions[0].freeVariables).not.toContain("X");
  });

  // ── F3: forPublishing aliased import ─────────────────────────────────

  it("handles aliased forPublishing import", () => {
    const input = `
import { forPublishing as fp } from "@azure-tools/test-publishing";
const x = fp("test", () => "published");
`;
    const sf = parseSource(input, "test.ts");
    const result = substituteForPublishing(sf, "test.ts");
    const output = normalizeWhitespace(printFile(result.transformedFile));
    expect(result.substitutions).toHaveLength(1);
    expect(output).toContain(`"published"`);
    expect(output).not.toContain("fp(");
  });

  // ── F6: forPublishing import verification ───────────────────────────

  it("does not substitute forPublishing without test-publishing import", () => {
    const input = `
function forPublishing(a: any, b: any) { return a; }
const x = forPublishing("test", () => "published");
`;
    const sf = parseSource(input, "test.ts");
    const result = substituteForPublishing(sf, "test.ts");
    expect(result.substitutions.length).toBe(0);
  });
});

// ── collectFreeVariables unit tests ─────────────────────────────────

describe("collectFreeVariables", () => {
  /** Helper to extract the expression from a single expression statement. */
  function exprFrom(source: string): ts.Expression {
    const sf = parseSource(source);
    return (sf.statements[0] as ts.ExpressionStatement).expression;
  }

  it("simple identifier", () => {
    expect(collectFreeVariables(exprFrom("x;"))).toEqual(new Set(["x"]));
  });

  it("property access chain collects only root", () => {
    expect(collectFreeVariables(exprFrom("process.env.X;"))).toEqual(new Set(["process"]));
  });

  it("constructor expression", () => {
    expect(collectFreeVariables(exprFrom("new DefaultAzureCredential();"))).toEqual(
      new Set(["DefaultAzureCredential"]),
    );
  });

  it("binary expression", () => {
    expect(collectFreeVariables(exprFrom("a || b;"))).toEqual(new Set(["a", "b"]));
  });

  it("function call with args", () => {
    expect(collectFreeVariables(exprFrom("foo(bar, baz.qux);"))).toEqual(
      new Set(["foo", "bar", "baz"]),
    );
  });

  it("arrow with parameter shadowing excludes params", () => {
    const result = collectFreeVariables(exprFrom("xs.map((x) => x + y);"));
    expect(result).toContain("xs");
    expect(result).toContain("y");
    expect(result).not.toContain("x");
  });

  it("nested function expression excludes params", () => {
    const result = collectFreeVariables(exprFrom("(function(a) { return a + b; })"));
    expect(result).toContain("b");
    expect(result).not.toContain("a");
  });
});

// ── substituteSampleOnly unit tests ─────────────────────────────────

describe("substituteSampleOnly", () => {
  /** Helper: apply sampleOnly substitution to a source string. */
  function substituteSO(source: string, fileName = "test.ts") {
    const sourceWithImport = source.includes("import")
      ? source
      : `import { sampleOnly } from "@azure-tools/test-publishing";\n${source}`;
    const analyzer = createAnalyzer(sourceWithImport, fileName);
    const result = substituteSampleOnly(analyzer.sourceFile, analyzer.checker, fileName);
    const output = normalizeWhitespace(printFile(result.transformedFile))
      .replace(/import\s*\{\s*sampleOnly\s*\}\s*from\s*"@azure-tools\/test-publishing";\s*/g, "")
      .trim();
    return { output, replacementCount: result.replacementCount };
  }

  it("simple string substitution", () => {
    const { output, replacementCount } = substituteSO(
      `const msg = sampleOnly(() => "Hello, world!");`,
    );
    expect(output).toBe(`const msg = "Hello, world!";`);
    expect(replacementCount).toBe(1);
  });

  it("constructor substitution", () => {
    const { output, replacementCount } = substituteSO(
      `const obj = sampleOnly(() => new MyClass());`,
    );
    expect(output).toBe(`const obj = new MyClass();`);
    expect(replacementCount).toBe(1);
  });

  it("multiple sampleOnly calls", () => {
    const { output, replacementCount } = substituteSO(
      `const a = sampleOnly(() => 1);\nconst b = sampleOnly(() => 2);`,
    );
    expect(output).toContain("const a = 1;");
    expect(output).toContain("const b = 2;");
    expect(replacementCount).toBe(2);
  });

  it("returns undefined result when arrow returns undefined", () => {
    const { output } = substituteSO(`const x = sampleOnly(() => undefined);`);
    expect(output).toBe(`const x = undefined;`);
  });

  it("does nothing when no sampleOnly import", () => {
    const input = `
function sampleOnly(fn: () => any) { return fn(); }
const x = sampleOnly(() => "value");
`;
    const analyzer = createAnalyzer(input, "test.ts");
    const result = substituteSampleOnly(analyzer.sourceFile, analyzer.checker, "test.ts");
    expect(result.replacementCount).toBe(0);
  });

  it("throws CompilerError for block-bodied arrow", () => {
    expect(() => substituteSO(`sampleOnly(() => { return 1; });`)).toThrow(CompilerError);
  });

  it("throws CompilerError for arrow with parameters", () => {
    expect(() => substituteSO(`sampleOnly((x) => x);`)).toThrow(CompilerError);
  });

  it("throws CompilerError for wrong arg count (0 args)", () => {
    expect(() => substituteSO(`sampleOnly();`)).toThrow(CompilerError);
  });

  it("throws CompilerError for wrong arg count (2 args)", () => {
    expect(() => substituteSO(`sampleOnly(() => 1, () => 2);`)).toThrow(CompilerError);
  });
});
