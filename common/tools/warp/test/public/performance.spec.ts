// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import { build, programIdentity, optionsSignature } from "../../src/index.ts";
import type ts from "typescript";

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

describe("programIdentity", () => {
  const defaultOpts = { module: 199 } as ts.CompilerOptions;

  it("same files, no imports → same identity", () => {
    const files = ["/a/b.ts", "/a/c.ts"];
    expect(programIdentity(defaultOpts, files)).toBe(programIdentity(defaultOpts, files));
  });

  it("different files → different identity", () => {
    expect(programIdentity(defaultOpts, ["/a.ts"])).not.toBe(
      programIdentity(defaultOpts, ["/b.ts"]),
    );
  });

  it("same files, same resolved imports → same identity", () => {
    const files = ["/index.ts"];
    const imports = ["#platform/*=./src/*-browser.mts"];
    expect(programIdentity(defaultOpts, files, imports)).toBe(
      programIdentity(defaultOpts, files, imports),
    );
  });

  it("same files, different resolved imports → different identity", () => {
    const files = ["/index.ts"];
    const browserImports = ["#platform/*=./src/*-browser.mts"];
    const nodeImports = ["#platform/*=./src/*.ts"];
    expect(programIdentity(defaultOpts, files, browserImports)).not.toBe(
      programIdentity(defaultOpts, files, nodeImports),
    );
  });

  it("different conditions mapping to same file → same identity", () => {
    // browser and react-native both resolve to *-web.mts
    const files = ["/index.ts"];
    const resolved = ["#platform/*=./src/*-web.mts"];
    expect(programIdentity(defaultOpts, files, resolved)).toBe(
      programIdentity(defaultOpts, files, resolved),
    );
  });

  it("different compiler options → different identity", () => {
    const files = ["/a.ts", "/b.ts"];
    const esmOpts = { module: 199 } as ts.CompilerOptions;
    const cjsOpts = { module: 1 } as ts.CompilerOptions;
    expect(programIdentity(esmOpts, files)).not.toBe(programIdentity(cjsOpts, files));
  });

  it("same options except outDir → same identity", () => {
    const files = ["/a.ts"];
    const opts1 = { module: 199, outDir: "/dist/browser" } as ts.CompilerOptions;
    const opts2 = { module: 199, outDir: "/dist/react-native" } as ts.CompilerOptions;
    expect(programIdentity(opts1, files)).toBe(programIdentity(opts2, files));
  });

  it("different lib (type-check only) → same identity", () => {
    const files = ["/a.ts"];
    const opts1 = { module: 199, lib: ["lib.es2023.d.ts"] } as ts.CompilerOptions;
    const opts2 = { module: 199, lib: ["lib.es2023.d.ts", "lib.dom.d.ts"] } as ts.CompilerOptions;
    expect(programIdentity(opts1, files)).toBe(programIdentity(opts2, files));
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

  it("skips type checking on secondary targets sharing same sources", async () => {
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
    expect(cjsJs).toMatch(/exports[.,]/);
  });

  it("keeps NodeNext secondary target output as ESM on transpile fast path", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const marker = 1;\n");

    const browserTsconfig = {
      compilerOptions: {
        outDir: "./dist/browser",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
        sourceMap: false,
      },
      include: ["src/**/*.ts"],
    };

    const esmTsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
        sourceMap: true,
      },
      include: ["src/**/*.ts"],
    };

    await fs.writeFile(path.join(tmpDir, "tsconfig.browser.json"), JSON.stringify(browserTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "browser", condition: "browser", tsconfig: "./tsconfig.browser.json" },
          { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-nodenext-fast-path", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    const browserJs = await fs.readFile(path.join(tmpDir, "dist/browser/index.js"), "utf-8");
    const esmJs = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");

    expect(browserJs).toContain("export const marker = 1");
    // esbuild splits "export const x = 1" into "const x = 1; export { x }"
    expect(esmJs).toMatch(/export\b/);
    expect(esmJs).toContain("marker");
    expect(esmJs).not.toContain("Object.defineProperty(exports");
    expect(esmJs).not.toContain("exports.");
  });

  it("keeps NodeNext secondary targets in the expected module format on transpile fast path", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), 'export const value: string = "ok";\n');

    const primaryTsconfig = {
      compilerOptions: {
        outDir: "./dist/primary",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };

    // Keep module=NodeNext but alter a non-semantic option so this target
    // is not dedup-copied and must use transpileFiles fast path.
    const esmFastTsconfig = {
      compilerOptions: {
        outDir: "./dist/esm-fast",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
        lib: ["ES2023"],
      },
      include: ["src/**/*.ts"],
    };

    // Also NodeNext, but explicitly tagged as commonjs via warp target metadata.
    const cjsFastTsconfig = {
      compilerOptions: {
        outDir: "./dist/cjs-fast",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
        lib: ["ES2023", "DOM"],
      },
      include: ["src/**/*.ts"],
    };

    await fs.writeFile(path.join(tmpDir, "tsconfig.primary.json"), JSON.stringify(primaryTsconfig));
    await fs.writeFile(
      path.join(tmpDir, "tsconfig.esm-fast.json"),
      JSON.stringify(esmFastTsconfig),
    );
    await fs.writeFile(
      path.join(tmpDir, "tsconfig.cjs-fast.json"),
      JSON.stringify(cjsFastTsconfig),
    );

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "primary", condition: "import", tsconfig: "./tsconfig.primary.json" },
          { name: "esm-fast", condition: "module", tsconfig: "./tsconfig.esm-fast.json" },
          {
            name: "cjs-fast",
            condition: "require",
            tsconfig: "./tsconfig.cjs-fast.json",
            moduleType: "commonjs",
          },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-nodenext-fast-path", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    const esmFastJs = await fs.readFile(path.join(tmpDir, "dist/esm-fast/index.js"), "utf-8");
    const cjsFastJs = await fs.readFile(path.join(tmpDir, "dist/cjs-fast/index.js"), "utf-8");

    expect(esmFastJs).toContain("export");
    expect(esmFastJs).not.toMatch(/exports[.,]/);
    expect(cjsFastJs).toMatch(/exports[.,]/);

    // Declarations are copied from the source group's primary output.
    expect(await exists(path.join(tmpDir, "dist/esm-fast/index.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/cjs-fast/index.d.ts"))).toBe(true);
  });
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

  it("produces identical output to sequential mode", async () => {
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

  it("handles multiple targets correctly in parallel", async () => {
    await writeProject(tmpDir);
    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);

    const esmContent = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    const browserContent = await fs.readFile(path.join(tmpDir, "dist/browser/index.js"), "utf-8");
    const cjsContent = await fs.readFile(path.join(tmpDir, "dist/cjs/index.js"), "utf-8");

    expect(esmContent).toContain('"hello"');
    expect(browserContent).toContain('"hello"');
    expect(cjsContent).toContain('"hello"');

    // All targets should have declarations
    expect(await exists(path.join(tmpDir, "dist/esm/index.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/browser/index.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/cjs/index.d.ts"))).toBe(true);
  });
});

describe("optionsSignature", () => {
  it("same options + same files → same signature", () => {
    const opts: ts.CompilerOptions = { module: 99, target: 99, strict: true };
    const files = ["/a/b.ts", "/a/c.ts"];
    expect(optionsSignature(opts, files)).toBe(optionsSignature(opts, files));
  });

  it("different options → different signature", () => {
    const files = ["/a/b.ts"];
    const optsA: ts.CompilerOptions = { module: 99, strict: true };
    const optsB: ts.CompilerOptions = { module: 99, strict: false };
    expect(optionsSignature(optsA, files)).not.toBe(optionsSignature(optsB, files));
  });

  it("different lib sets → different signature", () => {
    const files = ["/a/b.ts"];
    const optsA: ts.CompilerOptions = { module: 99, lib: ["lib.dom.d.ts"] };
    const optsB: ts.CompilerOptions = { module: 99, lib: ["lib.webworker.d.ts"] };
    expect(optionsSignature(optsA, files)).not.toBe(optionsSignature(optsB, files));
  });

  it("outDir is ignored in signature", () => {
    const files = ["/a/b.ts"];
    const optsA: ts.CompilerOptions = { module: 99, outDir: "/dist/esm" };
    const optsB: ts.CompilerOptions = { module: 99, outDir: "/dist/browser" };
    expect(optionsSignature(optsA, files)).toBe(optionsSignature(optsB, files));
  });
});
