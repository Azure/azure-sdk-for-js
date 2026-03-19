// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import {
  resolveSubpathImport,
  resolveImportsInContent,
  resolveImportsInDir,
  sourcePathToOutputPath,
  buildConditionsSet,
  build,
} from "../../src/index.ts";
import type { ImportsMap } from "../../src/index.ts";

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-resolve-imports-"));
}

// ---------------------------------------------------------------------------
// Unit tests: resolveSubpathImport
// ---------------------------------------------------------------------------

describe("resolveSubpathImport", () => {
  const importsMap: ImportsMap = {
    "#platform/*": {
      browser: "./src/*-browser.mts",
      "react-native": "./src/*-react-native.mts",
      default: "./src/*.ts",
    },
    "#state": {
      require: "./src/state-cjs.cts",
      default: "./src/state.ts",
    },
  };

  it("resolves wildcard pattern for browser condition", () => {
    const conditions = new Set(["browser", "import", "default"]);
    expect(resolveSubpathImport("#platform/interfaces", importsMap, conditions)).toBe(
      "./src/interfaces-browser.mts",
    );
  });

  it("resolves wildcard pattern for react-native condition", () => {
    const conditions = new Set(["react-native", "import", "default"]);
    expect(resolveSubpathImport("#platform/interfaces", importsMap, conditions)).toBe(
      "./src/interfaces-react-native.mts",
    );
  });

  it("resolves wildcard pattern for default condition (node)", () => {
    const conditions = new Set(["import", "default"]);
    expect(resolveSubpathImport("#platform/interfaces", importsMap, conditions)).toBe(
      "./src/interfaces.ts",
    );
  });

  it("resolves nested path through wildcard", () => {
    const conditions = new Set(["browser", "import", "default"]);
    expect(resolveSubpathImport("#platform/client/getClient", importsMap, conditions)).toBe(
      "./src/client/getClient-browser.mts",
    );
  });

  it("resolves exact match for CJS condition", () => {
    const conditions = new Set(["require", "default"]);
    expect(resolveSubpathImport("#state", importsMap, conditions)).toBe("./src/state-cjs.cts");
  });

  it("resolves exact match for default condition", () => {
    const conditions = new Set(["import", "default"]);
    expect(resolveSubpathImport("#state", importsMap, conditions)).toBe("./src/state.ts");
  });

  it("returns undefined for unmatched specifier", () => {
    const conditions = new Set(["browser", "default"]);
    expect(resolveSubpathImport("#unknown/foo", importsMap, conditions)).toBeUndefined();
  });

  it("returns undefined when no condition matches", () => {
    const map: ImportsMap = {
      "#foo": { browser: "./src/foo-browser.ts" },
    };
    const conditions = new Set(["import", "default"]);
    expect(resolveSubpathImport("#foo", map, conditions)).toBeUndefined();
  });

  it("handles nested conditions", () => {
    const map: ImportsMap = {
      "#nested": {
        browser: {
          import: "./src/browser-esm.ts",
          default: "./src/browser-cjs.ts",
        },
        default: "./src/node.ts",
      },
    };
    const conditions = new Set(["browser", "import", "default"]);
    expect(resolveSubpathImport("#nested", map, conditions)).toBe("./src/browser-esm.ts");
  });
});

// ---------------------------------------------------------------------------
// Unit tests: sourcePathToOutputPath
// ---------------------------------------------------------------------------

describe("sourcePathToOutputPath", () => {
  const root = "/pkg";
  const rootDir = "/pkg/src";
  const outDir = "/pkg/dist/browser";

  it("maps .mts to .mjs", () => {
    expect(sourcePathToOutputPath("./src/foo-browser.mts", rootDir, outDir, root)).toBe(
      path.join(outDir, "foo-browser.mjs"),
    );
  });

  it("maps .ts to .js", () => {
    expect(sourcePathToOutputPath("./src/foo.ts", rootDir, outDir, root)).toBe(
      path.join(outDir, "foo.js"),
    );
  });

  it("maps .cts to .cjs", () => {
    expect(sourcePathToOutputPath("./src/state-cjs.cts", rootDir, outDir, root)).toBe(
      path.join(outDir, "state-cjs.cjs"),
    );
  });

  it("preserves nested directory structure", () => {
    expect(sourcePathToOutputPath("./src/util/sha256-browser.mts", rootDir, outDir, root)).toBe(
      path.join(outDir, "util/sha256-browser.mjs"),
    );
  });
});

// ---------------------------------------------------------------------------
// Unit tests: buildConditionsSet
// ---------------------------------------------------------------------------

describe("buildConditionsSet", () => {
  it("includes target condition, import, and default for ESM", () => {
    const set = buildConditionsSet("browser", "module");
    expect(set).toEqual(new Set(["browser", "import", "default"]));
  });

  it("includes target condition, require, and default for CJS", () => {
    const set = buildConditionsSet("require", "commonjs");
    expect(set).toEqual(new Set(["require", "default"]));
  });

  it("deduplicates when target condition is import", () => {
    const set = buildConditionsSet("import", "module");
    expect(set).toEqual(new Set(["import", "default"]));
  });
});

// ---------------------------------------------------------------------------
// Unit tests: resolveImportsInContent
// ---------------------------------------------------------------------------

describe("resolveImportsInContent", () => {
  const importsMap: ImportsMap = {
    "#platform/*": {
      browser: "./src/*-browser.mts",
      default: "./src/*.ts",
    },
  };
  const browserConditions = new Set(["browser", "import", "default"]);
  const nodeConditions = new Set(["import", "default"]);
  const rootDir = "/pkg/src";
  const packageRoot = "/pkg";

  it("resolves #platform/* in ESM import for browser target", () => {
    const content = 'import { PipelineRequest } from "#platform/interfaces";\n';
    const outDir = "/pkg/dist/browser";
    const outputFile = path.join(outDir, "pipeline.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      browserConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(true);
    expect(result.content).toBe('import { PipelineRequest } from "./interfaces-browser.mjs";\n');
  });

  it("resolves #platform/* in ESM import for node target", () => {
    const content = 'import { PipelineRequest } from "#platform/interfaces";\n';
    const outDir = "/pkg/dist/esm";
    const outputFile = path.join(outDir, "pipeline.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      nodeConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(true);
    expect(result.content).toBe('import { PipelineRequest } from "./interfaces.js";\n');
  });

  it("resolves nested path imports", () => {
    const content = 'import { getClient } from "#platform/client/getClient";\n';
    const outDir = "/pkg/dist/browser";
    const outputFile = path.join(outDir, "pipeline.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      browserConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(true);
    expect(result.content).toBe('import { getClient } from "./client/getClient-browser.mjs";\n');
  });

  it("resolves from a nested file to a top-level target", () => {
    const content = 'import { X } from "#platform/interfaces";\n';
    const outDir = "/pkg/dist/browser";
    const outputFile = path.join(outDir, "client", "getClient.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      browserConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(true);
    expect(result.content).toBe('import { X } from "../interfaces-browser.mjs";\n');
  });

  it("resolves export { } from specifiers", () => {
    const content = 'export { PipelineRequest } from "#platform/interfaces";\n';
    const outDir = "/pkg/dist/browser";
    const outputFile = path.join(outDir, "index.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      browserConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(true);
    expect(result.content).toBe('export { PipelineRequest } from "./interfaces-browser.mjs";\n');
  });

  it("resolves dynamic import()", () => {
    const content = 'const mod = await import("#platform/interfaces");\n';
    const outDir = "/pkg/dist/browser";
    const outputFile = path.join(outDir, "index.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      browserConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(true);
    expect(result.content).toBe('const mod = await import("./interfaces-browser.mjs");\n');
  });

  it("resolves require()", () => {
    const content = 'const { PipelineRequest } = require("#platform/interfaces");\n';
    const outDir = "/pkg/dist/commonjs";
    const outputFile = path.join(outDir, "index.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      nodeConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(true);
    expect(result.content).toBe('const { PipelineRequest } = require("./interfaces.js");\n');
  });

  it("leaves non-# imports unchanged", () => {
    const content = 'import { X } from "./interfaces.js";\nimport { Y } from "@azure/core-auth";\n';
    const outDir = "/pkg/dist/browser";
    const outputFile = path.join(outDir, "index.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      browserConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(false);
    expect(result.content).toBe(content);
  });

  it("ignores # in comments, strings, and template literals", () => {
    const content = [
      '// This comment mentions "#platform/interfaces"',
      '/* Also "#platform/client" */',
      'const label = "#platform/not-an-import";',
      "const tmpl = `value is #platform/nope`;",
      'import { A } from "#platform/interfaces";',
      "",
    ].join("\n");
    const outDir = "/pkg/dist/browser";
    const outputFile = path.join(outDir, "index.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      browserConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(true);
    // Only the actual import declaration should be rewritten
    expect(result.content).toContain('// This comment mentions "#platform/interfaces"');
    expect(result.content).toContain('/* Also "#platform/client" */');
    expect(result.content).toContain('const label = "#platform/not-an-import";');
    expect(result.content).toContain("const tmpl = `value is #platform/nope`");
    expect(result.content).toContain('import { A } from "./interfaces-browser.mjs";');
  });

  it("handles multiple #platform imports in one file", () => {
    const content = [
      'import { A } from "#platform/interfaces";',
      'import { B } from "#platform/client/getClient";',
      'import { C } from "./shared.js";',
      "",
    ].join("\n");
    const outDir = "/pkg/dist/browser";
    const outputFile = path.join(outDir, "index.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      browserConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(true);
    expect(result.content).toBe(
      [
        'import { A } from "./interfaces-browser.mjs";',
        'import { B } from "./client/getClient-browser.mjs";',
        'import { C } from "./shared.js";',
        "",
      ].join("\n"),
    );
  });
});

// ---------------------------------------------------------------------------
// Integration test: full build with resolveImports
// ---------------------------------------------------------------------------

describe("build with resolveImports", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("resolves #platform/* imports in output for browser and node targets", async () => {
    // Create source files
    const srcDir = path.join(tmpDir, "src");
    await fs.mkdir(srcDir, { recursive: true });

    // Shared file that uses #platform import
    await fs.writeFile(
      path.join(srcDir, "index.ts"),
      ['import { greet } from "#platform/greet";', "export { greet };", ""].join("\n"),
    );

    // Node implementation
    await fs.writeFile(
      path.join(srcDir, "greet.ts"),
      ['export function greet(): string { return "hello from node"; }', ""].join("\n"),
    );

    // Browser implementation
    await fs.writeFile(
      path.join(srcDir, "greet-browser.mts"),
      ['export function greet(): string { return "hello from browser"; }', ""].join("\n"),
    );

    // package.json with imports field
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      JSON.stringify(
        {
          name: "test-resolve-imports",
          type: "module",
          imports: {
            "#platform/*": {
              browser: "./src/*-browser.mts",
              default: "./src/*.ts",
            },
          },
        },
        null,
        2,
      ),
    );

    // tsconfig for browser
    await fs.writeFile(
      path.join(tmpDir, "tsconfig.browser.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          declaration: true,
          outDir: "./dist/browser",
          rootDir: "./src",
          customConditions: ["browser"],
          lib: ["ES2022", "DOM"],
          types: [],
          skipLibCheck: true,
        },
        include: ["./src/**/*.ts", "./src/**/*.mts"],
      }),
    );

    // tsconfig for ESM (node)
    await fs.writeFile(
      path.join(tmpDir, "tsconfig.esm.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          declaration: true,
          outDir: "./dist/esm",
          rootDir: "./src",
          lib: ["ES2022"],
          types: ["node"],
          skipLibCheck: true,
        },
        include: ["./src/**/*.ts"],
        exclude: ["./src/**/*-browser.mts"],
      }),
    );

    // warp config
    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: {
          ".": "./src/index.ts",
        },
        targets: [
          {
            name: "browser",
            tsconfig: "./tsconfig.browser.json",
            resolveImports: true,
          },
          {
            name: "esm",
            condition: "import",
            tsconfig: "./tsconfig.esm.json",
            resolveImports: true,
          },
        ],
      }),
    );

    // Build
    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Verify browser output has resolved import
    const browserIndex = await fs.readFile(path.join(tmpDir, "dist/browser/index.js"), "utf-8");
    expect(browserIndex).toContain("./greet-browser.mjs");
    expect(browserIndex).not.toContain("#platform");

    // Verify browser .d.ts has resolved import
    const browserDts = await fs.readFile(path.join(tmpDir, "dist/browser/index.d.ts"), "utf-8");
    expect(browserDts).toContain("./greet-browser.mjs");
    expect(browserDts).not.toContain("#platform");

    // Verify ESM output has resolved import (default → .ts → .js)
    const esmIndex = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(esmIndex).toContain("./greet.js");
    expect(esmIndex).not.toContain("#platform");
    expect(esmIndex).not.toContain("greet-browser");
  });
});

// ---------------------------------------------------------------------------
// Unit tests: resolveImportsInContent — unresolved specifiers
// ---------------------------------------------------------------------------

describe("resolveImportsInContent unresolved tracking", () => {
  const importsMap: ImportsMap = {
    "#platform/*": {
      browser: "./src/*-browser.mts",
      default: "./src/*.ts",
    },
  };
  const browserConditions = new Set(["browser", "import", "default"]);
  const rootDir = "/pkg/src";
  const outDir = "/pkg/dist/browser";
  const packageRoot = "/pkg";

  it("reports unresolved specifiers that don't match any import entry", () => {
    const content = [
      'import { A } from "#platform/interfaces";',
      'import { B } from "#unknown/foo";',
      "",
    ].join("\n");
    const outputFile = path.join(outDir, "index.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      browserConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(true);
    expect(result.unresolved).toEqual(["#unknown/foo"]);
    // The resolved one should still be rewritten
    expect(result.content).toContain("./interfaces-browser.mjs");
    // The unresolved one is left as-is
    expect(result.content).toContain("#unknown/foo");
  });

  it("returns empty unresolved array when all specifiers resolve", () => {
    const content = 'import { A } from "#platform/interfaces";\n';
    const outputFile = path.join(outDir, "index.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      importsMap,
      browserConditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(true);
    expect(result.unresolved).toEqual([]);
  });

  it("reports unresolved when no condition matches", () => {
    const map: ImportsMap = {
      "#foo": { browser: "./src/foo-browser.ts" },
    };
    const conditions = new Set(["import", "default"]); // no "browser"
    const content = 'import { X } from "#foo";\n';
    const outputFile = path.join(outDir, "index.js");

    const result = resolveImportsInContent(
      content,
      outputFile,
      map,
      conditions,
      rootDir,
      outDir,
      packageRoot,
    );

    expect(result.changed).toBe(false);
    expect(result.unresolved).toEqual(["#foo"]);
  });
});

// ---------------------------------------------------------------------------
// Unit tests: resolveImportsInDir — verification
// ---------------------------------------------------------------------------

describe("resolveImportsInDir verification", () => {
  let tmpDir: string;
  let srcDir: string;
  let outDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
    srcDir = path.join(tmpDir, "src");
    outDir = path.join(tmpDir, "dist");
    await fs.mkdir(srcDir, { recursive: true });
    await fs.mkdir(outDir, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("reports unresolved specifiers from output files", async () => {
    // Create an output .js file with an unresolvable # import
    await fs.writeFile(
      path.join(outDir, "index.js"),
      'import { X } from "#unknown/module";\nexport { X };\n',
    );

    const importsMap: ImportsMap = {
      "#platform/*": { default: "./src/*.ts" },
    };

    const result = await resolveImportsInDir(
      outDir,
      importsMap,
      new Set(["default"]),
      srcDir,
      tmpDir,
    );

    expect(result.unresolvedSpecifiers.length).toBe(1);
    expect(result.unresolvedSpecifiers[0]!.specifier).toBe("#unknown/module");
    expect(result.unresolvedSpecifiers[0]!.file).toContain("index.js");
  });

  it("reports missing resolved targets when output file does not exist", async () => {
    // Create an output .js file that imports #platform/nonexistent
    // The import will resolve via the map, but the target file won't exist
    await fs.writeFile(
      path.join(outDir, "index.js"),
      'import { X } from "#platform/nonexistent";\nexport { X };\n',
    );

    const importsMap: ImportsMap = {
      "#platform/*": { default: "./src/*.ts" },
    };

    const result = await resolveImportsInDir(
      outDir,
      importsMap,
      new Set(["default"]),
      srcDir,
      tmpDir,
    );

    // The specifier resolves, but the target file (dist/nonexistent.js) doesn't exist
    expect(result.missingTargets.length).toBe(1);
    expect(result.missingTargets[0]!.specifier).toBe("#platform/nonexistent");
    expect(result.missingTargets[0]!.resolvedPath).toContain("nonexistent.js");
  });

  it("reports no issues when all resolved targets exist", async () => {
    // Create both the importing file and the target file
    await fs.writeFile(
      path.join(outDir, "index.js"),
      'import { X } from "#platform/greet";\nexport { X };\n',
    );
    await fs.writeFile(path.join(outDir, "greet.js"), 'export const X = "hello";\n');

    const importsMap: ImportsMap = {
      "#platform/*": { default: "./src/*.ts" },
    };

    const result = await resolveImportsInDir(
      outDir,
      importsMap,
      new Set(["default"]),
      srcDir,
      tmpDir,
    );

    expect(result.unresolvedSpecifiers).toEqual([]);
    expect(result.missingTargets).toEqual([]);
    expect(result.filesChanged).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Integration test: default-on resolveImports when imports field exists
// ---------------------------------------------------------------------------

describe("build with default-on resolveImports", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("resolves imports by default when package.json has imports field (no explicit resolveImports)", async () => {
    const srcDir = path.join(tmpDir, "src");
    await fs.mkdir(srcDir, { recursive: true });

    await fs.writeFile(
      path.join(srcDir, "index.ts"),
      ['import { greet } from "#platform/greet";', "export { greet };", ""].join("\n"),
    );

    await fs.writeFile(
      path.join(srcDir, "greet.ts"),
      ['export function greet(): string { return "hello"; }', ""].join("\n"),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      JSON.stringify(
        {
          name: "test-default-on",
          type: "module",
          imports: {
            "#platform/*": { default: "./src/*.ts" },
          },
        },
        null,
        2,
      ),
    );

    await fs.writeFile(
      path.join(tmpDir, "tsconfig.esm.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          declaration: true,
          outDir: "./dist/esm",
          rootDir: "./src",
          lib: ["ES2022"],
          types: ["node"],
          skipLibCheck: true,
        },
        include: ["./src/**/*.ts"],
      }),
    );

    // warp config WITHOUT resolveImports — should default to true
    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          {
            name: "esm",
            condition: "import",
            tsconfig: "./tsconfig.esm.json",
            // no resolveImports field
          },
        ],
      }),
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Verify imports were resolved despite no explicit resolveImports: true
    const esmIndex = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(esmIndex).toContain("./greet.js");
    expect(esmIndex).not.toContain("#platform");
  });

  it("respects resolveImports: false opt-out even when imports field exists", async () => {
    const srcDir = path.join(tmpDir, "src");
    await fs.mkdir(srcDir, { recursive: true });

    await fs.writeFile(
      path.join(srcDir, "index.ts"),
      ['import { greet } from "#platform/greet";', "export { greet };", ""].join("\n"),
    );

    await fs.writeFile(
      path.join(srcDir, "greet.ts"),
      ['export function greet(): string { return "hello"; }', ""].join("\n"),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      JSON.stringify(
        {
          name: "test-opt-out",
          type: "module",
          imports: {
            "#platform/*": { default: "./src/*.ts" },
          },
        },
        null,
        2,
      ),
    );

    await fs.writeFile(
      path.join(tmpDir, "tsconfig.esm.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          declaration: true,
          outDir: "./dist/esm",
          rootDir: "./src",
          lib: ["ES2022"],
          types: ["node"],
          skipLibCheck: true,
        },
        include: ["./src/**/*.ts"],
      }),
    );

    // Explicit resolveImports: false
    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          {
            name: "esm",
            condition: "import",
            tsconfig: "./tsconfig.esm.json",
            resolveImports: false,
          },
        ],
      }),
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Verify imports were NOT resolved
    const esmIndex = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(esmIndex).toContain("#platform/greet");
  });
});

// ---------------------------------------------------------------------------
// Integration test: build fails on unresolved specifiers
// ---------------------------------------------------------------------------

describe("build fails on unresolved # specifiers", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("fails the build when # specifiers cannot be resolved", async () => {
    const srcDir = path.join(tmpDir, "src");
    await fs.mkdir(srcDir, { recursive: true });

    // index.ts imports a specifier that doesn't match the imports map
    await fs.writeFile(
      path.join(srcDir, "index.ts"),
      ['import { greet } from "#missing/greet";', "export { greet };", ""].join("\n"),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      JSON.stringify(
        {
          name: "test-fail-unresolved",
          type: "module",
          imports: {
            "#platform/*": { default: "./src/*.ts" },
          },
        },
        null,
        2,
      ),
    );

    await fs.writeFile(
      path.join(tmpDir, "tsconfig.esm.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          declaration: true,
          outDir: "./dist/esm",
          rootDir: "./src",
          lib: ["ES2022"],
          types: ["node"],
          skipLibCheck: true,
        },
        include: ["./src/**/*.ts"],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          {
            name: "esm",
            condition: "import",
            tsconfig: "./tsconfig.esm.json",
            resolveImports: true,
          },
        ],
      }),
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(false);
  });
});
