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

// ---------------------------------------------------------------------------
// programIdentity — emit identity (controls output reuse)
// ---------------------------------------------------------------------------

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

  it("different module format → different identity", () => {
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

  it("different lib (type-check only) → same emit identity", () => {
    const files = ["/a.ts"];
    const opts1 = { module: 199, lib: ["lib.es2023.d.ts"] } as ts.CompilerOptions;
    const opts2 = { module: 199, lib: ["lib.es2023.d.ts", "lib.dom.d.ts"] } as ts.CompilerOptions;
    expect(programIdentity(opts1, files)).toBe(programIdentity(opts2, files));
  });

  it("different customConditions but same resolvedImports → same identity", () => {
    const files = ["/index.ts"];
    const resolved = ["#platform/*=./src/*-web.mts"];
    const browserOpts = { module: 199, customConditions: ["browser"] } as ts.CompilerOptions;
    const rnOpts = { module: 199, customConditions: ["react-native"] } as ts.CompilerOptions;
    expect(programIdentity(browserOpts, files, resolved)).toBe(
      programIdentity(rnOpts, files, resolved),
    );
  });

  it("different strict (type-check only) → same emit identity", () => {
    const files = ["/a.ts"];
    const opts1 = { module: 199, strict: true } as ts.CompilerOptions;
    const opts2 = { module: 199, strict: false } as ts.CompilerOptions;
    expect(programIdentity(opts1, files)).toBe(programIdentity(opts2, files));
  });

  it("different sourceMap → different identity", () => {
    const files = ["/a.ts"];
    const opts1 = { module: 199, sourceMap: true } as ts.CompilerOptions;
    const opts2 = { module: 199, sourceMap: false } as ts.CompilerOptions;
    expect(programIdentity(opts1, files)).not.toBe(programIdentity(opts2, files));
  });
});

// ---------------------------------------------------------------------------
// optionsSignature — type-check identity (controls type-check skipping)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Two-dimensional optimization: type-check identity × emit identity
// ---------------------------------------------------------------------------

describe("two-dimensional optimization", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it("same emit identity, different type-check identity → type-check + copy", async () => {
    // browser and react-native differ only in customConditions (affects
    // type-check identity via optionsSignature) but resolve to the same
    // program graph, giving the same emit identity (programIdentity).
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      'export const greeting: string = "hello";\n',
    );

    const browserTsconfig = {
      compilerOptions: {
        outDir: "./dist/browser",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
        customConditions: ["browser"],
      },
      include: ["src/**/index.ts"],
    };

    const rnTsconfig = {
      compilerOptions: {
        outDir: "./dist/react-native",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
        customConditions: ["react-native"],
      },
      include: ["src/**/index.ts"],
    };

    await fs.writeFile(path.join(tmpDir, "tsconfig.browser.json"), JSON.stringify(browserTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.rn.json"), JSON.stringify(rnTsconfig));

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "browser", condition: "browser", tsconfig: "./tsconfig.browser.json" },
          { name: "react-native", condition: "react-native", tsconfig: "./tsconfig.rn.json" },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-full-copy", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Both targets should produce correct output
    const browserJs = await fs.readFile(path.join(tmpDir, "dist/browser/index.js"), "utf-8");
    const rnJs = await fs.readFile(path.join(tmpDir, "dist/react-native/index.js"), "utf-8");
    expect(browserJs).toBe(rnJs);

    // Both should have declarations
    expect(await exists(path.join(tmpDir, "dist/browser/index.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/react-native/index.d.ts"))).toBe(true);
  });

  it("same emit identity, different type-check identity → type-checks both, copies output", async () => {
    // workerd (lib: WebWorker) and esm (lib: DOM) — same module, different lib
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), 'export const value: string = "ok";\n');

    const workerdTsconfig = {
      compilerOptions: {
        outDir: "./dist/workerd",
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

    const esmTsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
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

    await fs.writeFile(path.join(tmpDir, "tsconfig.workerd.json"), JSON.stringify(workerdTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "workerd", condition: "workerd", tsconfig: "./tsconfig.workerd.json" },
          { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-typecheck-both", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Both targets should produce identical output (same emit identity)
    const workerdJs = await fs.readFile(path.join(tmpDir, "dist/workerd/index.js"), "utf-8");
    const esmJs = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(workerdJs).toBe(esmJs);

    // Both should have declarations
    expect(await exists(path.join(tmpDir, "dist/workerd/index.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/esm/index.d.ts"))).toBe(true);
  });

  it("type error caught in secondary target with different lib", async () => {
    // primary uses lib: ["ES2023", "DOM"] which has 'document'
    // secondary uses lib: ["ES2023"] which does NOT have 'document'
    // The secondary should catch the type error even though output is reusable.
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      'export const el = document.createElement("div");\n',
    );

    const domTsconfig = {
      compilerOptions: {
        outDir: "./dist/dom",
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

    const noDomTsconfig = {
      compilerOptions: {
        outDir: "./dist/no-dom",
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

    await fs.writeFile(path.join(tmpDir, "tsconfig.dom.json"), JSON.stringify(domTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.no-dom.json"), JSON.stringify(noDomTsconfig));

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "dom", condition: "browser", tsconfig: "./tsconfig.dom.json" },
          { name: "no-dom", condition: "import", tsconfig: "./tsconfig.no-dom.json" },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-cross-lib-error", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );

    const result = await build({ cwd: tmpDir });
    // Should fail because no-dom target can't find 'document'
    expect(result.success).toBe(false);
  });

  it("different emit identity → separate compilation with correct output", async () => {
    // ESM and CJS have different module formats → different emit identity
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

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
          {
            name: "cjs",
            condition: "require",
            tsconfig: "./tsconfig.cjs.json",
            moduleType: "commonjs",
          },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-different-emit", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    const esmJs = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    const cjsJs = await fs.readFile(path.join(tmpDir, "dist/cjs/index.js"), "utf-8");

    // Different module formats
    expect(esmJs).toContain("export");
    expect(cjsJs).toMatch(/exports[.,]/);

    // Both should have declarations (identical content)
    const esmDts = await fs.readFile(path.join(tmpDir, "dist/esm/index.d.ts"), "utf-8");
    const cjsDts = await fs.readFile(path.join(tmpDir, "dist/cjs/index.d.ts"), "utf-8");
    expect(esmDts).toBe(cjsDts);
  });

  it("three targets: compile, typecheck+copy, typecheck+copy", async () => {
    // Target A: workerd (lib: WebWorker) → compile (first with this emit identity)
    // Target B: esm (lib: DOM) → type-check + copy output (same emit, different type-check)
    // Target C: esm-strict (strict, no lib) → type-check + copy (same emit, different type-check)
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), 'export const value: string = "ok";\n');

    const workerdTsconfig = {
      compilerOptions: {
        outDir: "./dist/workerd",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        lib: ["ES2023"],
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
        lib: ["ES2023", "DOM"],
      },
      include: ["src/**/*.ts"],
    };

    const esmStrictTsconfig = {
      compilerOptions: {
        outDir: "./dist/esm-strict",
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
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));
    await fs.writeFile(
      path.join(tmpDir, "tsconfig.esm-strict.json"),
      JSON.stringify(esmStrictTsconfig),
    );

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "workerd", tsconfig: "./tsconfig.workerd.json" },
          { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
          { name: "esm-strict", tsconfig: "./tsconfig.esm-strict.json" },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-three-targets", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // All three should produce identical output (same emit identity)
    const workerdJs = await fs.readFile(path.join(tmpDir, "dist/workerd/index.js"), "utf-8");
    const esmJs = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    const esmStrictJs = await fs.readFile(path.join(tmpDir, "dist/esm-strict/index.js"), "utf-8");
    expect(workerdJs).toBe(esmJs);
    expect(esmJs).toBe(esmStrictJs);

    // All three should have declarations
    expect(await exists(path.join(tmpDir, "dist/workerd/index.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/esm/index.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/esm-strict/index.d.ts"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Parallel compilation
// ---------------------------------------------------------------------------

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
      JSON.stringify(mkTsconfig("./dist/cjs", { module: "Node16", moduleResolution: "Node16" })),
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
          {
            name: "cjs",
            condition: "require",
            tsconfig: "./tsconfig.cjs.json",
            moduleType: "commonjs",
          },
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
