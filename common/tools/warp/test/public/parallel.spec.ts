// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Public integration, stress, chaos, and fault injection tests for the warp
 * parallel mode.  These tests exercise the public `build()` API — no internal
 * WorkerPool access is used.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { build } from "../../src/index.ts";
import { stringify } from "yaml";
import { withTimeout } from "../helpers.ts";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

async function exists(p: string): Promise<boolean> {
  return fs.access(p).then(
    () => true,
    () => false,
  );
}

/** Create a tsconfig with sensible defaults and caller overrides. */
function makeTsconfig(outDir: string, extra: Record<string, unknown> = {}) {
  return {
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
  };
}

interface TargetDef {
  name: string;
  condition: string;
  tsconfigOverrides?: Record<string, unknown>;
  polyfillSuffix?: string;
  moduleType?: string;
}

/**
 * Scaffold a complete warp project in a temp directory.
 * Generates tsconfig files, warp.config.yml, package.json, and source files.
 */
async function setupProject(
  dir: string,
  opts: {
    sources: Record<string, string>;
    targets: TargetDef[];
    exports?: Record<string, string>;
    packageName?: string;
  },
): Promise<void> {
  await fs.mkdir(path.join(dir, "src"), { recursive: true });
  for (const [name, content] of Object.entries(opts.sources)) {
    const filePath = path.join(dir, "src", name);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content);
  }

  for (const target of opts.targets) {
    const tsconfig = makeTsconfig(`./dist/${target.name}`, target.tsconfigOverrides ?? {});
    await fs.writeFile(path.join(dir, `tsconfig.${target.name}.json`), JSON.stringify(tsconfig));
  }

  await fs.writeFile(
    path.join(dir, "warp.config.yml"),
    stringify({
      exports: opts.exports ?? { ".": "./src/index.ts" },
      targets: opts.targets.map((t) => ({
        name: t.name,
        condition: t.condition,
        tsconfig: `./tsconfig.${t.name}.json`,
        ...(t.polyfillSuffix ? { polyfillSuffix: t.polyfillSuffix } : {}),
        ...(t.moduleType ? { moduleType: t.moduleType } : {}),
      })),
    }),
  );

  await fs.writeFile(
    path.join(dir, "package.json"),
    `${JSON.stringify(
      { name: opts.packageName ?? "test-project", version: "1.0.0", type: "module" },
      null,
      2,
    )}\n`,
  );
  await fs.writeFile(path.join(dir, "pnpm-workspace.yaml"), "packages: []");
}

/** Recursively read all files under a directory and return a map of relative-path → content. */
async function readDistTree(dir: string): Promise<Map<string, string>> {
  const files = new Map<string, string>();
  async function walk(d: string, prefix: string): Promise<void> {
    for (const entry of await fs.readdir(d, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        await walk(path.join(d, entry.name), rel);
      } else {
        files.set(rel, await fs.readFile(path.join(d, entry.name), "utf-8"));
      }
    }
  }
  if (await exists(dir)) {
    await walk(dir, "");
  }
  return files;
}

async function createTmpDir(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), "warp-parallel-integ-"));
}

// ---------------------------------------------------------------------------
// Parallel compilation resilience
// ---------------------------------------------------------------------------

describe("parallel compilation resilience", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("reports type errors cleanly in parallel mode", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      'export const greeting: number = "not a number";\n',
    );

    const tsconfig = {
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
      `${JSON.stringify({ name: "test-error", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(false);
  });

  it("does not hang on multi-target compilation failure in parallel mode", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      'export const x: number = "wrong type";\n',
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
      `${JSON.stringify({ name: "test-no-hang", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await withTimeout(
      build({ cwd: tmpDir, parallel: true }),
      15000,
      "parallel build with type errors",
    );
    expect(result.success).toBe(false);
  });

  it("parallel mode produces same results as sequential for errors", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const bad: boolean = 42;\n");

    const tsconfig = {
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
      `${JSON.stringify({ name: "test-parity", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const seqResult = await build({ cwd: tmpDir });
    const parResult = await build({ cwd: tmpDir, parallel: true });

    expect(seqResult.success).toBe(parResult.success);
  });
});

// ---------------------------------------------------------------------------
// E2E integration / chaos / stress via the public build() API
// ---------------------------------------------------------------------------

describe("parallel E2E integration", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "warp-e2e-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  // -----------------------------------------------------------------------
  // Correctness: parallel vs sequential bit-for-bit parity
  // -----------------------------------------------------------------------

  it("5-target kitchen-sink: parallel output matches sequential output exactly", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": [
          'import { greet } from "./greeter.js";',
          "export { greet };",
          "export const VERSION = 1;",
        ].join("\n"),
        "greeter.ts": 'export function greet(): string { return "node"; }',
        "greeter-browser.mts": 'export function greet(): string { return "browser"; }',
      },
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
        { name: "browser", condition: "browser", polyfillSuffix: "-browser" },
        { name: "react-native", condition: "react-native" },
        { name: "workerd", condition: "workerd" },
      ],
    });

    const seqResult = await build({ cwd: tmpDir });
    expect(seqResult.success).toBe(true);
    const seqDist = await readDistTree(path.join(tmpDir, "dist"));
    const seqPkg = await fs.readFile(path.join(tmpDir, "package.json"), "utf-8");

    const parResult = await build({ cwd: tmpDir, parallel: true });
    expect(parResult.success).toBe(true);
    const parDist = await readDistTree(path.join(tmpDir, "dist"));
    const parPkg = await fs.readFile(path.join(tmpDir, "package.json"), "utf-8");

    expect([...parDist.keys()].sort()).toEqual([...seqDist.keys()].sort());
    for (const [relPath, seqContent] of seqDist) {
      expect(parDist.get(relPath), `${relPath} content mismatch`).toBe(seqContent);
    }
    expect(parPkg).toBe(seqPkg);
  });

  // -----------------------------------------------------------------------
  // Dedup interactions
  // -----------------------------------------------------------------------

  it("three identical targets dedup to one compilation + two copies", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": "export const x = 42;\n",
      },
      targets: [
        { name: "esm", condition: "import" },
        { name: "browser", condition: "browser" },
        { name: "workerd", condition: "workerd" },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);

    const esm = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    const browser = await fs.readFile(path.join(tmpDir, "dist/browser/index.js"), "utf-8");
    const workerd = await fs.readFile(path.join(tmpDir, "dist/workerd/index.js"), "utf-8");
    expect(browser).toBe(esm);
    expect(workerd).toBe(esm);

    const deduped = result.compileResults!.filter((r) => r.deduped);
    expect(deduped.length).toBe(2);
  });

  it("primary target failure propagates to dedup copies", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": 'export const bad: number = "oops";\n',
      },
      targets: [
        { name: "esm", condition: "import" },
        { name: "browser", condition: "browser" },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(false);
    for (const r of result.compileResults!) {
      expect(r.success).toBe(false);
    }
  });

  // -----------------------------------------------------------------------
  // Polyfill + parallel
  // -----------------------------------------------------------------------

  it("polyfill type error is reported cleanly in parallel mode", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": ['import { greet } from "./greeter.js";', "export { greet };"].join("\n"),
        "greeter.ts": 'export function greet(): string { return "node"; }',
        "greeter-browser.mts":
          "export function greet(): string { const x: string = 42; return x; }",
      },
      targets: [
        { name: "esm", condition: "import" },
        { name: "browser", condition: "browser", polyfillSuffix: "-browser" },
      ],
    });

    const result = await withTimeout(
      build({ cwd: tmpDir, parallel: true }),
      15000,
      "polyfill type error build",
    );
    const esmResult = result.compileResults!.find((r) => r.target.name === "esm");
    expect(esmResult?.success).toBe(true);
  });

  it("different polyfill suffixes across targets produce distinct outputs", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": ['import { platform } from "./platform.js";', "export { platform };"].join(
          "\n",
        ),
        "platform.ts": 'export function platform(): string { return "default"; }',
        "platform-browser.mts": 'export function platform(): string { return "browser"; }',
        "platform-workerd.mts": 'export function platform(): string { return "workerd"; }',
      },
      targets: [
        { name: "esm", condition: "import" },
        { name: "browser", condition: "browser", polyfillSuffix: "-browser" },
        { name: "workerd", condition: "workerd", polyfillSuffix: "-workerd" },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);

    const esmContent = await fs.readFile(path.join(tmpDir, "dist/esm/platform.js"), "utf-8");
    const browserContent = await fs.readFile(
      path.join(tmpDir, "dist/browser/platform.js"),
      "utf-8",
    );
    const workerdContent = await fs.readFile(
      path.join(tmpDir, "dist/workerd/platform.js"),
      "utf-8",
    );

    expect(esmContent).toContain('"default"');
    expect(browserContent).toContain('"browser"');
    expect(workerdContent).toContain('"workerd"');

    expect(esmContent).not.toBe(browserContent);
    expect(browserContent).not.toBe(workerdContent);
  });

  // -----------------------------------------------------------------------
  // Multiple subpath exports
  // -----------------------------------------------------------------------

  it("many subpath exports compile correctly in parallel", async () => {
    const sources: Record<string, string> = {
      "index.ts": 'export const root = "root";\n',
      "models/index.ts": 'export interface User { name: string; }\nexport const M = "m";\n',
      "utils/index.ts": "export function add(a: number, b: number): number { return a + b; }\n",
      "client/index.ts":
        'import { add } from "../utils/index.js";\nexport const sum = add(1, 2);\n',
    };

    await setupProject(tmpDir, {
      sources,
      exports: {
        ".": "./src/index.ts",
        "./models": "./src/models/index.ts",
        "./utils": "./src/utils/index.ts",
        "./client": "./src/client/index.ts",
        "./package.json": "./package.json",
      },
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);

    for (const sub of ["esm", "cjs"]) {
      expect(await exists(path.join(tmpDir, `dist/${sub}/index.js`))).toBe(true);
      expect(await exists(path.join(tmpDir, `dist/${sub}/models/index.js`))).toBe(true);
      expect(await exists(path.join(tmpDir, `dist/${sub}/utils/index.js`))).toBe(true);
      expect(await exists(path.join(tmpDir, `dist/${sub}/client/index.js`))).toBe(true);
    }

    const pkg = JSON.parse(await fs.readFile(path.join(tmpDir, "package.json"), "utf-8")) as {
      exports: Record<string, unknown>;
    };
    expect(pkg.exports["."]).toBeDefined();
    expect(pkg.exports["./models"]).toBeDefined();
    expect(pkg.exports["./utils"]).toBeDefined();
    expect(pkg.exports["./client"]).toBeDefined();
    expect(pkg.exports["./package.json"]).toBe("./package.json");
  });

  // -----------------------------------------------------------------------
  // CompileResults metadata
  // -----------------------------------------------------------------------

  it("compileResults are fully populated in parallel mode", async () => {
    await setupProject(tmpDir, {
      sources: { "index.ts": "export const x = 1;\n" },
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);
    expect(result.compileResults).toBeDefined();
    expect(result.compileResults!).toHaveLength(2);

    for (const cr of result.compileResults!) {
      expect(cr.target.name).toBeTruthy();
      expect(cr.outDir).toBeTruthy();
      expect(cr.rootDir).toBeTruthy();
      expect(cr.compileTimeMs).toBeGreaterThanOrEqual(0);
      expect(typeof cr.success).toBe("boolean");
      expect(typeof cr.deduped).toBe("boolean");
    }

    expect(result.totalTimeMs).toBeGreaterThan(0);
    expect(result.totalTimeMs).toBeLessThan(30_000);
  });

  // -----------------------------------------------------------------------
  // Filter + parallel
  // -----------------------------------------------------------------------

  it("--target works correctly with parallel mode", async () => {
    await setupProject(tmpDir, {
      sources: { "index.ts": "export const x = 1;\n" },
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
        { name: "browser", condition: "browser" },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true, target: ["esm", "cjs"] });
    expect(result.success).toBe(true);

    expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/cjs/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/browser"))).toBe(false);
  });

  // -----------------------------------------------------------------------
  // .d.ts copy optimization
  // -----------------------------------------------------------------------

  it("secondary target with same sources gets .d.ts files copied from primary", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": [
          "export interface User { name: string; age: number; }",
          "export function greet(u: User): string { return u.name; }",
        ].join("\n"),
      },
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);

    // Both targets should have .d.ts files
    const esmDts = await fs.readFile(path.join(tmpDir, "dist/esm/index.d.ts"), "utf-8");
    const cjsDts = await fs.readFile(path.join(tmpDir, "dist/cjs/index.d.ts"), "utf-8");
    expect(esmDts).toContain("User");
    expect(esmDts).toContain("greet");
    expect(cjsDts).toContain("User");
    expect(cjsDts).toContain("greet");

    // The CJS target should be deduped (different module format) or have
    // matching declarations if compiled independently
    const esmResult = result.compileResults!.find((r) => r.target.name === "esm");
    const cjsResult = result.compileResults!.find((r) => r.target.name === "cjs");
    expect(esmResult?.success).toBe(true);
    expect(cjsResult?.success).toBe(true);
  });

  // -----------------------------------------------------------------------
  // Boundary: single target, no dedup copies
  // -----------------------------------------------------------------------

  it("single target produces deduped=false with correct output", async () => {
    await setupProject(tmpDir, {
      sources: { "index.ts": "export const boundary = true;\n" },
      targets: [{ name: "esm", condition: "import" }],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);
    expect(result.compileResults).toHaveLength(1);

    const cr = result.compileResults![0];
    expect(cr.deduped).toBe(false);
    expect(cr.target.name).toBe("esm");
    expect(cr.success).toBe(true);

    const content = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(content).toContain("true");
    expect(await exists(path.join(tmpDir, "dist/esm/index.d.ts"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Stress tests (many files, many targets, rapid rebuilds)
// ---------------------------------------------------------------------------

describe("parallel stress tests", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "warp-stress-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("compiles 30 source files across 4 targets in parallel", async () => {
    const sources: Record<string, string> = {
      "index.ts": "",
    };

    const reExports: string[] = [];
    for (let i = 0; i < 30; i++) {
      sources[`mod${i}.ts`] = [
        `export function fn${i}(x: number): number { return x + ${i}; }`,
        `export const VALUE_${i} = ${i};`,
      ].join("\n");
      reExports.push(`export { fn${i}, VALUE_${i} } from "./mod${i}.js";`);
    }
    sources["index.ts"] = reExports.join("\n") + "\n";

    await setupProject(tmpDir, {
      sources,
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
        { name: "browser", condition: "browser" },
        { name: "workerd", condition: "workerd" },
      ],
    });

    const result = await withTimeout(
      build({ cwd: tmpDir, parallel: true }),
      30000,
      "30-file stress build",
    );
    expect(result.success).toBe(true);

    for (const target of ["esm", "cjs", "browser", "workerd"]) {
      for (let i = 0; i < 30; i++) {
        expect(
          await exists(path.join(tmpDir, `dist/${target}/mod${i}.js`)),
          `dist/${target}/mod${i}.js missing`,
        ).toBe(true);
      }
    }
  });

  it("6-target build with mixed dedup, polyfill, and module formats", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": ['import { impl } from "./impl.js";', "export { impl };"].join("\n"),
        "impl.ts": 'export function impl(): string { return "node"; }',
        "impl-browser.mts": 'export function impl(): string { return "browser"; }',
      },
      targets: [
        { name: "esm", condition: "import" },
        { name: "workerd", condition: "workerd" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
        { name: "browser", condition: "browser", polyfillSuffix: "-browser" },
        { name: "react-native", condition: "react-native" },
        {
          name: "deno",
          condition: "deno",
          tsconfigOverrides: { lib: ["ES2023"] },
        },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);

    const deduped = result.compileResults!.filter((r) => r.deduped);
    expect(deduped.length).toBeGreaterThanOrEqual(2);

    const browserImpl = await fs.readFile(path.join(tmpDir, "dist/browser/impl.js"), "utf-8");
    expect(browserImpl).toContain('"browser"');

    const cjsImpl = await fs.readFile(path.join(tmpDir, "dist/cjs/impl.js"), "utf-8");
    expect(cjsImpl).toMatch(/exports[.,]/);

    for (const name of ["esm", "workerd", "cjs", "browser", "react-native", "deno"]) {
      expect(
        await exists(path.join(tmpDir, `dist/${name}/index.js`)),
        `${name}/index.js missing`,
      ).toBe(true);
    }
  });

  it("back-to-back parallel builds are idempotent", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": "export const x = 1;\n",
        "helper.ts": "export function add(a: number, b: number): number { return a + b; }\n",
      },
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
      ],
    });

    const result1 = await build({ cwd: tmpDir, parallel: true });
    expect(result1.success).toBe(true);
    const dist1 = await readDistTree(path.join(tmpDir, "dist"));
    const pkg1 = await fs.readFile(path.join(tmpDir, "package.json"), "utf-8");

    const result2 = await build({ cwd: tmpDir, parallel: true });
    expect(result2.success).toBe(true);
    const dist2 = await readDistTree(path.join(tmpDir, "dist"));
    const pkg2 = await fs.readFile(path.join(tmpDir, "package.json"), "utf-8");

    expect([...dist2.keys()].sort()).toEqual([...dist1.keys()].sort());
    for (const [relPath, content1] of dist1) {
      expect(dist2.get(relPath), `${relPath} changed`).toBe(content1);
    }
    expect(pkg2).toBe(pkg1);
  });

  it("rebuild after source change picks up modifications", async () => {
    await setupProject(tmpDir, {
      sources: { "index.ts": 'export const msg = "v1";\n' },
      targets: [{ name: "esm", condition: "import" }],
    });

    const r1 = await build({ cwd: tmpDir, parallel: true });
    expect(r1.success).toBe(true);
    const v1 = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(v1).toContain('"v1"');

    await fs.writeFile(path.join(tmpDir, "src/index.ts"), 'export const msg = "v2";\n');

    const r2 = await build({ cwd: tmpDir, parallel: true });
    expect(r2.success).toBe(true);
    const v2 = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(v2).toContain('"v2"');
    expect(v2).not.toContain('"v1"');
  });

  it("single-target parallel mode works (pool of 1)", async () => {
    await setupProject(tmpDir, {
      sources: { "index.ts": "export const solo = true;\n" },
      targets: [{ name: "esm", condition: "import" }],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);
    const content = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(content).toContain("true");
  });
});

// ---------------------------------------------------------------------------
// Chaos tests (concurrency, partial failure, edge cases)
// ---------------------------------------------------------------------------

describe("parallel chaos tests", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "warp-chaos-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("concurrent parallel builds on different projects don't interfere", async () => {
    const dir1 = path.join(tmpDir, "proj-a");
    const dir2 = path.join(tmpDir, "proj-b");
    await fs.mkdir(dir1, { recursive: true });
    await fs.mkdir(dir2, { recursive: true });

    await setupProject(dir1, {
      sources: { "index.ts": 'export const project = "A";\n' },
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
      ],
      packageName: "proj-a",
    });

    await setupProject(dir2, {
      sources: { "index.ts": 'export const project = "B";\n' },
      targets: [
        { name: "esm", condition: "import" },
        { name: "browser", condition: "browser" },
      ],
      packageName: "proj-b",
    });

    const [resultA, resultB] = await Promise.all([
      build({ cwd: dir1, parallel: true }),
      build({ cwd: dir2, parallel: true }),
    ]);

    expect(resultA.success).toBe(true);
    expect(resultB.success).toBe(true);

    const aEsm = await fs.readFile(path.join(dir1, "dist/esm/index.js"), "utf-8");
    const bEsm = await fs.readFile(path.join(dir2, "dist/esm/index.js"), "utf-8");
    expect(aEsm).toContain('"A"');
    expect(aEsm).not.toContain('"B"');
    expect(bEsm).toContain('"B"');
    expect(bEsm).not.toContain('"A"');
  });

  it("one target has type errors while sibling targets succeed (mixed results)", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": ['import { greet } from "./greeter.js";', "export { greet };"].join("\n"),
        "greeter.ts": 'export function greet(): string { return "node"; }',
        "greeter-browser.mts":
          "export function greet(): string { const x: number = true; return String(x); }",
      },
      targets: [
        { name: "esm", condition: "import" },
        { name: "browser", condition: "browser", polyfillSuffix: "-browser" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(false);
    expect(result.compileResults).toBeDefined();

    const esmResult = result.compileResults!.find((r) => r.target.name === "esm");
    expect(esmResult?.success).toBe(true);
  });

  it("clean=false preserves previous output and rebuilds over it", async () => {
    await setupProject(tmpDir, {
      sources: { "index.ts": 'export const x = "original";\n' },
      targets: [{ name: "esm", condition: "import" }],
    });

    const r1 = await build({ cwd: tmpDir, parallel: true });
    expect(r1.success).toBe(true);

    await fs.writeFile(path.join(tmpDir, "dist/esm/canary.txt"), "still here");

    await fs.writeFile(path.join(tmpDir, "src/index.ts"), 'export const x = "updated";\n');
    const r2 = await build({ cwd: tmpDir, parallel: true, clean: false });
    expect(r2.success).toBe(true);

    expect(await exists(path.join(tmpDir, "dist/esm/canary.txt"))).toBe(true);
    const content = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(content).toContain('"updated"');
  });

  it("build recovers after a previous failure", async () => {
    await setupProject(tmpDir, {
      sources: { "index.ts": 'export const x: number = "bad";\n' },
      targets: [{ name: "esm", condition: "import" }],
    });
    const fail = await build({ cwd: tmpDir, parallel: true });
    expect(fail.success).toBe(false);

    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const x: number = 42;\n");
    const success = await build({ cwd: tmpDir, parallel: true });
    expect(success.success).toBe(true);
    const content = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(content).toContain("42");
  });

  it("rapid sequential parallel builds (pool churn)", async () => {
    await setupProject(tmpDir, {
      sources: { "index.ts": "export const x = 1;\n" },
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
      ],
    });

    for (let i = 0; i < 5; i++) {
      const result = await build({ cwd: tmpDir, parallel: true });
      expect(result.success, `build iteration ${i} failed`).toBe(true);
    }
  });

  it("empty-body source files don't trip up parallel mode", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": "export {};\n",
        "types.ts": "export type Foo = { bar: string };\n",
      },
      exports: {
        ".": "./src/index.ts",
      },
      targets: [
        { name: "esm", condition: "import" },
        { name: "browser", condition: "browser" },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);
  });

  it("deeply nested source tree compiles correctly in parallel", async () => {
    const sources: Record<string, string> = {};
    sources["index.ts"] = 'import { leaf } from "./a/b/c/leaf.js";\nexport { leaf };\n';
    sources["a/b/c/leaf.ts"] =
      'import { helper } from "../helper.js";\nexport function leaf() { return helper(); }\n';
    sources["a/b/helper.ts"] = "export function helper() { return 42; }\n";

    await setupProject(tmpDir, {
      sources,
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/esm/a/b/c/leaf.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/cjs/a/b/c/leaf.js"))).toBe(true);
  });

  it("generic type-heavy source compiles identically in parallel vs sequential", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": [
          "export type DeepReadonly<T> = {",
          "  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];",
          "};",
          "export type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;",
          "export interface Config<T extends Record<string, unknown>> {",
          "  get<K extends keyof T>(key: K): T[K];",
          "  set<K extends keyof T>(key: K, value: T[K]): void;",
          "}",
          "export function createConfig<T extends Record<string, unknown>>(",
          "  defaults: T,",
          "): Config<T> {",
          "  const store = { ...defaults };",
          "  return {",
          "    get: <K extends keyof T>(key: K) => store[key],",
          "    set: <K extends keyof T>(key: K, value: T[K]) => { store[key] = value; },",
          "  };",
          "}",
        ].join("\n"),
      },
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
      ],
    });

    const seqResult = await build({ cwd: tmpDir });
    expect(seqResult.success).toBe(true);
    const seqEsm = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    const seqDts = await fs.readFile(path.join(tmpDir, "dist/esm/index.d.ts"), "utf-8");

    const parResult = await build({ cwd: tmpDir, parallel: true });
    expect(parResult.success).toBe(true);
    const parEsm = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    const parDts = await fs.readFile(path.join(tmpDir, "dist/esm/index.d.ts"), "utf-8");

    expect(parEsm).toBe(seqEsm);
    expect(parDts).toBe(seqDts);
  });

  it("polyfill + dedup + CJS: the triple interaction", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": ['import { greet } from "./greeter.js";', "export { greet };"].join("\n"),
        "greeter.ts": 'export function greet(): string { return "default"; }',
        "greeter-browser.mts": 'export function greet(): string { return "browser"; }',
      },
      targets: [
        { name: "esm", condition: "import" },
        { name: "browser", condition: "browser", polyfillSuffix: "-browser" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
        { name: "workerd", condition: "workerd" },
      ],
    });

    const result = await build({ cwd: tmpDir, parallel: true });
    expect(result.success).toBe(true);

    const esmGreet = await fs.readFile(path.join(tmpDir, "dist/esm/greeter.js"), "utf-8");
    const browserGreet = await fs.readFile(path.join(tmpDir, "dist/browser/greeter.js"), "utf-8");
    const cjsGreet = await fs.readFile(path.join(tmpDir, "dist/cjs/greeter.js"), "utf-8");
    const workerdGreet = await fs.readFile(path.join(tmpDir, "dist/workerd/greeter.js"), "utf-8");

    expect(esmGreet).toContain('"default"');
    expect(browserGreet).toContain('"browser"');
    expect(cjsGreet).toContain('"default"');
    expect(workerdGreet).toBe(esmGreet);

    const workerdResult = result.compileResults!.find((r) => r.target.name === "workerd");
    expect(workerdResult?.deduped).toBe(true);

    expect(cjsGreet).toMatch(/exports[.,]/);

    for (const t of ["esm", "browser", "cjs", "workerd"]) {
      expect(
        await exists(path.join(tmpDir, `dist/${t}/greeter.d.ts`)),
        `${t}/greeter.d.ts missing`,
      ).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// Fault injection: filesystem errors in workers
// ---------------------------------------------------------------------------

const isRoot = process.getuid?.() === 0;

describe("fault injection: filesystem errors in workers", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "warp-fault-"));
  });

  afterEach(async () => {
    const distDir = path.join(tmpDir, "dist");
    if (await exists(distDir)) {
      await fs.chmod(distDir, 0o755).catch(() => {});
      try {
        const entries = await fs.readdir(distDir, { withFileTypes: true, recursive: true });
        for (const entry of entries) {
          const parentPath = entry.parentPath ?? (entry as { path: string }).path;
          const full = path.join(parentPath, entry.name);
          await fs.chmod(full, 0o755).catch(() => {});
        }
      } catch {
        // best-effort
      }
    }
    const srcDir = path.join(tmpDir, "src");
    if (await exists(srcDir)) {
      try {
        const entries = await fs.readdir(srcDir, { withFileTypes: true, recursive: true });
        for (const entry of entries) {
          const parentPath = entry.parentPath ?? (entry as { path: string }).path;
          const full = path.join(parentPath, entry.name);
          await fs.chmod(full, 0o644).catch(() => {});
        }
      } catch {
        // best-effort
      }
    }
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it.skipIf(isRoot)(
    "EACCES: read-only dist/ causes worker crash during emit, fails cleanly",
    async () => {
      await setupProject(tmpDir, {
        sources: { "index.ts": "export const x = 1;\n" },
        targets: [{ name: "esm", condition: "import" }],
      });

      await fs.mkdir(path.join(tmpDir, "dist"), { mode: 0o555 });

      let threw = false;
      let result: Awaited<ReturnType<typeof build>> | undefined;
      try {
        result = await withTimeout(
          build({ cwd: tmpDir, parallel: true, clean: false }),
          15000,
          "build with read-only dist/",
        );
      } catch {
        threw = true;
      }
      expect(threw || result?.success === false).toBe(true);
    },
  );

  it.skipIf(isRoot)(
    "EACCES: read-only target outDir causes worker crash, other targets still report",
    async () => {
      await setupProject(tmpDir, {
        sources: { "index.ts": "export const x = 1;\n" },
        targets: [
          { name: "esm", condition: "import" },
          {
            name: "cjs",
            condition: "require",
            tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
          },
        ],
      });

      await fs.mkdir(path.join(tmpDir, "dist"), { recursive: true });
      await fs.mkdir(path.join(tmpDir, "dist/cjs"));
      await fs.chmod(path.join(tmpDir, "dist/cjs"), 0o555);

      let threw = false;
      try {
        await withTimeout(
          build({ cwd: tmpDir, parallel: true, clean: false }),
          15000,
          "build with read-only target outDir",
        );
      } catch {
        threw = true;
      }
      expect(threw).toBe(true);
    },
  );

  it.skipIf(isRoot)(
    "EACCES: unreadable source file produces diagnostic, does not hang",
    async () => {
      await setupProject(tmpDir, {
        sources: {
          "index.ts": 'import { helper } from "./helper.js";\nexport { helper };\n',
          "helper.ts": "export function helper() { return 42; }\n",
        },
        targets: [{ name: "esm", condition: "import" }],
      });

      await fs.chmod(path.join(tmpDir, "src/helper.ts"), 0o000);

      let threw = false;
      let result: Awaited<ReturnType<typeof build>> | undefined;
      try {
        result = await withTimeout(
          build({ cwd: tmpDir, parallel: true }),
          15000,
          "build with unreadable source",
        );
      } catch {
        threw = true;
      }
      expect(threw || result?.success === false).toBe(true);
    },
  );

  it("broken symlink source file produces diagnostic, does not crash workers", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": 'import { broken } from "./broken.js";\nexport { broken };\n',
      },
      targets: [{ name: "esm", condition: "import" }],
    });

    await fs.symlink(
      path.join(tmpDir, "src/nonexistent-target.ts"),
      path.join(tmpDir, "src/broken.ts"),
    );

    let threw = false;
    let result: Awaited<ReturnType<typeof build>> | undefined;
    try {
      result = await withTimeout(
        build({ cwd: tmpDir, parallel: true }),
        15000,
        "build with broken symlink",
      );
    } catch {
      threw = true;
    }
    expect(threw || result?.success === false).toBe(true);
  });

  it("output path collision: dist/esm is a file, not a directory", async () => {
    await setupProject(tmpDir, {
      sources: { "index.ts": "export const x = 1;\n" },
      targets: [{ name: "esm", condition: "import" }],
    });

    await fs.mkdir(path.join(tmpDir, "dist"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "dist/esm"), "I am a file, not a directory");

    let threw = false;
    let result: Awaited<ReturnType<typeof build>> | undefined;
    try {
      result = await withTimeout(
        build({ cwd: tmpDir, parallel: true, clean: false }),
        15000,
        "build with path collision",
      );
    } catch {
      threw = true;
    }
    expect(threw || result?.success === false).toBe(true);
  });

  it("source file deleted after config parse (race condition)", async () => {
    await setupProject(tmpDir, {
      sources: {
        "index.ts": 'import { doStuff } from "./ephemeral.js";\nexport { doStuff };\n',
        "ephemeral.ts": "export function doStuff() { return 1; }\n",
      },
      targets: [
        { name: "esm", condition: "import" },
        {
          name: "cjs",
          condition: "require",
          tsconfigOverrides: { module: "CommonJS", moduleResolution: "Node10" },
        },
      ],
    });

    await fs.unlink(path.join(tmpDir, "src/ephemeral.ts"));

    let threw = false;
    let result: Awaited<ReturnType<typeof build>> | undefined;
    try {
      result = await withTimeout(
        build({ cwd: tmpDir, parallel: true }),
        15000,
        "build with deleted source file",
      );
    } catch {
      threw = true;
    }
    expect(threw || result?.success === false).toBe(true);
  });

  it.skipIf(isRoot)("EACCES: dedup copy fails when destination is read-only", async () => {
    await setupProject(tmpDir, {
      sources: { "index.ts": "export const x = 1;\n" },
      targets: [
        { name: "esm", condition: "import" },
        { name: "browser", condition: "browser" },
      ],
    });

    const r1 = await build({ cwd: tmpDir, parallel: true });
    expect(r1.success).toBe(true);

    const browserDir = path.join(tmpDir, "dist/browser");
    const entries = await fs.readdir(browserDir);
    for (const entry of entries) {
      await fs.chmod(path.join(browserDir, entry), 0o444);
    }
    await fs.chmod(browserDir, 0o555);

    let threw = false;
    let result: Awaited<ReturnType<typeof build>> | undefined;
    try {
      result = await withTimeout(
        build({ cwd: tmpDir, parallel: true, clean: false }),
        15000,
        "build with read-only dedup dest",
      );
    } catch {
      threw = true;
    }
    expect(threw || result?.success === false).toBe(true);
  });
});
