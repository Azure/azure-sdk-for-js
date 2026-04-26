// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { compileHelper } from "../../../src/util/samples/compiler/helperCompiler.js";
import type { HelperResolver } from "../../../src/util/samples/compiler/helperCompiler.js";
import { CompilerError } from "../../../src/util/samples/compiler/types.js";

/**
 * Test predicate: classify paths containing "/src/" as source code.
 * In tests, we use synthetic file paths, so specifiers like "../src/index.js"
 * resolve to paths containing "/src/".
 */
const testIsSourceImport = (resolvedPath: string): boolean => resolvedPath.includes("/src/");

describe("compileHelper", () => {
  // --- Basic behavior ---

  it("compiles a helper with only real exports", () => {
    const source = `
export function createEndpoint(): string {
  return process.env.ENDPOINT || "https://example.azure.net";
}

export const DEFAULT_TIMEOUT = 30000;
`;
    const result = compileHelper(source, "@azure/test", "helpers.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports).toEqual(new Set(["createEndpoint", "DEFAULT_TIMEOUT"]));
    expect(result.outputText).toContain("export function createEndpoint()");
    expect(result.outputText).toContain("export const DEFAULT_TIMEOUT");
    expect(result.envVars).toContain("ENDPOINT");
  });

  it("detects empty helper (only test exports)", () => {
    const source = `
import { Recorder } from "@azure-tools/test-recorder";

export function createRecorder(ctx: unknown): Recorder {
  return new Recorder(ctx);
}
`;
    const result = compileHelper(source, "@azure/test", "testHelper.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(true);
    expect(result.survivingExports.size).toBe(0);
    expect(result.outputText).toBe("");
  });

  it("keeps mixed exports (only real ones survive)", () => {
    const source = `
import { Recorder } from "@azure-tools/test-recorder";

export function createRecorder(ctx: unknown): Recorder {
  return new Recorder(ctx);
}

export function getEndpoint(): string {
  return process.env.ENDPOINT || "";
}
`;
    const result = compileHelper(source, "@azure/test", "mixed.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports).toContain("getEndpoint");
    expect(result.survivingExports).not.toContain("createRecorder");
    expect(result.outputText).toContain("export function getEndpoint()");
    expect(result.outputText).not.toContain("createRecorder");
  });

  it("rewrites source code imports to package name", () => {
    const source = `
import { MyClient } from "../src/index.js";

export function createClient(): MyClient {
  return new MyClient("https://example.azure.net");
}
`;
    const result = compileHelper(source, "@azure/my-pkg", "helpers.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(false);
    expect(result.outputText).toContain('from "@azure/my-pkg"');
    expect(result.outputText).not.toContain("../src/index.js");
  });

  it("removes test imports and cascades dead bindings", () => {
    const source = `
import { assert } from "vitest";
import { Recorder } from "@azure-tools/test-recorder";

const testRecorder = new Recorder();

export function doAssert(x: unknown): void {
  assert.ok(x);
}

export function realHelper(): string {
  return "hello";
}
`;
    const result = compileHelper(source, "@azure/test", "cascade.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports).toContain("realHelper");
    expect(result.survivingExports).not.toContain("doAssert");
    expect(result.outputText).toContain("export function realHelper()");
    expect(result.outputText).not.toContain("assert");
    expect(result.outputText).not.toContain("testRecorder");
  });

  it("preserves external imports used by surviving code", () => {
    const source = `
import { DefaultAzureCredential } from "@azure/identity";

export function getCredential(): DefaultAzureCredential {
  return new DefaultAzureCredential();
}
`;
    const result = compileHelper(source, "@azure/test", "auth.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(false);
    expect(result.outputText).toContain("@azure/identity");
    expect(result.outputText).toContain("DefaultAzureCredential");
  });

  it("adds copyright header to non-empty output", () => {
    const source = `export const X = 42;\n`;
    const result = compileHelper(source, "@azure/test", "simple.ts", testIsSourceImport);

    expect(result.outputText).toContain("Copyright (c) Microsoft Corporation");
    expect(result.outputText).toContain("Licensed under the MIT License");
  });

  it("helper with no exports but surviving statements is not empty (side-effect module)", () => {
    const source = `
const x = 42;
function internal(): number { return x; }
`;
    const result = compileHelper(source, "@azure/test", "noexports.ts", testIsSourceImport);

    // Has surviving runtime statements → not empty (side-effect module semantics)
    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports.size).toBe(0);
    expect(result.outputText).toContain("const x = 42");
  });

  // --- Recursive helpers ---

  it("resolves nested helpers recursively", () => {
    const nestedSource = `export const NESTED_VALUE = "nested";\n`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./nested.js") {
        return { canonicalPath: "/test/public/samples/nested.ts", sourceText: nestedSource };
      }
      return undefined;
    };

    const source = `
import { NESTED_VALUE } from "./nested.js";

export function getValue(): string {
  return NESTED_VALUE;
}
`;
    const result = compileHelper(source, "@azure/test", "parent.ts", testIsSourceImport, resolver);

    expect(result.isEmpty).toBe(false);
    expect(result.outputText).toContain("getValue");
    // The nested helper import should be kept since it has survivors
    expect(result.outputText).toContain("./nested.js");
  });

  it("marks bindings dead when nested helper is empty", () => {
    const emptyNestedSource = `
import { Recorder } from "@azure-tools/test-recorder";
export function createRecorder(): Recorder { return new Recorder(); }
`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./testUtils.js") {
        return {
          canonicalPath: "/test/public/samples/testUtils.ts",
          sourceText: emptyNestedSource,
        };
      }
      return undefined;
    };

    const source = `
import { createRecorder } from "./testUtils.js";

export function setup(): void {
  const r = createRecorder();
  console.log(r);
}

export function realWork(): string {
  return "done";
}
`;
    const result = compileHelper(source, "@azure/test", "parent.ts", testIsSourceImport, resolver);

    expect(result.isEmpty).toBe(false);
    // createRecorder is dead → setup() references it → setup() is dead
    expect(result.survivingExports).toContain("realWork");
    expect(result.survivingExports).not.toContain("setup");
    expect(result.outputText).not.toContain("createRecorder");
    expect(result.outputText).not.toContain("testUtils");
  });

  it("handles circular imports gracefully", () => {
    const resolver: HelperResolver = (fromFile, specifier) => {
      if (specifier === "./b.js" && fromFile === "a.ts") {
        return {
          canonicalPath: "/b.ts",
          sourceText: `import { x } from "./a.js";\nexport const y = 1;\n`,
        };
      }
      if (specifier === "./a.js" && fromFile === "/b.ts") {
        return {
          canonicalPath: "/a.ts",
          sourceText: `import { y } from "./b.js";\nexport const x = 1;\n`,
        };
      }
      return undefined;
    };

    const source = `
import { y } from "./b.js";
export const x = 1;
`;
    // Should not infinite loop — cycle detection kicks in
    const result = compileHelper(source, "@azure/test", "a.ts", testIsSourceImport, resolver);
    expect(result.isEmpty).toBe(false);
  });

  // --- Side-effect imports ---

  it("handles helper with no import clause (side-effect import)", () => {
    const source = `
import "dotenv/config";
export const X = process.env.FOO || "";
`;
    const result = compileHelper(source, "@azure/test", "sideeffect.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(false);
    expect(result.outputText).toContain("dotenv/config");
    expect(result.outputText).toContain("export const X");
  });

  // --- Export forms ---

  it("detects export default as surviving export", () => {
    const source = `export default function main(): void { console.log("hello"); }\n`;
    const result = compileHelper(source, "@azure/test", "defaultExport.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports).toContain("default");
  });

  it("detects export { x } as surviving export", () => {
    const source = `
function helper(): string { return "hi"; }
export { helper };
`;
    const result = compileHelper(source, "@azure/test", "namedReExport.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports).toContain("helper");
  });

  // --- Transitive helper flattening ---

  it("flattens 3-level deep helper chains into nestedHelpers", () => {
    const cSource = `export const DEEP = "deep";\n`;
    const bSource = `
import { DEEP } from "./c.js";
export function getDeep(): string { return DEEP; }
`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./b.js") {
        return { canonicalPath: "/b.ts", sourceText: bSource };
      }
      if (specifier === "./c.js") {
        return { canonicalPath: "/c.ts", sourceText: cSource };
      }
      return undefined;
    };

    const source = `
import { getDeep } from "./b.js";
export function run(): string { return getDeep(); }
`;
    const result = compileHelper(source, "@azure/test", "a.ts", testIsSourceImport, resolver);

    expect(result.isEmpty).toBe(false);
    // Both b and c should be in nestedHelpers (flattened, keyed by canonical path)
    expect(result.nestedHelpers.has("/b.ts")).toBe(true);
    expect(result.nestedHelpers.has("/c.ts")).toBe(true);
    expect(result.nestedHelpers.get("/c.ts")!.survivingExports).toContain("DEEP");
  });

  // --- Re-export barrel resolution (F3) ---

  it("resolves named re-export barrel to nested helper", () => {
    const childSource = `export function foo(): string { return "hello"; }\n`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./child.js") {
        return { canonicalPath: "/helpers/child.ts", sourceText: childSource };
      }
      return undefined;
    };

    const source = `export { foo } from "./child.js";\n`;
    const result = compileHelper(
      source,
      "@azure/test",
      "/helpers/barrel.ts",
      testIsSourceImport,
      resolver,
    );

    expect(result.isEmpty).toBe(false);
    expect(result.nestedHelpers.has("/helpers/child.ts")).toBe(true);
    expect(result.nestedHelpers.get("/helpers/child.ts")!.survivingExports).toContain("foo");
  });

  it("resolves namespace re-export to nested helper", () => {
    const childSource = `export const A = 1;\nexport const B = 2;\n`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./child.js") {
        return { canonicalPath: "/helpers/child.ts", sourceText: childSource };
      }
      return undefined;
    };

    const source = `export * from "./child.js";\n`;
    const result = compileHelper(
      source,
      "@azure/test",
      "/helpers/barrel.ts",
      testIsSourceImport,
      resolver,
    );

    expect(result.isEmpty).toBe(false);
    expect(result.nestedHelpers.has("/helpers/child.ts")).toBe(true);
    const nested = result.nestedHelpers.get("/helpers/child.ts")!;
    expect(nested.survivingExports).toContain("A");
    expect(nested.survivingExports).toContain("B");
  });

  it("re-export barrel with dead specifiers is pruned", () => {
    const childSource = `
import { Recorder } from "@azure-tools/test-recorder";
export function createRecorder(): Recorder { return new Recorder(); }
export function realUtil(): string { return "real"; }
`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./child.js") {
        return { canonicalPath: "/helpers/child.ts", sourceText: childSource };
      }
      return undefined;
    };

    // Named re-export of both a dead and live symbol
    const source = `export { createRecorder, realUtil } from "./child.js";\n`;
    const result = compileHelper(
      source,
      "@azure/test",
      "/helpers/barrel.ts",
      testIsSourceImport,
      resolver,
    );

    expect(result.isEmpty).toBe(false);
    // The child helper should be compiled and only have the live export
    expect(result.nestedHelpers.has("/helpers/child.ts")).toBe(true);
    const nested = result.nestedHelpers.get("/helpers/child.ts")!;
    expect(nested.survivingExports).toContain("realUtil");
    expect(nested.survivingExports).not.toContain("createRecorder");
  });

  // --- Fix 1 (R5): Partial re-export barrel rewriting ---

  it("rewrites partial re-export barrel to match child's surviving exports", () => {
    const childSource = `
import { Recorder } from "@azure-tools/test-recorder";
export function deadFn(): Recorder { return new Recorder(); }
export function liveFn(): string { return "alive"; }
`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./child.js") {
        return { canonicalPath: "/helpers/child.ts", sourceText: childSource };
      }
      return undefined;
    };

    const source = `export { deadFn, liveFn } from "./child.js";\n`;
    const result = compileHelper(
      source,
      "@azure/test",
      "/helpers/barrel.ts",
      testIsSourceImport,
      resolver,
    );

    expect(result.isEmpty).toBe(false);
    expect(result.outputText).toContain("liveFn");
    expect(result.outputText).not.toContain("deadFn");
    // The re-export should still reference the child module
    expect(result.outputText).toContain("./child.js");
    expect(result.survivingExports).toContain("liveFn");
    expect(result.survivingExports).not.toContain("deadFn");
  });

  it("namespace re-export survives when child has partial exports", () => {
    const childSource = `
import { Recorder } from "@azure-tools/test-recorder";
export function deadFn(): Recorder { return new Recorder(); }
export function liveFn(): string { return "alive"; }
`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./child.js") {
        return { canonicalPath: "/helpers/child.ts", sourceText: childSource };
      }
      return undefined;
    };

    const source = `export * from "./child.js";\n`;
    const result = compileHelper(
      source,
      "@azure/test",
      "/helpers/barrel.ts",
      testIsSourceImport,
      resolver,
    );

    expect(result.isEmpty).toBe(false);
    // export * survives as-is — it only re-exports what the child actually exports
    expect(result.outputText).toContain("./child.js");
    expect(result.survivingExports).toContain("*");
  });

  // --- Fix 5: Tangled helper error ---

  it("throws CompilerError when helper has tangled bindings", () => {
    // `helper` references both `vi` (dead — test import) and `LIVE_VAL` (live — exported).
    // A single statement with both dead and live refs is "tangled".
    const source = `
import { vi } from "vitest";
export const LIVE_VAL = 42;
export function helper() { vi.fn(); return LIVE_VAL; }
`;
    expect(() => compileHelper(source, "@azure/test", "tangled.ts", testIsSourceImport)).toThrow(
      CompilerError,
    );
    expect(() => compileHelper(source, "@azure/test", "tangled.ts", testIsSourceImport)).toThrow(
      /tangled/i,
    );
  });

  it("does NOT throw for clean helper (no tangled bindings)", () => {
    const source = `
export function clean(): string {
  return "no test deps";
}
`;
    const result = compileHelper(source, "@azure/test", "clean.ts", testIsSourceImport);
    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports).toContain("clean");
  });

  // --- Fix 9: Canonical path normalization ---

  it("nested helper keys are canonical paths, not raw specifiers", () => {
    const childSource = `export const CHILD_VAL = 42;\n`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./child.js") {
        return { canonicalPath: "/fake/dir/child.ts", sourceText: childSource };
      }
      return undefined;
    };

    const source = `
import { CHILD_VAL } from "./child.js";
export function getValue(): number { return CHILD_VAL; }
`;
    const result = compileHelper(
      source,
      "@azure/test",
      "/fake/dir/parent.ts",
      testIsSourceImport,
      resolver,
    );

    expect(result.isEmpty).toBe(false);
    // Key must be the canonical absolute path, NOT the raw specifier "./child.js"
    expect(result.nestedHelpers.has("/fake/dir/child.ts")).toBe(true);
    expect(result.nestedHelpers.has("./child.js")).toBe(false);
  });

  // --- Destructured env vars (F5) ---

  it("extracts env vars from process.env destructuring in helper", () => {
    const source = `
export function makeClient() {
  const { ENDPOINT, API_KEY } = process.env;
  return new Client(ENDPOINT, API_KEY);
}
`;
    const result = compileHelper(source, "@azure/test", "envHelper.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(false);
    expect(result.envVars).toContain("ENDPOINT");
    expect(result.envVars).toContain("API_KEY");
  });

  // --- Finding 5: Unresolved nested helper warnings ---

  it("warns when nested helper cannot be resolved", () => {
    const resolver: HelperResolver = () => undefined;

    const source = `
import { something } from "./unknown.js";
export function run(): string { return "ok"; }
`;
    const result = compileHelper(source, "@azure/test", "parent.ts", testIsSourceImport, resolver);

    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings.some((w) => w.includes("unknown.js"))).toBe(true);
  });

  // --- Side-effect-only helper preservation (R6-F2) ---

  it("keeps side-effect-only helper (no exports, has runtime code)", () => {
    const source = `globalThis.setup = true;\n`;
    const result = compileHelper(source, "@azure/test", "setup.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports.size).toBe(0);
    expect(result.outputText).toContain("globalThis.setup = true");
  });

  it("marks helper empty when all statements eliminated", () => {
    const source = `
import { vi } from "vitest";
const mock = vi.fn();
export { mock };
`;
    const result = compileHelper(source, "@azure/test", "allDead.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(true);
    expect(result.outputText).toBe("");
  });

  it("keeps helper with both exports and side effects", () => {
    const source = `
globalThis.configured = true;
export const ENDPOINT = "https://example.com";
`;
    const result = compileHelper(source, "@azure/test", "mixed-side-effect.ts", testIsSourceImport);

    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports).toContain("ENDPOINT");
    expect(result.outputText).toContain("globalThis.configured = true");
    expect(result.outputText).toContain('export const ENDPOINT = "https://example.com"');
  });

  // --- Finding 2: Empty re-export barrel pruning ---

  it("prunes named re-export when target helper is empty", () => {
    const emptyChildSource = `
import { Recorder } from "@azure-tools/test-recorder";
export function recorder(): Recorder { return new Recorder(); }
`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./testOnly.js") {
        return { canonicalPath: "/helpers/testOnly.ts", sourceText: emptyChildSource };
      }
      return undefined;
    };

    const source = `
export { recorder } from "./testOnly.js";
export function realWork(): string { return "ok"; }
`;
    const result = compileHelper(
      source,
      "@azure/test",
      "/helpers/barrel.ts",
      testIsSourceImport,
      resolver,
    );

    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports).toContain("realWork");
    expect(result.survivingExports).not.toContain("recorder");
    expect(result.outputText).not.toContain("testOnly");
    expect(result.outputText).toContain("export function realWork()");
  });

  it("prunes namespace re-export when target helper is empty", () => {
    const emptyChildSource = `
import { Recorder } from "@azure-tools/test-recorder";
export function recorder(): Recorder { return new Recorder(); }
`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./testOnly.js") {
        return { canonicalPath: "/helpers/testOnly.ts", sourceText: emptyChildSource };
      }
      return undefined;
    };

    const source = `
export * from "./testOnly.js";
export function realWork(): string { return "ok"; }
`;
    const result = compileHelper(
      source,
      "@azure/test",
      "/helpers/barrel.ts",
      testIsSourceImport,
      resolver,
    );

    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports).toContain("realWork");
    expect(result.outputText).not.toContain("testOnly");
    expect(result.outputText).toContain("export function realWork()");
  });

  // --- Fix 3 (R6-F3): Split cycle detection from memoization ---

  it("same helper reached through two paths gets correct surviving exports both times", () => {
    const childSource = `
export function sharedUtil(): string { return "shared"; }
`;

    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./child.js") {
        return { canonicalPath: "/helpers/child.ts", sourceText: childSource };
      }
      return undefined;
    };

    // Parent A imports child (fresh compile, populates cache)
    const parentASource = `
import { sharedUtil } from "./child.js";
export function parentA(): string { return sharedUtil(); }
`;
    const resultA = compileHelper(
      parentASource,
      "@azure/test",
      "/helpers/parentA.ts",
      testIsSourceImport,
      resolver,
    );
    expect(resultA.isEmpty).toBe(false);
    expect(resultA.nestedHelpers.has("/helpers/child.ts")).toBe(true);
    expect(resultA.nestedHelpers.get("/helpers/child.ts")!.survivingExports).toContain(
      "sharedUtil",
    );

    // Parent B re-exports from child (should also get surviving exports via cache hit)
    const parentBSource = `export { sharedUtil } from "./child.js";\n`;
    const resultB = compileHelper(
      parentBSource,
      "@azure/test",
      "/helpers/parentB.ts",
      testIsSourceImport,
      resolver,
    );
    expect(resultB.isEmpty).toBe(false);
    expect(resultB.nestedHelpers.has("/helpers/child.ts")).toBe(true);
    expect(resultB.nestedHelpers.get("/helpers/child.ts")!.survivingExports).toContain(
      "sharedUtil",
    );
    // Re-export pruning works correctly — sharedUtil survives
    expect(resultB.outputText).toContain("sharedUtil");
    expect(resultB.survivingExports).toContain("sharedUtil");
  });

  it("cycle detection prevents infinite recursion", () => {
    const resolver: HelperResolver = (_fromFile, specifier) => {
      if (specifier === "./helperB.js") {
        return {
          canonicalPath: "/helpers/helperB.ts",
          sourceText: `
import { valueA } from "./helperA.js";
export const valueB = 1;
`,
        };
      }
      if (specifier === "./helperA.js") {
        return {
          canonicalPath: "/helpers/helperA.ts",
          sourceText: `
import { valueB } from "./helperB.js";
export const valueA = 2;
`,
        };
      }
      return undefined;
    };

    const source = `
import { valueB } from "./helperB.js";
export const valueA = 2;
`;
    // Should complete without hanging — cycle detection breaks the loop
    const result = compileHelper(
      source,
      "@azure/test",
      "/helpers/helperA.ts",
      testIsSourceImport,
      resolver,
    );
    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports).toContain("valueA");
  });

  // ── F5: Type-only helpers ───────────────────────────────────────────

  it("type-only helper is not empty but is marked isTypeOnly", () => {
    const source = `
export type Foo = string;
export interface Bar { x: number; }
`;
    const result = compileHelper(source, "@azure/test", "helper.ts", testIsSourceImport);
    // Type-only helpers are NOT empty - they need to be emitted for import type consumers
    expect(result.isEmpty).toBe(false);
    expect(result.isTypeOnly).toBe(true);
    expect(result.survivingExports).toContain("Foo");
    expect(result.survivingExports).toContain("Bar");
  });

  it("helper with type exports AND runtime exports is not empty", () => {
    const source = `
export type Foo = string;
export interface Bar { x: number; }
export function realWork(): string { return "hello"; }
`;
    const result = compileHelper(source, "@azure/test", "mixed-types.ts", testIsSourceImport);
    expect(result.isEmpty).toBe(false);
    expect(result.isTypeOnly).toBe(false); // Has runtime exports
    expect(result.survivingExports).toContain("realWork");
    expect(result.survivingExports).toContain("Foo");
    expect(result.survivingExports).toContain("Bar");
  });

  // ── F6: Side-effect imports ─────────────────────────────────────────

  it("helper with only side-effect import is not empty", () => {
    const source = `
import "dotenv/config";
`;
    const result = compileHelper(source, "@azure/test", "setup.ts", testIsSourceImport);
    // Side-effect imports must be preserved - they execute at import time
    expect(result.isEmpty).toBe(false);
    expect(result.isTypeOnly).toBe(false);
    expect(result.outputText).toContain('import "dotenv/config"');
  });

  it("helper with side-effect import and runtime exports is not empty", () => {
    const source = `
import "dotenv/config";
export function getEnv(key: string): string | undefined {
  return process.env[key];
}
`;
    const result = compileHelper(source, "@azure/test", "env.ts", testIsSourceImport);
    expect(result.isEmpty).toBe(false);
    expect(result.isTypeOnly).toBe(false);
    expect(result.outputText).toContain('import "dotenv/config"');
    expect(result.outputText).toContain("export function getEnv");
  });

  it("side-effect import from test package does not prevent empty", () => {
    const source = `
import "@azure-tools/test-utils";
`;
    const result = compileHelper(source, "@azure/test", "testSetup.ts", testIsSourceImport);
    // Test package side-effect imports are dropped
    expect(result.isEmpty).toBe(true);
  });
});
