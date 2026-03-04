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
});
