// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { compileHelper } from "../../../src/util/samples/compiler/helperCompiler.js";
import type { HelperResolver } from "../../../src/util/samples/compiler/helperCompiler.js";

describe("compileHelper", () => {
  // --- Basic behavior ---

  it("compiles a helper with only real exports", () => {
    const source = `
export function createEndpoint(): string {
  return process.env.ENDPOINT || "https://example.azure.net";
}

export const DEFAULT_TIMEOUT = 30000;
`;
    const result = compileHelper(source, "@azure/test", "helpers.ts");

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
    const result = compileHelper(source, "@azure/test", "testHelper.ts");

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
    const result = compileHelper(source, "@azure/test", "mixed.ts");

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
    const result = compileHelper(source, "@azure/my-pkg", "helpers.ts");

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
    const result = compileHelper(source, "@azure/test", "cascade.ts");

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
    const result = compileHelper(source, "@azure/test", "auth.ts");

    expect(result.isEmpty).toBe(false);
    expect(result.outputText).toContain("@azure/identity");
    expect(result.outputText).toContain("DefaultAzureCredential");
  });

  it("adds copyright header to non-empty output", () => {
    const source = `export const X = 42;\n`;
    const result = compileHelper(source, "@azure/test", "simple.ts");

    expect(result.outputText).toContain("Copyright (c) Microsoft Corporation");
    expect(result.outputText).toContain("Licensed under the MIT License");
  });

  it("helper with no exports is empty", () => {
    const source = `
const x = 42;
function internal(): number { return x; }
`;
    const result = compileHelper(source, "@azure/test", "noexports.ts");

    expect(result.isEmpty).toBe(true);
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
    const result = compileHelper(source, "@azure/test", "parent.ts", resolver);

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
        return { canonicalPath: "/test/public/samples/testUtils.ts", sourceText: emptyNestedSource };
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
    const result = compileHelper(source, "@azure/test", "parent.ts", resolver);

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
        return { canonicalPath: "/b.ts", sourceText: `import { x } from "./a.js";\nexport const y = 1;\n` };
      }
      if (specifier === "./a.js" && fromFile === "/b.ts") {
        return { canonicalPath: "/a.ts", sourceText: `import { y } from "./b.js";\nexport const x = 1;\n` };
      }
      return undefined;
    };

    const source = `
import { y } from "./b.js";
export const x = 1;
`;
    // Should not infinite loop — cycle detection kicks in
    const result = compileHelper(source, "@azure/test", "a.ts", resolver);
    expect(result.isEmpty).toBe(false);
  });

  // --- Side-effect imports ---

  it("handles helper with no import clause (side-effect import)", () => {
    const source = `
import "dotenv/config";
export const X = process.env.FOO || "";
`;
    const result = compileHelper(source, "@azure/test", "sideeffect.ts");

    expect(result.isEmpty).toBe(false);
    expect(result.outputText).toContain("dotenv/config");
    expect(result.outputText).toContain("export const X");
  });

  // --- Export forms ---

  it("detects export default as surviving export", () => {
    const source = `export default function main(): void { console.log("hello"); }\n`;
    const result = compileHelper(source, "@azure/test", "defaultExport.ts");

    expect(result.isEmpty).toBe(false);
    expect(result.survivingExports).toContain("default");
  });

  it("detects export { x } as surviving export", () => {
    const source = `
function helper(): string { return "hi"; }
export { helper };
`;
    const result = compileHelper(source, "@azure/test", "namedReExport.ts");

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
    const result = compileHelper(source, "@azure/test", "a.ts", resolver);

    expect(result.isEmpty).toBe(false);
    // Both b and c should be in nestedHelpers (flattened)
    expect(result.nestedHelpers.has("./b.js")).toBe(true);
    expect(result.nestedHelpers.has("./c.js")).toBe(true);
    expect(result.nestedHelpers.get("./c.js")!.survivingExports).toContain("DEEP");
  });
});
