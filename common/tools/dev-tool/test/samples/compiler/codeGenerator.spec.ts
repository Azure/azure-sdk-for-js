// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import ts from "typescript";
import {
  descriptionToFunctionName,
  generateSampleCode,
} from "../../../src/util/samples/compiler/codeGenerator.js";
import { parseSampleTestFile } from "../../../src/util/samples/compiler/parser.js";
import { parseSource, normalizeWhitespace } from "./helpers.js";
import type { ParsedSampleTestFile } from "../../../src/util/samples/compiler/types.js";

// ── Helpers ──────────────────────────────────────────────────────────

/** Parse a test source and return the ParsedSampleTestFile (asserts non-null). */
function parseSample(source: string): ParsedSampleTestFile {
  const sf = parseSource(source, "test.ts");
  const result = parseSampleTestFile(sf, "test.ts");
  if (!result) throw new Error("parseSampleTestFile returned null");
  return result;
}

/** Print generated statements into a single string. */
function printStatements(statements: ts.Statement[]): string {
  const sf = ts.createSourceFile("output.ts", "", ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return statements.map((s) => printer.printNode(ts.EmitHint.Unspecified, s, sf)).join("\n");
}

// ── Test sources ─────────────────────────────────────────────────────

const singleIt = `
/** @summary say hello to the service */
import { describe, it } from "vitest";

describe("widget lifecycle", function () {
  it("say hello", async function () {
    console.log("hello");
  });
});
`;

const multipleIts = `
/** @summary create and manage widgets */
import { describe, it } from "vitest";

describe("widget lifecycle", function () {
  it("create a widget", async function () {
    const w = create();
  });
  it("update the widget", async function () {
    update(w);
  });
  it("delete the widget", async function () {
    remove(w);
  });
});
`;

const withVars = `
/** @summary with variables */
import { describe, it } from "vitest";

describe("vars", function () {
  let client: any;

  it("do stuff", async function () {
    client.call();
  });
});
`;

const withBeforeEach = `
/** @summary with hooks */
import { describe, it, beforeEach } from "vitest";

describe("hooks", function () {
  let client: any;

  beforeEach(async function () {
    client = createClient();
  });

  it("do stuff", async function () {
    client.call();
  });
});
`;

// ── descriptionToFunctionName ────────────────────────────────────────

describe("descriptionToFunctionName", () => {
  it('"say hello" → "sayHello"', () => {
    expect(descriptionToFunctionName("say hello")).toBe("sayHello");
  });

  it('"create a widget" → "createAWidget"', () => {
    expect(descriptionToFunctionName("create a widget")).toBe("createAWidget");
  });

  it('"list items" → "listItems"', () => {
    expect(descriptionToFunctionName("list items")).toBe("listItems");
  });

  it('"DELETE /items" → "deleteItems"', () => {
    expect(descriptionToFunctionName("DELETE /items")).toBe("deleteItems");
  });

  it('"test 123" → "test123"', () => {
    expect(descriptionToFunctionName("test 123")).toBe("test123");
  });

  it('empty string → "sample"', () => {
    expect(descriptionToFunctionName("")).toBe("sample");
  });

  it('"already camelCase" → "alreadyCamelCase"', () => {
    expect(descriptionToFunctionName("already camelCase")).toBe("alreadyCamelCase");
  });

  it('single word "hello" → "hello"', () => {
    expect(descriptionToFunctionName("hello")).toBe("hello");
  });

  it('"GET /items/:id" → "getItemsId"', () => {
    expect(descriptionToFunctionName("GET /items/:id")).toBe("getItemsId");
  });

  it("starts with digit gets underscore prefix", () => {
    expect(descriptionToFunctionName("123 test")).toBe("_123Test");
  });

  it("splits PascalCase into words", () => {
    expect(descriptionToFunctionName("ReadmeSampleCreateClient")).toBe("readmeSampleCreateClient");
  });

  it("splits PascalCase with acronyms", () => {
    expect(descriptionToFunctionName("GetHTTPSConnection")).toBe("getHttpsConnection");
  });
});

// ── generateSampleCode ──────────────────────────────────────────────

describe("generateSampleCode", () => {
  it("generates a single it block as one function + main", () => {
    const parsed = parseSample(singleIt);
    const { statements, functionNames } = generateSampleCode(parsed, []);
    const output = printStatements(statements);

    expect(functionNames).toEqual(["sayHello"]);
    expect(output).toContain("async function sayHello()");
    expect(output).toContain("export async function main(): Promise<void>");
    expect(output).toContain("await sayHello()");
  });

  it("generates multiple it blocks as functions called in order", () => {
    const parsed = parseSample(multipleIts);
    const { statements, functionNames } = generateSampleCode(parsed, []);
    const output = printStatements(statements);

    expect(functionNames).toEqual(["createAWidget", "updateTheWidget", "deleteTheWidget"]);
    expect(output).toContain("async function createAWidget()");
    expect(output).toContain("async function updateTheWidget()");
    expect(output).toContain("async function deleteTheWidget()");
    // main calls them in order
    expect(output).toContain("await createAWidget()");
    expect(output).toContain("await updateTheWidget()");
    expect(output).toContain("await deleteTheWidget()");
  });

  it("includes describe-level variables at module level", () => {
    const parsed = parseSample(withVars);
    const { statements } = generateSampleCode(parsed, []);
    const output = printStatements(statements);

    expect(output).toContain("let client");
  });

  it("includes surviving beforeEach statements as first lines of main()", () => {
    const parsed = parseSample(withBeforeEach);
    // Create a surviving beforeEach statement: `client = createClient();`
    const survivingSrc = parseSource("client = createClient();", "surviving.ts");
    const survivingStmts = Array.from(survivingSrc.statements);

    const { statements } = generateSampleCode(parsed, survivingStmts);
    const output = printStatements(statements);

    // main should contain the beforeEach statement before the function call
    expect(output).toContain("export async function main(): Promise<void>");
    expect(output).toContain("createClient()");

    // The beforeEach statement should come before the function calls in main
    const mainIdx = output.indexOf("export async function main(): Promise<void>");
    const mainBody = output.slice(mainIdx);
    const createClientIdx = mainBody.indexOf("createClient()");
    const awaitDoStuffIdx = mainBody.indexOf("await doStuff()");
    expect(createClientIdx).toBeLessThan(awaitDoStuffIdx);
  });

  it("omits beforeEach statements from main when none survive", () => {
    const parsed = parseSample(singleIt);
    const { statements } = generateSampleCode(parsed, []);
    const output = printStatements(statements);

    // main should only have the function call
    const mainIdx = output.indexOf("export async function main(): Promise<void>");
    const mainBody = output.slice(mainIdx);
    expect(mainBody).toContain("await sayHello()");
  });

  it("includes copyright header comment", () => {
    const parsed = parseSample(singleIt);
    const { statements } = generateSampleCode(parsed, []);
    const output = printStatements(statements);

    expect(output).toContain("Copyright (c) Microsoft Corporation");
    expect(output).toContain("Licensed under the MIT License");
  });

  it("includes @summary JSDoc comment", () => {
    const parsed = parseSample(singleIt);
    const { statements } = generateSampleCode(parsed, []);
    const output = printStatements(statements);

    expect(output).toContain("@summary");
    expect(output).toContain("say hello to the service");
  });

  it("generates main().catch() error handler", () => {
    const parsed = parseSample(singleIt);
    const { statements } = generateSampleCode(parsed, []);
    const output = printStatements(statements);

    expect(output).toContain("main().catch");
    expect(output).toContain("console.error");
    expect(output).toContain("process.exit(1)");
  });

  it("produces correct overall structure order", () => {
    const parsed = parseSample(multipleIts);
    const { statements } = generateSampleCode(parsed, []);
    const output = printStatements(statements);
    const normalized = normalizeWhitespace(output);

    // Order: copyright → summary → functions → main → catch
    const copyrightIdx = normalized.indexOf("Copyright");
    const summaryIdx = normalized.indexOf("@summary");
    const firstFnIdx = normalized.indexOf("async function createAWidget");
    const mainIdx = normalized.indexOf("async function main");
    const catchIdx = normalized.indexOf("main().catch");

    expect(copyrightIdx).toBeLessThan(summaryIdx);
    expect(summaryIdx).toBeLessThan(firstFnIdx);
    expect(firstFnIdx).toBeLessThan(mainIdx);
    expect(mainIdx).toBeLessThan(catchIdx);
  });
});
