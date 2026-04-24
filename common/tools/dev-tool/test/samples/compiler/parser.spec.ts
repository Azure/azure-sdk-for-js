// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { parseSampleTestFile } from "../../../src/util/samples/compiler/parser.js";
import { CompilerError } from "../../../src/util/samples/compiler/types.js";
import { parseSource } from "./helpers.js";

/** Helper: parse source text via the parser. */
function parse(source: string, fileName = "test.ts") {
  const sf = parseSource(source, fileName);
  return parseSampleTestFile(sf, fileName);
}

// ── Minimal source fragments ────────────────────────────────────────

const minimal = `
/** @summary say hello to the service */
import { describe, it } from "vitest";

describe("widget lifecycle", function () {
  it("creates a widget", async function () {
    const x = 1;
  });
});
`;

const multipleItBlocks = `
/** @summary multiple its */
import { describe, it } from "vitest";

describe("multi", function () {
  it("first", async () => { const a = 1; });
  it("second", async () => { const b = 2; });
  it("third", async () => { const c = 3; });
});
`;

const withBeforeEach = `
/** @summary with hooks */
import { describe, it, beforeEach } from "vitest";

describe("hooks", function () {
  beforeEach(async function (ctx) {
    const x = setup();
  });

  it("does stuff", async function () {
    doStuff();
  });
});
`;

const withAfterEach = `
/** @summary with afterEach */
import { describe, it, afterEach } from "vitest";

describe("cleanup", function () {
  afterEach(async function () {
    cleanup();
  });

  it("does stuff", async function () {
    doStuff();
  });
});
`;

const withDescribeVars = `
/** @summary with variables */
import { describe, it } from "vitest";

describe("vars", function () {
  let recorder: Recorder;
  let client: Client;

  it("does stuff", async function () {
    doStuff();
  });
});
`;

const withWeight = `
/**
 * @summary weighted sample
 * @azsdk-weight 80
 */
import { describe, it } from "vitest";

describe("weight", function () {
  it("does stuff", async function () {});
});
`;

const withSkipJavascript = `
/**
 * @summary skip js sample
 * @azsdk-skip-javascript
 */
import { describe, it } from "vitest";

describe("skipjs", function () {
  it("does stuff", async function () {});
});
`;

const withIgnore = `
/**
 * @summary ignored sample
 * @azsdk-ignore
 */
import { describe, it } from "vitest";

describe("ignored", function () {
  it("does stuff", async function () {});
});
`;

const multipleMetadata = `
/**
 * @summary all metadata
 * @azsdk-weight 42
 * @azsdk-ignore
 */
import { describe, it } from "vitest";

describe("all", function () {
  it("does stuff", async function () {});
});
`;

const itSkipAndOnly = `
/** @summary skip and only */
import { describe, it } from "vitest";

describe("modifiers", function () {
  it.skip("skipped test", async function () {
    skip();
  });
  it.only("only test", async function () {
    only();
  });
});
`;

const noSummary = `
import { describe, it } from "vitest";

describe("no summary", function () {
  it("test", async function () {});
});
`;

const nestedDescribe = `
/** @summary nested */
import { describe, it } from "vitest";

describe("outer", function () {
  describe("inner", function () {
    it("test", async function () {});
  });
});
`;

const noDescribe = `
/** @summary no describe */
import { it } from "vitest";

it("orphan", async function () {});
`;

const noItBlocks = `
/** @summary no its */
import { describe } from "vitest";

describe("empty", function () {
  let x = 1;
});
`;

const asyncIt = `
/** @summary async it */
import { describe, it } from "vitest";

describe("async", function () {
  it("async test", async () => {
    await doAsync();
    const result = await getResult();
  });
});
`;

const beforeEachWithCtx = `
/** @summary ctx param */
import { describe, it, beforeEach } from "vitest";

describe("ctx", function () {
  beforeEach(async (ctx) => {
    ctx.setup();
  });

  it("test", async function () {});
});
`;

const withImports = `
/** @summary imports test */
import { describe, it } from "vitest";
import { Recorder } from "@azure-tools/test-recorder";
import { MyClient } from "../src/index.js";

describe("imports", function () {
  it("test", async function () {});
});
`;

const jsdocBeforeImports = `
/**
 * @summary first thing in file
 */
import { describe, it } from "vitest";

describe("first", function () {
  it("test", async function () {});
});
`;

const withDescribeFunction = `
/** @summary with helper function */
import { describe, it } from "vitest";

describe("helpers", function () {
  let client: Client;

  function buildUri(): string {
    return "https://example.com";
  }

  it("does stuff", async function () {
    const uri = buildUri();
  });
});
`;

const multiLineSummary = `
/**
 * @summary This is a long summary
 * that spans multiple lines and should
 * be joined into one string.
 * @azsdk-weight 10
 */
import { describe, it } from "vitest";

describe("multiline", function () {
  it("test", async function () {});
});
`;

const multiLineSummaryNoFollowingTag = `
/**
 * @summary This summary spans
 * two lines
 */
import { describe, it } from "vitest";

describe("multiline-end", function () {
  it("test", async function () {});
});
`;

const describeSkip = `
/** @summary describe skip */
import { describe, it } from "vitest";

describe.skip("skipped suite", function () {
  it("test", async function () {});
});
`;

const describeOnly = `
/** @summary describe only */
import { describe, it } from "vitest";

describe.only("only suite", function () {
  it("test", async function () {});
});
`;

// ── Tests ────────────────────────────────────────────────────────────

describe("parseSampleTestFile", () => {
  it("parses a minimal sample-test", () => {
    const result = parse(minimal);
    expect(result).not.toBeNull();
    expect(result!.metadata.summary).toBe("say hello to the service");
    expect(result!.describeDescription).toBe("widget lifecycle");
    expect(result!.itBlocks).toHaveLength(1);
    expect(result!.itBlocks[0].description).toBe("creates a widget");
    expect(result!.itBlocks[0].body.length).toBeGreaterThan(0);
    expect(result!.beforeEachHooks).toHaveLength(0);
    expect(result!.afterEachHooks).toHaveLength(0);
    expect(result!.describeVariables).toHaveLength(0);
  });

  it("parses multiple it blocks in order", () => {
    const result = parse(multipleItBlocks)!;
    expect(result.itBlocks).toHaveLength(3);
    expect(result.itBlocks[0].description).toBe("first");
    expect(result.itBlocks[1].description).toBe("second");
    expect(result.itBlocks[2].description).toBe("third");
  });

  it("extracts beforeEach body and parameter name", () => {
    const result = parse(withBeforeEach)!;
    expect(result.beforeEachHooks).toHaveLength(1);
    expect(result.beforeEachHooks[0].kind).toBe("beforeEach");
    expect(result.beforeEachHooks[0].body.length).toBeGreaterThan(0);
    expect(result.beforeEachHooks[0].paramName).toBe("ctx");
  });

  it("extracts afterEach body", () => {
    const result = parse(withAfterEach)!;
    expect(result.afterEachHooks).toHaveLength(1);
    expect(result.afterEachHooks[0].kind).toBe("afterEach");
    expect(result.afterEachHooks[0].body.length).toBeGreaterThan(0);
  });

  it("captures describe-level variables", () => {
    const result = parse(withDescribeVars)!;
    expect(result.describeVariables).toHaveLength(2);
  });

  it("parses @azsdk-weight", () => {
    const result = parse(withWeight)!;
    expect(result.metadata.weight).toBe(80);
  });

  it("parses @azsdk-skip-javascript", () => {
    const result = parse(withSkipJavascript)!;
    expect(result.metadata.skipJavascript).toBe(true);
  });

  it("parses @azsdk-ignore", () => {
    const result = parse(withIgnore)!;
    expect(result.metadata.ignore).toBe(true);
  });

  it("parses multiple metadata tags together", () => {
    const result = parse(multipleMetadata)!;
    expect(result.metadata.summary).toBe("all metadata");
    expect(result.metadata.weight).toBe(42);
    expect(result.metadata.ignore).toBe(true);
  });

  it("handles it.skip and it.only as regular it blocks", () => {
    const result = parse(itSkipAndOnly)!;
    expect(result.itBlocks).toHaveLength(2);
    expect(result.itBlocks[0].description).toBe("skipped test");
    expect(result.itBlocks[1].description).toBe("only test");
  });

  it("returns null when no @summary is present", () => {
    const result = parse(noSummary);
    expect(result).toBeNull();
  });

  it("throws CompilerError for nested describe blocks", () => {
    expect(() => parse(nestedDescribe)).toThrow(CompilerError);
    expect(() => parse(nestedDescribe)).toThrow(/[Nn]ested describe/);
  });

  it("throws CompilerError when no describe block found but @summary present", () => {
    expect(() => parse(noDescribe)).toThrow(CompilerError);
    expect(() => parse(noDescribe)).toThrow(/describe/i);
  });

  it("throws CompilerError when no it blocks in describe", () => {
    expect(() => parse(noItBlocks)).toThrow(CompilerError);
    expect(() => parse(noItBlocks)).toThrow(/it.*block/i);
  });

  it("extracts async it callback body correctly", () => {
    const result = parse(asyncIt)!;
    expect(result.itBlocks).toHaveLength(1);
    // The body should have 2 statements (await doAsync(); const result = ...)
    expect(result.itBlocks[0].body).toHaveLength(2);
  });

  it("captures beforeEach ctx parameter name", () => {
    const result = parse(beforeEachWithCtx)!;
    expect(result.beforeEachHooks).toHaveLength(1);
    expect(result.beforeEachHooks[0].paramName).toBe("ctx");
  });

  it("captures all import declarations", () => {
    const result = parse(withImports)!;
    expect(result.imports).toHaveLength(3);
  });

  it("extracts summary text correctly", () => {
    const result = parse(minimal)!;
    expect(result.metadata.summary).toBe("say hello to the service");
  });

  it("extracts describe description string", () => {
    const result = parse(minimal)!;
    expect(result.describeDescription).toBe("widget lifecycle");
  });

  it("finds JSDoc summary before imports", () => {
    const result = parse(jsdocBeforeImports)!;
    expect(result).not.toBeNull();
    expect(result.metadata.summary).toBe("first thing in file");
  });

  it("collects describeStatements including variables and function declarations", () => {
    const result = parse(withDescribeFunction)!;
    // describeStatements should include both the variable and the function declaration
    expect(result.describeStatements).toHaveLength(2);
  });

  it("keeps describeVariables backward-compatible (only VariableStatements)", () => {
    const result = parse(withDescribeFunction)!;
    // describeVariables should only include the variable, not the function
    expect(result.describeVariables).toHaveLength(1);
  });

  it("does not include function declarations in itBlocks", () => {
    const result = parse(withDescribeFunction)!;
    expect(result.itBlocks).toHaveLength(1);
    expect(result.itBlocks[0].description).toBe("does stuff");
  });

  it("joins multi-line @summary into a single string", () => {
    const result = parse(multiLineSummary)!;
    expect(result.metadata.summary).toBe(
      "This is a long summary that spans multiple lines and should be joined into one string.",
    );
    expect(result.metadata.weight).toBe(10);
  });

  it("joins multi-line @summary that ends at comment close", () => {
    const result = parse(multiLineSummaryNoFollowingTag)!;
    expect(result.metadata.summary).toBe("This summary spans two lines");
  });

  it("recognizes describe.skip as a describe block", () => {
    const result = parse(describeSkip)!;
    expect(result).not.toBeNull();
    expect(result.describeDescription).toBe("skipped suite");
    expect(result.itBlocks).toHaveLength(1);
  });

  it("recognizes describe.only as a describe block", () => {
    const result = parse(describeOnly)!;
    expect(result).not.toBeNull();
    expect(result.describeDescription).toBe("only suite");
    expect(result.itBlocks).toHaveLength(1);
  });

  it("extracts beforeAll body into preamble (before beforeEach)", () => {
    const source = `
/** @summary beforeAll test */
import { describe, it, beforeAll } from "vitest";

describe("setup", function () {
  beforeAll(async function () {
    const conn = await connect();
  });

  it("does stuff", async function () {
    doStuff();
  });
});
`;
    const result = parse(source)!;
    expect(result.beforeAllHooks).toHaveLength(1);
    expect(result.beforeAllHooks[0].kind).toBe("beforeAll");
    expect(result.beforeAllHooks[0].body.length).toBeGreaterThan(0);
  });

  it("afterAll is recognized as hook (not in describeStatements)", () => {
    const source = `
/** @summary afterAll test */
import { describe, it, afterAll } from "vitest";

describe("cleanup", function () {
  afterAll(async function () {
    cleanup();
  });

  it("does stuff", async function () {
    doStuff();
  });
});
`;
    const result = parse(source)!;
    expect(result.afterAllHooks).toHaveLength(1);
    expect(result.afterAllHooks[0].kind).toBe("afterAll");
    // afterAll should NOT appear in describeStatements
    expect(result.describeStatements).toHaveLength(0);
  });

  it("throws CompilerError for nested describe.skip", () => {
    const source = `
/** @summary nested skip */
import { describe, it } from "vitest";

describe("outer", function () {
  describe.skip("inner", function () {
    it("test", async function () {});
  });
});
`;
    expect(() => parse(source)).toThrow(CompilerError);
    expect(() => parse(source)).toThrow(/[Nn]ested describe/);
  });

  it("throws CompilerError for nested describe.only", () => {
    const source = `
/** @summary nested only */
import { describe, it } from "vitest";

describe("outer", function () {
  describe.only("inner", function () {
    it("test", async function () {});
  });
});
`;
    expect(() => parse(source)).toThrow(CompilerError);
    expect(() => parse(source)).toThrow(/[Nn]ested describe/);
  });

  it("extracts expression-bodied it callback as a statement", () => {
    const source = `
/** @summary expression body */
import { describe, it } from "vitest";

describe("expr", function () {
  it("logs", () => console.log("hi"));
});
`;
    const result = parse(source)!;
    expect(result.itBlocks).toHaveLength(1);
    expect(result.itBlocks[0].body).toHaveLength(1);
  });

  it("extracts expression-bodied beforeEach callback as preamble", () => {
    const source = `
/** @summary expression beforeEach */
import { describe, it, beforeEach } from "vitest";

describe("expr-hook", function () {
  beforeEach(() => setup());

  it("test", async function () {
    doStuff();
  });
});
`;
    const result = parse(source)!;
    expect(result.beforeEachHooks).toHaveLength(1);
    expect(result.beforeEachHooks[0].body).toHaveLength(1);
  });

  it("beforeAll + beforeEach combined in order", () => {
    const source = `
/** @summary combined hooks */
import { describe, it, beforeAll, beforeEach } from "vitest";

describe("ordered", function () {
  beforeAll(async function () {
    const global = globalSetup();
  });

  beforeEach(async function () {
    const local = localSetup();
  });

  it("does stuff", async function () {
    doStuff();
  });
});
`;
    const result = parse(source)!;
    expect(result.beforeAllHooks).toHaveLength(1);
    expect(result.beforeEachHooks).toHaveLength(1);
    expect(result.beforeAllHooks[0].kind).toBe("beforeAll");
    expect(result.beforeEachHooks[0].kind).toBe("beforeEach");
  });

  // ── F1: Top-level non-import statement warning ──────────────────────

  it("warns about non-import top-level statements outside describe", () => {
    const input = `
/** @summary test */
import { describe, it } from "vitest";

const GLOBAL = "value";

describe("test", () => {
  it("x", async () => {
    console.log("hello");
  });
});
`;
    const result = parse(input);
    expect(result).not.toBeNull();
    expect(result!.warnings.length).toBeGreaterThan(0);
    expect(result!.warnings[0]).toContain("Non-import statement outside describe");
  });

  it("emits no warnings for valid file with only imports and describe", () => {
    const result = parse(minimal);
    expect(result).not.toBeNull();
    expect(result!.warnings).toHaveLength(0);
  });

  // ── F7: Recursive nested describe detection ─────────────────────────

  it("rejects describe inside if block", () => {
    const input = `
/** @summary test */
import { describe, it } from "vitest";

describe("test", () => {
  if (true) {
    describe("nested", () => {
      it("x", async () => {});
    });
  }
  it("y", async () => {
    console.log("hello");
  });
});
`;
    expect(() => parse(input)).toThrow(/[Nn]ested describe/);
  });
});
