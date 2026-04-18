// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import {
  substituteForPublishing,
  collectFreeVariables,
} from "../../../src/util/samples/compiler/substitutor.js";
import ts from "typescript";
import { parseSource, normalizeWhitespace } from "./helpers.js";
import { CompilerError } from "../../../src/util/samples/compiler/types.js";

function printFile(sourceFile: ts.SourceFile): string {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printFile(sourceFile);
}

/** Helper: apply substitution to a source string and return trimmed output + substitutions. */
function substitute(source: string, fileName?: string) {
  const sf = parseSource(source, fileName);
  const result = substituteForPublishing(sf, fileName);
  return {
    output: normalizeWhitespace(printFile(result.transformedFile)),
    substitutions: result.substitutions,
  };
}

describe("substituteForPublishing", () => {
  // --- basic substitutions ---

  it("simple string substitution", () => {
    const { output, substitutions } = substitute(
      `forPublishing("test", () => "published");`,
    );
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
    const { output } = substitute(
      `new Client(forPublishing(a, () => b));`,
    );
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
    expect(() =>
      substitute(`forPublishing(a, () => { return b; });`, "test.ts"),
    ).toThrow(CompilerError);
  });

  it("throws CompilerError for non-arrow second argument", () => {
    expect(() =>
      substitute(`forPublishing(a, b);`, "test.ts"),
    ).toThrow(CompilerError);
  });

  it("throws CompilerError for wrong number of args (too few)", () => {
    expect(() =>
      substitute(`forPublishing(a);`, "test.ts"),
    ).toThrow(CompilerError);
  });

  it("throws CompilerError for wrong number of args (too many)", () => {
    expect(() =>
      substitute(`forPublishing(a, () => b, c);`, "test.ts"),
    ).toThrow(CompilerError);
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
});
