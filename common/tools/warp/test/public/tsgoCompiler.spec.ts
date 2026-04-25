// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import { resolveTsgo, getTsgoVersion, compileTargetWithTsgo } from "../../src/tsgoCompiler.ts";
import { parseTargetTsConfig } from "../../src/compiler.ts";
import type { WarpTarget } from "../../src/types.ts";
import { build } from "../../src/index.ts";

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-tsgo-"));
}

async function exists(p: string): Promise<boolean> {
  return fs.access(p).then(
    () => true,
    () => false,
  );
}

describe("resolveTsgo", () => {
  it("resolves tsgo from @typescript/native-preview dependency", () => {
    const resolved = resolveTsgo();
    expect(resolved).toBeTruthy();
    expect(resolved).toContain("tsgo");
  });
});

describe("getTsgoVersion", () => {
  it("returns a version string from the installed package", async () => {
    const version = await getTsgoVersion();
    expect(version).toBeTruthy();
    expect(typeof version).toBe("string");
  });
});

describe("compileTargetWithTsgo", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("returns failure with diagnostics when tsgo reports type errors", async () => {
    // Create a fake tsgo that exits with error and outputs diagnostics
    const tsgoPath = path.join(tmpDir, "tsgo.js");
    await fs.writeFile(
      tsgoPath,
      `console.error("src/index.ts(1,1): error TS2322: Type 'string' is not assignable to type 'number'.");\nprocess.exit(1);`,
    );

    // Create minimal project
    await fs.mkdir(path.join(tmpDir, "project", "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "project", "src", "index.ts"), "export const x = 1;\n");
    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "project", "tsconfig.esm.json"), JSON.stringify(tsconfig));

    const target: WarpTarget = {
      name: "esm",
      condition: "import",
      tsconfig: "./tsconfig.esm.json",
    };
    const parsed = parseTargetTsConfig(target, path.join(tmpDir, "project"));

    const result = await compileTargetWithTsgo(tsgoPath, parsed, path.join(tmpDir, "project"));
    expect(result.success).toBe(false);
    expect(result.diagnosticText).toContain("TS2322");
    expect(result.compileTimeMs).toBeGreaterThanOrEqual(0);
  });

  it("returns success when tsgo exits cleanly", async () => {
    // Create a fake tsgo that succeeds
    const tsgoPath = path.join(tmpDir, "tsgo.js");
    await fs.writeFile(tsgoPath, `process.exit(0);`);

    await fs.mkdir(path.join(tmpDir, "project", "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "project", "src", "index.ts"), "export const x = 1;\n");
    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "project", "tsconfig.esm.json"), JSON.stringify(tsconfig));

    const target: WarpTarget = {
      name: "esm",
      condition: "import",
      tsconfig: "./tsconfig.esm.json",
    };
    const parsed = parseTargetTsConfig(target, path.join(tmpDir, "project"));

    const result = await compileTargetWithTsgo(tsgoPath, parsed, path.join(tmpDir, "project"));
    expect(result.success).toBe(true);
    expect(result.target.name).toBe("esm");
  });

  it("cleans up temp config for external tsconfigs", async () => {
    // Create a fake tsgo that succeeds
    const tsgoPath = path.join(tmpDir, "tsgo.js");
    await fs.writeFile(tsgoPath, `process.exit(0);`);

    // Shared tsconfigs in monorepos live outside the package root.
    // Warp's virtual-extends mechanism makes ${configDir} resolve to the package root.
    // In real usage, the external config uses ${configDir}-based paths so files resolve
    // correctly from the virtual config's location. For this test, we put source files
    // in the external dir's src/ (where the include pattern points).
    const externalDir = path.join(tmpDir, "external");
    const projectDir = path.join(tmpDir, "project");
    await fs.mkdir(path.join(externalDir, "src"), { recursive: true });
    await fs.mkdir(projectDir, { recursive: true });

    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
      },
      include: ["./src/**/*.ts"],
    };
    await fs.writeFile(path.join(externalDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    // Source files live under the external dir's src/ to match the include pattern
    await fs.writeFile(path.join(externalDir, "src", "index.ts"), "export const x = 1;\n");

    const relPath = path.relative(projectDir, path.join(externalDir, "tsconfig.esm.json"));
    const target: WarpTarget = {
      name: "esm",
      condition: "import",
      tsconfig: relPath,
    };

    const parsed = parseTargetTsConfig(target, projectDir);
    const result = await compileTargetWithTsgo(tsgoPath, parsed, projectDir);
    expect(result.success).toBe(true);

    // Verify temp config was cleaned up (pattern: __warp_tsgo_esm_*.json)
    const entries = await fs.readdir(projectDir);
    const tempConfigs = entries.filter((e) => e.startsWith("__warp_tsgo_"));
    expect(tempConfigs).toHaveLength(0);
  });
});

describe("build with --compiler tsgo (integration)", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  async function writeProject(opts?: { withPolyfill?: boolean }): Promise<void> {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src", "index.ts"),
      'export const greeting: string = "hello";\n',
    );

    if (opts?.withPolyfill) {
      await fs.writeFile(
        path.join(tmpDir, "src", "index-browser.mts"),
        'export const greeting: string = "hello-browser";\n',
      );
    }

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
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));

    const cjsTsconfig = {
      compilerOptions: {
        outDir: "./dist/commonjs",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.cjs.json"), JSON.stringify(cjsTsconfig));

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      JSON.stringify({ name: "test-pkg", version: "1.0.0" }),
    );
  }

  it("builds a simple ESM package with tsgo", async () => {
    await writeProject();
    const warpConfig = {
      exports: { ".": "./src/index.ts" },
      targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));

    const result = await build({ cwd: tmpDir, compiler: "tsgo" });
    expect(result.success).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/esm/index.d.ts"))).toBe(true);
  });

  it("compiles ESM with tsgo and derives CJS via esbuild", async () => {
    await writeProject();
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

    const result = await build({ cwd: tmpDir, compiler: "tsgo" });
    expect(result.success).toBe(true);
    expect(result.compileResults).toHaveLength(2);
    expect(result.compileResults![0].target.name).toBe("esm");
    expect(result.compileResults![1].target.name).toBe("commonjs");
    expect(result.compileResults![1].deduped).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/commonjs/index.js"))).toBe(true);
  });

  it("falls back to tsc for targets with polyfills", async () => {
    await writeProject({ withPolyfill: true });

    const browserTsconfig = {
      compilerOptions: {
        outDir: "./dist/browser",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
      },
      include: ["src/**/*.ts", "src/**/*.mts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.browser.json"), JSON.stringify(browserTsconfig));

    const warpConfig = {
      exports: { ".": "./src/index.ts" },
      targets: [
        {
          name: "browser",
          condition: "browser",
          tsconfig: "./tsconfig.browser.json",
          polyfillSuffix: "-browser",
        },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));

    const result = await build({ cwd: tmpDir, compiler: "tsgo" });
    expect(result.success).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/browser/index.js"))).toBe(true);
  });

  it("copies output for targets with identical emit identity", async () => {
    await writeProject();
    const workerdTsconfig = {
      compilerOptions: {
        outDir: "./dist/workerd",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.workerd.json"), JSON.stringify(workerdTsconfig));

    const warpConfig = {
      exports: { ".": "./src/index.ts" },
      targets: [
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        { name: "workerd", condition: "workerd", tsconfig: "./tsconfig.workerd.json" },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));

    const result = await build({ cwd: tmpDir, compiler: "tsgo" });
    expect(result.success).toBe(true);
    expect(result.compileResults).toHaveLength(2);
    expect(result.compileResults![0].deduped).toBeFalsy();
    expect(result.compileResults![1].deduped).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/workerd/index.js"))).toBe(true);
  });
});
