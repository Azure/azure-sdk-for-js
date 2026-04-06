// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import { build } from "../../src/index.ts";

interface SourceMap {
  version: number;
  sources: string[];
  sourcesContent?: string[];
  mappings: string;
}

async function readSourceMap(filePath: string): Promise<SourceMap> {
  return JSON.parse(await fs.readFile(filePath, "utf-8")) as SourceMap;
}

async function exists(p: string): Promise<boolean> {
  return fs.access(p).then(
    () => true,
    () => false,
  );
}

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-build-"));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asRecord(value: unknown, message: string): Record<string, unknown> {
  if (!isRecord(value)) throw new Error(message);
  return value;
}

async function readJsonObject(filePath: string): Promise<Record<string, unknown>> {
  const raw: unknown = JSON.parse(await fs.readFile(filePath, "utf-8"));
  return asRecord(raw, `Expected JSON object in ${filePath}`);
}

describe("build (integration)", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  async function setupPackage(): Promise<void> {
    // Create source
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      'export const greeting: string = "hello";\n',
    );

    // Create tsconfigs
    const esmTsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };

    const cjsTsconfig = {
      compilerOptions: {
        outDir: "./dist/commonjs",
        rootDir: "./src",
        module: "Node16",
        moduleResolution: "Node16",
        target: "ES2023",
        declaration: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };

    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.cjs.json"), JSON.stringify(cjsTsconfig));

    // Create warp config
    const warpConfig = {
      exports: {
        "./package.json": "./package.json",
        ".": "./src/index.ts",
      },
      targets: [
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        {
          name: "commonjs",
          condition: "require",
          tsconfig: "./tsconfig.cjs.json",
          moduleType: "commonjs",
        },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));

    // Create package.json
    const pkg = { name: "test-package", version: "1.0.0" };
    await fs.writeFile(path.join(tmpDir, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);

    // Create pnpm-workspace.yaml to stop traversal
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");
  }

  it("builds successfully and writes exports to package.json", async () => {
    await setupPackage();

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Check dist files exist
    expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/esm/index.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/commonjs/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/commonjs/index.d.ts"))).toBe(true);

    // Check package.json exports were rewritten
    const pkg = await readJsonObject(path.join(tmpDir, "package.json"));
    const pkgExports = asRecord(pkg["exports"], "Expected package.json exports object");
    expect(pkgExports["./package.json"]).toBe("./package.json");

    const rootExport = asRecord(pkgExports["."], "Expected '.' export object");
    const importExport = asRecord(rootExport["import"], "Expected 'import' export object");
    const requireExport = asRecord(rootExport["require"], "Expected 'require' export object");
    expect(importExport["default"]).toBe("./dist/esm/index.js");
    expect(importExport["types"]).toBe("./dist/esm/index.d.ts");
    expect(requireExport["default"]).toBe("./dist/commonjs/index.js");
    expect(requireExport["types"]).toBe("./dist/commonjs/index.d.ts");

    // Check commonjs shim was written
    const shimPath = path.join(tmpDir, "dist/commonjs/package.json");
    expect(await exists(shimPath)).toBe(true);
    const shim = await readJsonObject(shimPath);
    expect(shim["type"]).toBe("commonjs");
  });

  it("dry-run does not write any files", async () => {
    await setupPackage();

    const result = await build({ cwd: tmpDir, dryRun: true });
    expect(result.success).toBe(true);

    // Dist should not exist
    expect(await exists(path.join(tmpDir, "dist"))).toBe(false);

    // package.json exports should not have been modified
    const pkg = await readJsonObject(path.join(tmpDir, "package.json"));
    expect(pkg["exports"]).toBeUndefined();
  });

  it("does not write exports to package.json when using target", async () => {
    await setupPackage();

    const result = await build({ cwd: tmpDir, target: ["esm"] });
    expect(result.success).toBe(true);

    expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);

    const pkg = await readJsonObject(path.join(tmpDir, "package.json"));
    expect(pkg["exports"]).toBeUndefined();
  });

  it("sequential build fails fast on first target error", async () => {
    // Source with a type error
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      'export const greeting: number = "not a number";\n',
    );

    // 3 targets with different module formats — all will fail type-checking
    // due to the type error above. Each forms a distinct group because
    // groupBySignature includes module/moduleResolution in the signature.
    const esmTsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };
    const cjsTsconfig = {
      compilerOptions: {
        outDir: "./dist/commonjs",
        rootDir: "./src",
        module: "Node16",
        moduleResolution: "Node16",
        target: "ES2023",
        declaration: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };
    const browserTsconfig = {
      compilerOptions: {
        outDir: "./dist/browser",
        rootDir: "./src",
        module: "ESNext",
        moduleResolution: "Bundler",
        target: "ES2023",
        declaration: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };

    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.cjs.json"), JSON.stringify(cjsTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.browser.json"), JSON.stringify(browserTsconfig));

    const warpConfig = {
      exports: { ".": "./src/index.ts" },
      targets: [
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        {
          name: "commonjs",
          condition: "require",
          tsconfig: "./tsconfig.cjs.json",
          moduleType: "commonjs",
        },
        { name: "browser", condition: "browser", tsconfig: "./tsconfig.browser.json" },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));

    const pkg = { name: "test-failfast", version: "1.0.0" };
    await fs.writeFile(path.join(tmpDir, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(false);
    expect(result.compileResults).toBeDefined();

    // Fail-fast: only the first target group that type-checks should appear in
    // results. Each tsconfig has a distinct module/moduleResolution so they form
    // separate groups (not dedup copies). The sequential path breaks on the
    // first group failure, skipping the remaining groups.
    const failedTargets = result.compileResults!.filter((r) => !r.success);
    expect(failedTargets.length).toBe(1);
    // Total results should be fewer than the 3 declared targets
    expect(result.compileResults!.length).toBeLessThan(3);
  });

  it("ESM and CJS source maps point to TypeScript sources", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      "export function greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n",
    );
    await fs.writeFile(
      path.join(tmpDir, "src/utils.ts"),
      'export const VERSION: string = "1.0.0";\nexport function double(n: number): number {\n  return n * 2;\n}\n',
    );

    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        declarationMap: true,
        sourceMap: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    await fs.writeFile(
      path.join(tmpDir, "tsconfig.cjs.json"),
      JSON.stringify({
        ...tsconfig,
        compilerOptions: { ...tsconfig.compilerOptions, outDir: "./dist/commonjs" },
      }),
    );

    const warpConfig = {
      exports: { ".": "./src/index.ts", "./utils": "./src/utils.ts" },
      targets: [
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        {
          name: "commonjs",
          condition: "require",
          tsconfig: "./tsconfig.cjs.json",
          moduleType: "commonjs",
        },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      JSON.stringify({ name: "test-sourcemaps", version: "1.0.0" }),
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // --- ESM source maps ---
    for (const file of ["index", "utils"]) {
      const jsMap = await readSourceMap(path.join(tmpDir, `dist/esm/${file}.js.map`));
      expect(jsMap.sources).toBeDefined();
      expect(jsMap.sources.length).toBeGreaterThan(0);
      // ESM maps should reference the original .ts source
      expect(jsMap.sources.some((s) => s.endsWith(`${file}.ts`))).toBe(true);
      expect(jsMap.mappings.length).toBeGreaterThan(0);

      const dtsMap = await readSourceMap(path.join(tmpDir, `dist/esm/${file}.d.ts.map`));
      expect(dtsMap.sources.some((s) => s.endsWith(`${file}.ts`))).toBe(true);
    }

    // --- CJS source maps ---
    for (const file of ["index", "utils"]) {
      const cjsJsMap = await readSourceMap(path.join(tmpDir, `dist/commonjs/${file}.js.map`));
      expect(cjsJsMap.sources).toBeDefined();
      expect(cjsJsMap.sources.length).toBeGreaterThan(0);
      expect(cjsJsMap.mappings.length).toBeGreaterThan(0);

      // CJS .d.ts.map should reference the .ts source (copied from ESM)
      const cjsDtsMap = await readSourceMap(path.join(tmpDir, `dist/commonjs/${file}.d.ts.map`));
      expect(cjsDtsMap.sources.some((s) => s.endsWith(`${file}.ts`))).toBe(true);
    }

    // Verify CJS JS is actually CommonJS (esbuild transform output)
    const cjsIndex = await fs.readFile(path.join(tmpDir, "dist/commonjs/index.js"), "utf-8");
    expect(cjsIndex).toContain("module.exports");

    // Verify ESM and CJS source maps are distinct
    const esmMap = await readSourceMap(path.join(tmpDir, "dist/esm/index.js.map"));
    const cjsMap = await readSourceMap(path.join(tmpDir, "dist/commonjs/index.js.map"));
    // ESM maps reference .ts source
    expect(esmMap.sources.some((s) => s.endsWith(".ts"))).toBe(true);
    // CJS maps now also reference .ts source (esbuild processes TS directly)
    expect(cjsMap.sources.some((s) => s.endsWith(".ts"))).toBe(true);
  });

  it("CJS source maps from esbuild transform have valid mappings", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    // Multi-line source with various constructs to ensure non-trivial mappings
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      [
        'import { helper } from "./helper.js";',
        "export async function main(): Promise<string> {",
        "  const result = await helper();",
        "  return result.toUpperCase();",
        "}",
        "",
      ].join("\n"),
    );
    await fs.writeFile(
      path.join(tmpDir, "src/helper.ts"),
      ["export async function helper(): Promise<string> {", '  return "world";', "}", ""].join(
        "\n",
      ),
    );

    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        sourceMap: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    await fs.writeFile(
      path.join(tmpDir, "tsconfig.cjs.json"),
      JSON.stringify({
        ...tsconfig,
        compilerOptions: { ...tsconfig.compilerOptions, outDir: "./dist/commonjs" },
      }),
    );

    const warpConfig = {
      exports: { ".": "./src/index.ts" },
      targets: [
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        {
          name: "commonjs",
          condition: "require",
          tsconfig: "./tsconfig.cjs.json",
          moduleType: "commonjs",
        },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      JSON.stringify({ name: "test-cjs-maps", version: "1.0.0" }),
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Both files should have CJS source maps generated by esbuild
    for (const file of ["index", "helper"]) {
      const mapPath = path.join(tmpDir, `dist/commonjs/${file}.js.map`);
      expect(await exists(mapPath)).toBe(true);

      const map = await readSourceMap(mapPath);
      expect(map.version).toBe(3);
      expect(map.mappings).toBeDefined();
      expect(map.mappings.length).toBeGreaterThan(0);
      // esbuild builds CJS from .ts sources — maps point to .ts files
      expect(map.sources.some((s) => s.endsWith(`${file}.ts`))).toBe(true);
      // sourcesContent should be included by esbuild
      expect(map.sourcesContent).toBeDefined();
      expect(map.sourcesContent!.length).toBeGreaterThan(0);
    }

    // ESM source maps should exist and be distinct from CJS ones
    const esmMap = await readSourceMap(path.join(tmpDir, "dist/esm/index.js.map"));
    const cjsMap = await readSourceMap(path.join(tmpDir, "dist/commonjs/index.js.map"));
    expect(esmMap.mappings).not.toBe(cjsMap.mappings);
  });

  it("CJS source maps preserve subdirectory paths (no basename truncation)", async () => {
    // Regression test: buildCjsFromSources must preserve directory structure
    // in source map paths (previously used path.basename which lost the directory).
    await fs.mkdir(path.join(tmpDir, "src/internal"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      [
        'import { helper } from "./internal/helper.js";',
        "export function main(): string { return helper(); }",
        "",
      ].join("\n"),
    );
    await fs.writeFile(
      path.join(tmpDir, "src/internal/helper.ts"),
      ['export function helper(): string { return "ok"; }', ""].join("\n"),
    );

    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        declarationMap: true,
        sourceMap: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    await fs.writeFile(
      path.join(tmpDir, "tsconfig.cjs.json"),
      JSON.stringify({
        ...tsconfig,
        compilerOptions: { ...tsconfig.compilerOptions, outDir: "./dist/commonjs" },
      }),
    );

    const warpConfig = {
      exports: { ".": "./src/index.ts" },
      targets: [
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        {
          name: "commonjs",
          condition: "require",
          tsconfig: "./tsconfig.cjs.json",
          moduleType: "commonjs",
        },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      JSON.stringify({ name: "test-subdir-maps", version: "1.0.0" }),
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // The subdirectory file's CJS source map must reference the .ts file with its
    // full relative path, not just the basename.
    const helperMap = await readSourceMap(
      path.join(tmpDir, "dist/commonjs/internal/helper.js.map"),
    );
    expect(helperMap.sources.length).toBeGreaterThan(0);
    // Must contain the directory component — NOT just "helper.ts"
    expect(helperMap.sources.some((s) => s.endsWith("helper.ts"))).toBe(true);
    // The path must reach back to src/ (relative from dist/commonjs/internal/)
    expect(helperMap.sources.some((s) => s.includes("src/"))).toBe(true);

    // Root-level file should also point to .ts
    const indexMap = await readSourceMap(path.join(tmpDir, "dist/commonjs/index.js.map"));
    expect(indexMap.sources.some((s) => s.endsWith("index.ts"))).toBe(true);

    // Declarations should be copied for subdirectory files too
    expect(await exists(path.join(tmpDir, "dist/commonjs/internal/helper.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/commonjs/internal/helper.d.ts.map"))).toBe(true);
  });

  it("CJS output includes sourceMappingURL comment", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), 'export const value = "hello";\n');

    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        sourceMap: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    await fs.writeFile(
      path.join(tmpDir, "tsconfig.cjs.json"),
      JSON.stringify({
        ...tsconfig,
        compilerOptions: { ...tsconfig.compilerOptions, outDir: "./dist/commonjs" },
      }),
    );

    const warpConfig = {
      exports: { ".": "./src/index.ts" },
      targets: [
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        {
          name: "commonjs",
          condition: "require",
          tsconfig: "./tsconfig.cjs.json",
          moduleType: "commonjs",
        },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      JSON.stringify({ name: "test-sourcemapping-url", version: "1.0.0" }),
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    const cjsJs = await fs.readFile(path.join(tmpDir, "dist/commonjs/index.js"), "utf-8");
    expect(cjsJs).toContain("//# sourceMappingURL=index.js.map");
  });
});
