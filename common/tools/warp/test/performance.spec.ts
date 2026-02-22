// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import { build } from "../src/build.ts";
import { sourceIdentity, resolveBuildInfoPath } from "../src/compiler.ts";

async function exists(p: string): Promise<boolean> {
  return fs.access(p).then(
    () => true,
    () => false,
  );
}

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-perf-"));
}

async function cleanup(dir: string): Promise<void> {
  await fs.rm(dir, { recursive: true, force: true });
}

describe("sourceIdentity", () => {
  it("same files + same polyfill → same identity", async () => {
    const files = ["/a/b.ts", "/a/c.ts"];
    expect(sourceIdentity(files, "-browser")).toBe(sourceIdentity(files, "-browser"));
  });

  it("same files + different polyfill → different identity", async () => {
    const files = ["/a/b.ts"];
    expect(sourceIdentity(files, "-browser")).not.toBe(sourceIdentity(files, "-workerd"));
  });

  it("same files + no polyfill → same identity", async () => {
    const files = ["/a/b.ts"];
    expect(sourceIdentity(files)).toBe(sourceIdentity(files));
  });

  it("different files → different identity", async () => {
    expect(sourceIdentity(["/a.ts"])).not.toBe(sourceIdentity(["/b.ts"]));
  });
});

describe("skip-typecheck optimization", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it(
    "skips type checking on secondary targets sharing same sources",
    { timeout: 15_000 },
    async () => {
      // ESM and CJS share same source files but different module format.
      // CJS should skip type checking (already done by ESM).
      await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
      await fs.writeFile(
        path.join(tmpDir, "src/index.ts"),
        'export const greeting: string = "hello";\n',
      );

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
          outDir: "./dist/cjs",
          rootDir: "./src",
          module: "CommonJS",
          moduleResolution: "Node10",
          target: "ES2023",
          declaration: true,
          strict: true,
        },
        include: ["src/**/*.ts"],
      };

      await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));
      await fs.writeFile(path.join(tmpDir, "tsconfig.cjs.json"), JSON.stringify(cjsTsconfig));

      await fs.writeFile(
        path.join(tmpDir, "warp.config.yml"),
        stringify({
          exports: { ".": "./src/index.ts" },
          targets: [
            { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
            { name: "cjs", condition: "require", tsconfig: "./tsconfig.cjs.json" },
          ],
        }),
      );

      await fs.writeFile(
        path.join(tmpDir, "package.json"),
        `${JSON.stringify({ name: "test-skip-typecheck", version: "1.0.0", type: "module" }, null, 2)}\n`,
      );

      const result = await build({ cwd: tmpDir });
      expect(result.success).toBe(true);

      // Both targets should produce correct output
      expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
      expect(await exists(path.join(tmpDir, "dist/cjs/index.js"))).toBe(true);

      // CJS should have .d.ts files (copied from ESM)
      expect(await exists(path.join(tmpDir, "dist/cjs/index.d.ts"))).toBe(true);

      // .d.ts files should be identical (copied)
      const esmDts = await fs.readFile(path.join(tmpDir, "dist/esm/index.d.ts"), "utf-8");
      const cjsDts = await fs.readFile(path.join(tmpDir, "dist/cjs/index.d.ts"), "utf-8");
      expect(esmDts).toBe(cjsDts);

      // JS content should differ (different module format)
      const esmJs = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
      const cjsJs = await fs.readFile(path.join(tmpDir, "dist/cjs/index.js"), "utf-8");
      expect(esmJs).not.toBe(cjsJs);

      // ESM should be module syntax, CJS should be CommonJS
      expect(esmJs).toContain("export");
      expect(cjsJs).toContain("exports.");
    },
  );
});

describe("incremental compilation", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it("produces .tsbuildinfo files", { timeout: 15_000 }, async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), 'export const x: string = "hello";\n');

    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-incremental", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );

    const result = await build({ cwd: tmpDir, incremental: true });
    expect(result.success).toBe(true);

    // .tsbuildinfo should exist in the cache directory, NOT in outDir
    expect(await exists(resolveBuildInfoPath("esm", tmpDir))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/esm/.tsbuildinfo"))).toBe(false);

    // Output should be correct
    expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/esm/index.d.ts"))).toBe(true);
  });

  it("warm build succeeds with existing .tsbuildinfo", { timeout: 15_000 }, async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), 'export const x: string = "hello";\n');

    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-incr-warm", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );

    // Cold build
    const cold = await build({ cwd: tmpDir, incremental: true });
    expect(cold.success).toBe(true);

    // Warm build (no-clean keeps both outDir and .tsbuildinfo)
    const warm = await build({ cwd: tmpDir, incremental: true, clean: false });
    expect(warm.success).toBe(true);

    // .tsbuildinfo should still exist after warm build
    expect(await exists(resolveBuildInfoPath("esm", tmpDir))).toBe(true);

    // Output should still be correct
    const content = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(content).toContain("hello");
  });
});

describe("polyfill + skip-typecheck interaction", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it(
    "polyfill target gets its own type check, non-polyfill CJS skips",
    { timeout: 15_000 },
    async () => {
      await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
      await fs.writeFile(
        path.join(tmpDir, "src/index.ts"),
        ['import { greet } from "./greeter.js";', "export { greet };"].join("\n"),
      );
      await fs.writeFile(
        path.join(tmpDir, "src/greeter.ts"),
        'export function greet(): string { return "node"; }',
      );
      await fs.writeFile(
        path.join(tmpDir, "src/greeter-browser.mts"),
        'export function greet(): string { return "browser"; }',
      );

      const baseTsconfig = {
        compilerOptions: {
          rootDir: "./src",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          target: "ES2023",
          declaration: true,
          strict: true,
        },
        include: ["src/**/*.ts"],
      };

      await fs.writeFile(
        path.join(tmpDir, "tsconfig.esm.json"),
        JSON.stringify({
          ...baseTsconfig,
          compilerOptions: { ...baseTsconfig.compilerOptions, outDir: "./dist/esm" },
        }),
      );
      await fs.writeFile(
        path.join(tmpDir, "tsconfig.browser.json"),
        JSON.stringify({
          ...baseTsconfig,
          compilerOptions: { ...baseTsconfig.compilerOptions, outDir: "./dist/browser" },
        }),
      );
      await fs.writeFile(
        path.join(tmpDir, "tsconfig.cjs.json"),
        JSON.stringify({
          ...baseTsconfig,
          compilerOptions: {
            ...baseTsconfig.compilerOptions,
            outDir: "./dist/cjs",
            module: "CommonJS",
            moduleResolution: "Node10",
          },
        }),
      );

      await fs.writeFile(
        path.join(tmpDir, "warp.config.yml"),
        stringify({
          exports: { ".": "./src/index.ts" },
          targets: [
            { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
            {
              name: "browser",
              condition: "browser",
              tsconfig: "./tsconfig.browser.json",
              polyfillSuffix: "-browser",
            },
            { name: "cjs", condition: "require", tsconfig: "./tsconfig.cjs.json" },
          ],
        }),
      );

      await fs.writeFile(
        path.join(tmpDir, "package.json"),
        `${JSON.stringify({ name: "test-poly-skip", version: "1.0.0", type: "module" }, null, 2)}\n`,
      );

      const result = await build({ cwd: tmpDir });
      expect(result.success).toBe(true);

      // ESM: node implementation
      const esmGreeter = await fs.readFile(path.join(tmpDir, "dist/esm/greeter.js"), "utf-8");
      expect(esmGreeter).toContain('"node"');

      // Browser: polyfill
      const browserGreeter = await fs.readFile(
        path.join(tmpDir, "dist/browser/greeter.js"),
        "utf-8",
      );
      expect(browserGreeter).toContain('"browser"');

      // CJS: node implementation (skipped type check, copied dts)
      const cjsGreeter = await fs.readFile(path.join(tmpDir, "dist/cjs/greeter.js"), "utf-8");
      expect(cjsGreeter).toContain('"node"');

      // All targets should have .d.ts
      expect(await exists(path.join(tmpDir, "dist/esm/greeter.d.ts"))).toBe(true);
      expect(await exists(path.join(tmpDir, "dist/browser/greeter.d.ts"))).toBe(true);
      expect(await exists(path.join(tmpDir, "dist/cjs/greeter.d.ts"))).toBe(true);
    },
  );
});

describe("parallel compilation", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  async function writeProject(dir: string): Promise<void> {
    await fs.mkdir(path.join(dir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(dir, "src/index.ts"),
      'export const greeting: string = "hello";\n',
    );
    await fs.writeFile(
      path.join(dir, "src/index-browser.mts"),
      'export const greeting: string = "browser-hello";\n',
    );

    const mkTsconfig = (outDir: string, extra: Record<string, unknown> = {}) => ({
      compilerOptions: {
        outDir,
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
        ...extra,
      },
      include: ["src/**/*.ts"],
    });

    await fs.writeFile(
      path.join(dir, "tsconfig.esm.json"),
      JSON.stringify(mkTsconfig("./dist/esm")),
    );
    await fs.writeFile(
      path.join(dir, "tsconfig.cjs.json"),
      JSON.stringify(mkTsconfig("./dist/cjs", { module: "CommonJS", moduleResolution: "Node10" })),
    );
    await fs.writeFile(
      path.join(dir, "tsconfig.browser.json"),
      JSON.stringify(mkTsconfig("./dist/browser")),
    );

    await fs.writeFile(
      path.join(dir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
          {
            name: "browser",
            condition: "browser",
            tsconfig: "./tsconfig.browser.json",
            polyfillSuffix: "-browser",
          },
          { name: "cjs", condition: "require", tsconfig: "./tsconfig.cjs.json" },
        ],
      }),
    );

    await fs.writeFile(
      path.join(dir, "package.json"),
      `${JSON.stringify({ name: "test-parallel", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
  }

  it("produces identical output to sequential mode", { timeout: 30_000 }, async () => {
    // Build sequentially
    await writeProject(tmpDir);
    const seqResult = await build({ cwd: tmpDir });
    expect(seqResult.success).toBe(true);

    const seqFiles = new Map<string, string>();
    for (const sub of ["esm", "cjs", "browser"]) {
      const dir = path.join(tmpDir, "dist", sub);
      for (const f of await fs.readdir(dir)) {
        seqFiles.set(`${sub}/${f}`, await fs.readFile(path.join(dir, f), "utf-8"));
      }
    }

    // Build in parallel
    const parResult = await build({ cwd: tmpDir, parallel: true });
    expect(parResult.success).toBe(true);

    // Compare outputs
    for (const [relPath, seqContent] of seqFiles) {
      const parContent = await fs.readFile(path.join(tmpDir, "dist", relPath), "utf-8");
      expect(parContent, `${relPath} differs`).toBe(seqContent);
    }
  });

  it("handles polyfills correctly in parallel", { timeout: 30_000 }, async () => {
    await writeProject(tmpDir);
    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);

    const esmContent = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    const browserContent = await fs.readFile(path.join(tmpDir, "dist/browser/index.js"), "utf-8");
    const cjsContent = await fs.readFile(path.join(tmpDir, "dist/cjs/index.js"), "utf-8");

    expect(esmContent).toContain('"hello"');
    expect(browserContent).toContain('"browser-hello"');
    expect(cjsContent).toContain('"hello"');

    // All targets should have declarations
    expect(await exists(path.join(tmpDir, "dist/esm/index.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/browser/index.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/cjs/index.d.ts"))).toBe(true);
  });
});
