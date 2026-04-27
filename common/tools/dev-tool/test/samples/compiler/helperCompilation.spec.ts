// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { compileSampleTest } from "../../../src/util/samples/compiler/compiler.js";

/**
 * Test predicate: classify paths containing "/src/" as source code.
 */
const testIsSourceImport = (resolvedPath: string): boolean => resolvedPath.includes("/src/");

describe("compileSampleTest with helpers", () => {
  // Simulate a real resolver that returns absolute canonical paths.
  // The sample file lives at /project/test/sample.spec.ts and helpers are
  // resolved relative to it.
  const sampleFileName = "/project/test/sample.spec.ts";
  const makeResolver = (files: Record<string, string>) => {
    return (fromFile: string, specifier: string) => {
      const fromDir = fromFile.substring(0, fromFile.lastIndexOf("/"));
      const key = specifier.replace(/\.js$/, ".ts");
      // Build an absolute canonical path from the importing file's dir + specifier
      const canonicalPath = fromDir + "/" + key.replace(/^\.\//, "");
      if (files[key]) {
        return { canonicalPath, sourceText: files[key] };
      }
      return undefined;
    };
  };

  it("compiles with a surviving helper (import kept, helper in helperFiles)", () => {
    const helperSource = `
import { MyClient } from "../src/index.js";

export function createClient(): MyClient {
  return new MyClient(process.env.ENDPOINT || "");
}
`;
    const input = `\
/** @summary test with helper */
import { createClient } from "./helpers.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const client = createClient();
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
      fileName: sampleFileName,
      resolveHelper: makeResolver({ "./helpers.ts": helperSource }),
    });

    expect(result.outputText).toContain("./helpers.js");
    expect(result.helperFiles.size).toBe(1);
    const helperOutput = result.helperFiles.get("./helpers.ts");
    expect(helperOutput).toBeDefined();
    expect(helperOutput).toContain("export function createClient()");
    expect(helperOutput).toContain('"@azure/test"');
    // Helper env vars aggregated into main result
    expect(result.envVars).toContain("ENDPOINT");
  });

  it("marks import dead when helper is pure test infrastructure", () => {
    const testHelperSource = `
import { Recorder } from "@azure-tools/test-recorder";

export function createRecorder(ctx: unknown): Recorder {
  return new Recorder(ctx);
}
`;
    const input = `\
/** @summary test with empty helper */
import { createRecorder } from "./testUtils.js";
import { MyClient } from "../src/index.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const client = new MyClient("url");
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
      fileName: sampleFileName,
      resolveHelper: makeResolver({ "./testUtils.ts": testHelperSource }),
    });

    // testUtils import should be removed (empty helper)
    expect(result.outputText).not.toContain("testUtils");
    expect(result.outputText).not.toContain("createRecorder");
    expect(result.helperFiles.size).toBe(0);
    // MyClient should still be there
    expect(result.outputText).toContain('"@azure/test"');
  });

  it("cascades dead bindings from empty helper through spec file", () => {
    const testHelperSource = `
import { Recorder } from "@azure-tools/test-recorder";
export function createRecorder(): Recorder {
  return new Recorder();
}
`;
    const input = `\
/** @summary cascade from empty helper */
import { createRecorder } from "./testUtils.js";
import { MyClient } from "../src/index.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const client = new MyClient("url");
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
      fileName: sampleFileName,
      resolveHelper: makeResolver({ "./testUtils.ts": testHelperSource }),
    });

    // createRecorder is dead (empty helper) → import removed, binding cascaded
    expect(result.outputText).not.toContain("createRecorder");
    expect(result.outputText).not.toContain("testUtils");
    expect(result.outputText).toContain("new MyClient");
  });

  it("keeps helper import as-is when resolver returns undefined", () => {
    const input = `\
/** @summary test unresolvable helper */
import { helper } from "./missing.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    helper();
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
      fileName: sampleFileName,
      resolveHelper: () => undefined,
    });

    // Import kept as-is (couldn't resolve) + warning
    expect(result.outputText).toContain("./missing.js");
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("missing.js");
  });

  it("works without resolveHelper (backward compatible)", () => {
    const input = `\
/** @summary no resolver */
import { helper } from "./helpers.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    helper();
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
    });

    // Import kept as-is (no resolver)
    expect(result.outputText).toContain("./helpers.js");
    expect(result.helperFiles.size).toBe(0);
  });

  // --- Finding 3: Duplicate imports to same helper ---

  it("handles duplicate imports from same empty helper", () => {
    const testHelperSource = `
import { Recorder } from "@azure-tools/test-recorder";
export function a(): Recorder { return new Recorder(); }
export function b(): Recorder { return new Recorder(); }
`;
    const input = `\
/** @summary duplicate empty helper imports */
import { a } from "./testUtils.js";
import { b } from "./testUtils.js";
import { MyClient } from "../src/index.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    const client = new MyClient("url");
    console.log(client);
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
      fileName: sampleFileName,
      resolveHelper: makeResolver({ "./testUtils.ts": testHelperSource }),
    });

    // Both a and b should be dead (empty helper) — neither import should survive
    expect(result.outputText).not.toContain("testUtils");
    expect(result.outputText).not.toContain("import { a }");
    expect(result.outputText).not.toContain("import { b }");
    expect(result.helperFiles.size).toBe(0);
    expect(result.outputText).toContain('"@azure/test"');
  });

  it("handles duplicate imports from same surviving helper", () => {
    const helperSource = `
export function helper1(): string { return "one"; }
export function helper2(): string { return "two"; }
`;
    const input = `\
/** @summary duplicate surviving helper imports */
import { helper1 } from "./utils.js";
import { helper2 } from "./utils.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    console.log(helper1());
    console.log(helper2());
  });
});
`;
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
      fileName: sampleFileName,
      resolveHelper: makeResolver({ "./utils.ts": helperSource }),
    });

    // Both imports should survive and be present (merged or separate)
    expect(result.outputText).toContain("helper1");
    expect(result.outputText).toContain("helper2");
    expect(result.helperFiles.size).toBe(1);
    expect(result.helperFiles.has("./utils.ts")).toBe(true);
  });

  it("helperFiles keys are relative to sample file (subdirectory helper)", () => {
    const helperSource = `
export function doStuff(): string { return "stuff"; }
`;
    const input = `\
/** @summary subdirectory helper */
import { doStuff } from "./helpers/util.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    console.log(doStuff());
  });
});
`;
    // Resolver returns absolute path: /project/test/helpers/util.ts
    const resolver = (_fromFile: string, specifier: string) => {
      const key = specifier.replace(/\.js$/, ".ts");
      if (key === "./helpers/util.ts") {
        return { canonicalPath: "/project/test/helpers/util.ts", sourceText: helperSource };
      }
      return undefined;
    };
    const result = compileSampleTest(input, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
      fileName: sampleFileName,
      resolveHelper: resolver,
    });

    expect(result.helperFiles.size).toBe(1);
    expect(result.helperFiles.has("./helpers/util.ts")).toBe(true);
  });
});

// ── Strict mode and helperCache tests ────────────────────────────────

describe("compileSampleTest — strict mode", () => {
  const sampleFileName = "/project/test/sample.spec.ts";

  it("throws CompilerError for unresolved helper when strict: true", () => {
    const input = `\
/** @summary strict test */
import { helper } from "./missing.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    helper();
  });
});
`;
    expect(() =>
      compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/test",
        fileName: sampleFileName,
        resolveHelper: () => undefined,
        strict: true,
      }),
    ).toThrow(/Unresolved local helper/);
  });

  it("throws CompilerError for unresolved nested helper when strict: true", () => {
    const helperWithNested = `
import { nested } from "./nested.js";
export function helper() { return nested(); }
`;
    const input = `\
/** @summary strict nested test */
import { helper } from "./helpers.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    helper();
  });
});
`;
    // Resolver resolves the first helper but not the nested one
    const resolver = (fromFile: string, specifier: string) => {
      if (specifier === "./helpers.js") {
        return { canonicalPath: "/project/test/helpers.ts", sourceText: helperWithNested };
      }
      return undefined; // nested.js not found
    };

    expect(() =>
      compileSampleTest(input, {
        isSourceImport: testIsSourceImport,
        packageName: "@azure/test",
        fileName: sampleFileName,
        resolveHelper: resolver,
        strict: true,
      }),
    ).toThrow(/Unresolved nested helper/);
  });
});

describe("compileSampleTest — helperCache reuse", () => {
  const sampleFileName = "/project/test/sample.spec.ts";
  const sharedHelperSource = `
export function sharedUtil(): string { return "shared"; }
`;

  it("reuses cached helper across multiple compilations", () => {
    const inputA = `\
/** @summary sample A */
import { sharedUtil } from "./shared.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("x", async () => {
    console.log(sharedUtil());
  });
});
`;
    const inputB = `\
/** @summary sample B */
import { sharedUtil } from "./shared.js";
import { describe, it } from "vitest";

describe("test", () => {
  it("y", async () => {
    console.log(sharedUtil());
  });
});
`;
    const resolver = (_: string, specifier: string) => {
      if (specifier === "./shared.js") {
        return { canonicalPath: "/project/test/shared.ts", sourceText: sharedHelperSource };
      }
      return undefined;
    };

    // Shared cache across compilations
    const helperCache = new Map();

    // First compilation populates cache
    const resultA = compileSampleTest(inputA, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
      fileName: sampleFileName,
      resolveHelper: resolver,
      helperCache,
    });

    expect(resultA.helperFiles.size).toBe(1);
    expect(helperCache.size).toBe(1);
    expect(helperCache.has("/project/test/shared.ts")).toBe(true);

    // Second compilation reuses cache
    const resultB = compileSampleTest(inputB, {
      isSourceImport: testIsSourceImport,
      packageName: "@azure/test",
      fileName: "/project/test/sample2.spec.ts",
      resolveHelper: resolver,
      helperCache,
    });

    expect(resultB.helperFiles.size).toBe(1);
    // Cache size unchanged (reused)
    expect(helperCache.size).toBe(1);
    // Both results have the same helper content
    expect(resultA.helperFiles.get("./shared.ts")).toBe(resultB.helperFiles.get("./shared.ts"));
  });
});
