// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import { build, discoverPolyfills } from "../../src/index.ts";

async function exists(p: string): Promise<boolean> {
  return fs.access(p).then(
    () => true,
    () => false,
  );
}

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-polyfill-"));
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

describe("discoverPolyfills", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("finds .mts polyfill files for included source files", async () => {
    await fs.mkdir(path.join(tmpDir, "src/creds"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/creds/cli.ts"), "export class Cli {}");
    await fs.writeFile(
      path.join(tmpDir, "src/creds/cli-browser.mts"),
      'export class Cli { constructor() { throw new Error("unsupported"); } }',
    );

    const fileNames = [path.join(tmpDir, "src/creds/cli.ts")];
    const map = await discoverPolyfills(fileNames, "-browser");
    expect(map.size).toBe(1);

    const originalPath = path.join(tmpDir, "src/creds/cli.ts");
    const polyfillPath = path.join(tmpDir, "src/creds/cli-browser.mts");
    expect(map.get(originalPath)).toBe(polyfillPath);
  });

  it("ignores files not in fileNames even if polyfill exists", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/foo.ts"), "export const x = 1;");
    await fs.writeFile(path.join(tmpDir, "src/foo-browser.mts"), "export const x = 2;");

    // foo.ts is not in fileNames — polyfill should not be discovered
    const map = await discoverPolyfills([], "-browser");
    expect(map.size).toBe(0);
  });

  it("ignores source files that have no polyfill on disk", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/bar.ts"), "export const y = 1;");

    const fileNames = [path.join(tmpDir, "src/bar.ts")];
    const map = await discoverPolyfills(fileNames, "-browser");
    expect(map.size).toBe(0);
  });

  it("prefers .mts over .ts polyfill", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/foo.ts"), "export const x = 1;");
    await fs.writeFile(path.join(tmpDir, "src/foo-browser.mts"), "export const x = 2; // mts");
    await fs.writeFile(path.join(tmpDir, "src/foo-browser.ts"), "export const x = 3; // ts");

    const fileNames = [path.join(tmpDir, "src/foo.ts")];
    const map = await discoverPolyfills(fileNames, "-browser");
    expect(map.size).toBe(1);
    expect(map.get(path.join(tmpDir, "src/foo.ts"))).toBe(path.join(tmpDir, "src/foo-browser.mts"));
  });

  it("discovers .cts polyfill files", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/state.ts"), "export const state = { x: undefined };");
    await fs.writeFile(
      path.join(tmpDir, "src/state-cjs.cts"),
      "export const state = { x: undefined };",
    );

    const fileNames = [path.join(tmpDir, "src/state.ts")];
    const map = await discoverPolyfills(fileNames, "-cjs");
    expect(map.size).toBe(1);
    expect(map.get(path.join(tmpDir, "src/state.ts"))).toBe(path.join(tmpDir, "src/state-cjs.cts"));
  });

  it("prefers .mts over .cts over .ts polyfill", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/foo.ts"), "export const x = 1;");
    await fs.writeFile(path.join(tmpDir, "src/foo-cjs.mts"), "export const x = 2; // mts");
    await fs.writeFile(path.join(tmpDir, "src/foo-cjs.cts"), "export const x = 3; // cts");
    await fs.writeFile(path.join(tmpDir, "src/foo-cjs.ts"), "export const x = 4; // ts");

    const fileNames = [path.join(tmpDir, "src/foo.ts")];
    const map = await discoverPolyfills(fileNames, "-cjs");
    expect(map.size).toBe(1);
    expect(map.get(path.join(tmpDir, "src/foo.ts"))).toBe(path.join(tmpDir, "src/foo-cjs.mts"));
  });

  it("prefers .cts over .ts polyfill when no .mts exists", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/foo.ts"), "export const x = 1;");
    await fs.writeFile(path.join(tmpDir, "src/foo-cjs.cts"), "export const x = 3; // cts");
    await fs.writeFile(path.join(tmpDir, "src/foo-cjs.ts"), "export const x = 4; // ts");

    const fileNames = [path.join(tmpDir, "src/foo.ts")];
    const map = await discoverPolyfills(fileNames, "-cjs");
    expect(map.size).toBe(1);
    expect(map.get(path.join(tmpDir, "src/foo.ts"))).toBe(path.join(tmpDir, "src/foo-cjs.cts"));
  });
});

describe("polyfill substitution build", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("substitutes polyfill content in browser target", async () => {
    // Source files
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      ['import { greet } from "./greeter.js";', "export { greet };"].join("\n"),
    );
    await fs.writeFile(
      path.join(tmpDir, "src/greeter.ts"),
      [
        'import * as os from "node:os";',
        "export function greet(): string { return os.hostname(); }",
      ].join("\n"),
    );
    await fs.writeFile(
      path.join(tmpDir, "src/greeter-browser.mts"),
      'export function greet(): string { return "browser"; }',
    );

    // tsconfigs
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
      include: ["src/**/*.ts"],
    };

    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.browser.json"), JSON.stringify(browserTsconfig));

    // Warp config
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
        ],
      }),
    );

    // package.json + workspace marker
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-polyfill", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // ESM target should have the Node.js implementation
    const esmGreeter = await fs.readFile(path.join(tmpDir, "dist/esm/greeter.js"), "utf-8");
    expect(esmGreeter).toContain("os");

    // Browser target should have the polyfill
    const browserGreeter = await fs.readFile(path.join(tmpDir, "dist/browser/greeter.js"), "utf-8");
    expect(browserGreeter).toContain('"browser"');
    expect(browserGreeter).not.toContain("os");

    // Browser target should NOT contain greeter-browser.mjs
    expect(await exists(path.join(tmpDir, "dist/browser/greeter-browser.mjs"))).toBe(false);

    // ESM shim should be written
    const esmShim = await readJsonObject(path.join(tmpDir, "dist/esm/package.json"));
    expect(esmShim["type"]).toBe("module");

    const browserShim = await readJsonObject(path.join(tmpDir, "dist/browser/package.json"));
    expect(browserShim["type"]).toBe("module");
  });

  it("skips polyfilling when polyfillSuffix is false", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      ['import { greet } from "./greeter.js";', "export { greet };"].join("\n"),
    );
    await fs.writeFile(
      path.join(tmpDir, "src/greeter.ts"),
      [
        'import * as os from "node:os";',
        "export function greet(): string { return os.hostname(); }",
      ].join("\n"),
    );
    // Polyfill file exists on disk but should be ignored
    await fs.writeFile(
      path.join(tmpDir, "src/greeter-browser.mts"),
      'export function greet(): string { return "browser"; }',
    );

    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/browser",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.browser.json"), JSON.stringify(tsconfig));

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          {
            name: "browser",
            condition: "browser",
            tsconfig: "./tsconfig.browser.json",
            polyfillSuffix: false,
          },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-no-polyfill", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Output should contain the original Node.js implementation, NOT the polyfill
    const greeter = await fs.readFile(path.join(tmpDir, "dist/browser/greeter.js"), "utf-8");
    expect(greeter).toContain("os");
    expect(greeter).not.toContain('"browser"');
  });

  it("does not dedup targets with different polyfillSuffix", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), 'export const x: string = "hello";\n');
    await fs.writeFile(
      path.join(tmpDir, "src/index-browser.mts"),
      'export const x: string = "browser";\n',
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
    const tsconfigBrowser = {
      ...tsconfig,
      compilerOptions: { ...tsconfig.compilerOptions, outDir: "./dist/browser" },
    };

    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.browser.json"), JSON.stringify(tsconfigBrowser));

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
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-nodedup", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // ESM should have the original content
    const esmIndex = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(esmIndex).toContain('"hello"');

    // Browser should have the polyfill content
    const browserIndex = await fs.readFile(path.join(tmpDir, "dist/browser/index.js"), "utf-8");
    expect(browserIndex).toContain('"browser"');

    // They must NOT be identical (dedup should not have fired)
    expect(esmIndex).not.toBe(browserIndex);
  });

  it("substitutes .cts polyfill content in CJS target with full type-checking", async () => {
    // Source files — state.ts defines a typed state object, state-cjs.cts provides
    // a type-safe CJS version. This mirrors the tshy module-local-state pattern
    // used in core-tracing and core-client.
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      ['import { state } from "./state.js";', "export { state };"].join("\n"),
    );
    // Types in a separate file (like interfaces.ts in core-tracing)
    await fs.writeFile(
      path.join(tmpDir, "src/types.ts"),
      "export interface Widget { name: string; }",
    );
    await fs.writeFile(
      path.join(tmpDir, "src/state.ts"),
      [
        'import type { Widget } from "./types.js";',
        "export const state = {",
        "  current: undefined as Widget | undefined,",
        "};",
      ].join("\n"),
    );
    // CJS polyfill — has proper TypeScript types for type-checking
    await fs.writeFile(
      path.join(tmpDir, "src/state-cjs.cts"),
      [
        'import type { Widget } from "./types.js";',
        "export const state = {",
        "  current: undefined as Widget | undefined,",
        "};",
      ].join("\n"),
    );

    // tsconfigs
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

    // Warp config — ESM compiled normally, CJS uses -cjs polyfill
    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
          {
            name: "commonjs",
            condition: "require",
            tsconfig: "./tsconfig.cjs.json",
            polyfillSuffix: "-cjs",
          },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-cts-polyfill", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // ESM state.js should have the compiled version
    const esmState = await fs.readFile(path.join(tmpDir, "dist/esm/state.js"), "utf-8");
    expect(esmState).toContain("undefined");

    // CJS state.js should have the polyfill content (from state-cjs.cts)
    const cjsState = await fs.readFile(path.join(tmpDir, "dist/commonjs/state.js"), "utf-8");
    expect(cjsState).toMatch(/undefined|void 0/);
    // CJS should use tsc's CommonJS exports pattern (Node ESM-interop compatible)
    expect(cjsState).toContain("exports");

    // CJS target should NOT produce state-cjs.cjs (polyfill is filtered)
    expect(await exists(path.join(tmpDir, "dist/commonjs/state-cjs.cjs"))).toBe(false);

    // CJS .d.ts should have full type info (type-checked from polyfill content)
    const cjsDts = await fs.readFile(path.join(tmpDir, "dist/commonjs/state.d.ts"), "utf-8");
    expect(cjsDts).toContain("Widget");
    expect(cjsDts).toContain("undefined");
  });

  it("catches type errors in .cts polyfill files", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    // Types in a separate file
    await fs.writeFile(
      path.join(tmpDir, "src/types.ts"),
      "export interface Widget { name: string; }",
    );
    await fs.writeFile(
      path.join(tmpDir, "src/state.ts"),
      [
        'import type { Widget } from "./types.js";',
        "export const state = {",
        "  current: undefined as Widget | undefined,",
        "};",
      ].join("\n"),
    );
    // A consumer that assigns to state.current — requires Widget | undefined type
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      [
        'import type { Widget } from "./types.js";',
        'import { state } from "./state.js";',
        "export function setWidget(w: Widget): void { state.current = w; }",
        "export { state };",
      ].join("\n"),
    );
    // CJS polyfill with WRONG type — narrower than what setWidget expects
    await fs.writeFile(
      path.join(tmpDir, "src/state-cjs.cts"),
      ["export const state = {", "  current: undefined,", "};"].join("\n"),
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
        outDir: "./dist/commonjs",
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
          {
            name: "commonjs",
            condition: "require",
            tsconfig: "./tsconfig.cjs.json",
            polyfillSuffix: "-cjs",
          },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-type-error", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    // Build should fail because the CJS polyfill has narrow type for state.current
    // (just `undefined`) but index.ts assigns a Widget to it
    expect(result.success).toBe(false);
  });
});
