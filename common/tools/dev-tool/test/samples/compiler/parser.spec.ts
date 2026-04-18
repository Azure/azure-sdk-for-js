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
});
