// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { resolveExportsMap, getExportsDiff } from "../../src/exports.ts";
import type { CompileResult } from "../../src/compiler.ts";
import type { WarpConfig } from "../../src/types.ts";
import type { Diagnostic } from "typescript";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-exports-"));
}

describe("resolveExportsMap", () => {
  it("passes through non-ts entries unchanged", () => {
    const config: WarpConfig = {
      exports: { "./package.json": "./package.json" },
      targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
    };

    const results: CompileResult[] = [
      {
        target: config.targets[0],
        diagnostics: [],
        success: true,
        outDir: "/pkg/dist/esm",
        rootDir: "/pkg/src",
        compileTimeMs: 100,
        deduped: false,
      },
    ];

    const map = resolveExportsMap(config, results, "/pkg");
    expect(map["./package.json"]).toBe("./package.json");
  });

  it("resolves .ts entries to condition-mapped dist paths", () => {
    const config: WarpConfig = {
      exports: { ".": "./src/index.ts" },
      targets: [
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        { name: "cjs", condition: "require", tsconfig: "./tsconfig.cjs.json" },
      ],
    };

    const results: CompileResult[] = [
      {
        target: config.targets[0],
        diagnostics: [],
        success: true,
        outDir: "/pkg/dist/esm",
        rootDir: "/pkg/src",
        compileTimeMs: 100,
        deduped: false,
      },
      {
        target: config.targets[1],
        diagnostics: [],
        success: true,
        outDir: "/pkg/dist/commonjs",
        rootDir: "/pkg/src",
        compileTimeMs: 100,
        deduped: false,
      },
    ];

    const map = resolveExportsMap(config, results, "/pkg");
    const dot = map["."] as Record<string, Record<string, string>>;

    expect(dot["import"]).toEqual({
      types: "./dist/esm/index.d.ts",
      default: "./dist/esm/index.js",
    });
    expect(dot["require"]).toEqual({
      types: "./dist/commonjs/index.d.ts",
      default: "./dist/commonjs/index.js",
    });
  });

  it("preserves target declaration order in conditions", () => {
    const config: WarpConfig = {
      exports: { ".": "./src/index.ts" },
      targets: [
        { name: "browser", condition: "browser", tsconfig: "./tsconfig.browser.json" },
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        { name: "cjs", condition: "require", tsconfig: "./tsconfig.cjs.json" },
      ],
    };

    const results: CompileResult[] = config.targets.map((t) => ({
      target: t,
      diagnostics: [] as readonly Diagnostic[],
      success: true,
      outDir: `/pkg/dist/${t.name}`,
      rootDir: "/pkg/src",
      compileTimeMs: 100,
      deduped: false,
    }));

    const map = resolveExportsMap(config, results, "/pkg");
    const dot = map["."] as Record<string, unknown>;
    const keys = Object.keys(dot);
    expect(keys).toEqual(["browser", "import", "require"]);
  });

  it("handles multiple export subpaths", () => {
    const config: WarpConfig = {
      exports: {
        "./package.json": "./package.json",
        ".": "./src/index.ts",
        "./models": "./src/models/index.ts",
      },
      targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
    };

    const results: CompileResult[] = [
      {
        target: config.targets[0],
        diagnostics: [],
        success: true,
        outDir: "/pkg/dist/esm",
        rootDir: "/pkg/src",
        compileTimeMs: 100,
        deduped: false,
      },
    ];

    const map = resolveExportsMap(config, results, "/pkg");
    expect(map["./package.json"]).toBe("./package.json");
    expect((map["."] as Record<string, Record<string, string>>)["import"].default).toBe(
      "./dist/esm/index.js",
    );
    expect((map["./models"] as Record<string, Record<string, string>>)["import"].default).toBe(
      "./dist/esm/models/index.js",
    );
  });
  it("does not add ./package.json when not explicitly listed", () => {
    const config: WarpConfig = {
      exports: { ".": "./src/index.ts" },
      targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
    };

    const results: CompileResult[] = [
      {
        target: config.targets[0],
        diagnostics: [],
        success: true,
        outDir: "/pkg/dist/esm",
        rootDir: "/pkg/src",
        compileTimeMs: 100,
        deduped: false,
      },
    ];

    const map = resolveExportsMap(config, results, "/pkg");
    expect(map["./package.json"]).toBeUndefined();
  });

  it("does not override explicit ./package.json entry", () => {
    const config: WarpConfig = {
      exports: {
        "./package.json": "./custom-package.json",
        ".": "./src/index.ts",
      },
      targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
    };

    const results: CompileResult[] = [
      {
        target: config.targets[0],
        diagnostics: [],
        success: true,
        outDir: "/pkg/dist/esm",
        rootDir: "/pkg/src",
        compileTimeMs: 100,
        deduped: false,
      },
    ];

    const map = resolveExportsMap(config, results, "/pkg");
    expect(map["./package.json"]).toBe("./custom-package.json");
  });
});

describe("getExportsDiff", () => {
  it("reports no changes when exports match", async () => {
    const tmpDir = await createTmpDir();
    try {
      const exportsMap = {
        ".": { import: { types: "./dist/esm/index.d.ts", default: "./dist/esm/index.js" } },
      };
      const pkg = { name: "test", exports: exportsMap };
      await fs.writeFile(path.join(tmpDir, "package.json"), JSON.stringify(pkg));

      const diff = await getExportsDiff(exportsMap, tmpDir);
      expect(diff).toContain("no changes needed");
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });

  it("shows diff when exports differ", async () => {
    const tmpDir = await createTmpDir();
    try {
      const pkg = { name: "test", exports: { ".": "./old.js" } };
      await fs.writeFile(path.join(tmpDir, "package.json"), JSON.stringify(pkg));

      const newExports = { ".": { import: { default: "./dist/esm/index.js" } } };
      const diff = await getExportsDiff(newExports, tmpDir);
      expect(diff).toContain("-");
      expect(diff).toContain("+");
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });
});
