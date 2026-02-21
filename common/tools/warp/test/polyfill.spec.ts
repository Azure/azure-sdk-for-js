// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import { build } from "../src/build.ts";
import { discoverPolyfills } from "../src/compiler.ts";

function createTmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "warp-polyfill-"));
}

describe("discoverPolyfills", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = createTmpDir();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("finds .mts polyfill files for included source files", async () => {
    fs.mkdirSync(path.join(tmpDir, "src/creds"), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "src/creds/cli.ts"), "export class Cli {}");
    fs.writeFileSync(
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
    fs.mkdirSync(path.join(tmpDir, "src"), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "src/foo.ts"), "export const x = 1;");
    fs.writeFileSync(path.join(tmpDir, "src/foo-browser.mts"), "export const x = 2;");

    // foo.ts is not in fileNames — polyfill should not be discovered
    const map = await discoverPolyfills([], "-browser");
    expect(map.size).toBe(0);
  });

  it("ignores source files that have no polyfill on disk", async () => {
    fs.mkdirSync(path.join(tmpDir, "src"), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "src/bar.ts"), "export const y = 1;");

    const fileNames = [path.join(tmpDir, "src/bar.ts")];
    const map = await discoverPolyfills(fileNames, "-browser");
    expect(map.size).toBe(0);
  });

  it("prefers .mts over .ts polyfill", async () => {
    fs.mkdirSync(path.join(tmpDir, "src"), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "src/foo.ts"), "export const x = 1;");
    fs.writeFileSync(path.join(tmpDir, "src/foo-browser.mts"), "export const x = 2; // mts");
    fs.writeFileSync(path.join(tmpDir, "src/foo-browser.ts"), "export const x = 3; // ts");

    const fileNames = [path.join(tmpDir, "src/foo.ts")];
    const map = await discoverPolyfills(fileNames, "-browser");
    expect(map.size).toBe(1);
    expect(map.get(path.join(tmpDir, "src/foo.ts"))).toBe(path.join(tmpDir, "src/foo-browser.mts"));
  });
});

describe("polyfill substitution build", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = createTmpDir();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("substitutes polyfill content in browser target", { timeout: 15_000 }, async () => {
    // Source files
    fs.mkdirSync(path.join(tmpDir, "src"), { recursive: true });
    fs.writeFileSync(
      path.join(tmpDir, "src/index.ts"),
      ['import { greet } from "./greeter.js";', "export { greet };"].join("\n"),
    );
    fs.writeFileSync(
      path.join(tmpDir, "src/greeter.ts"),
      [
        'import * as os from "node:os";',
        "export function greet(): string { return os.hostname(); }",
      ].join("\n"),
    );
    fs.writeFileSync(
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

    fs.writeFileSync(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));
    fs.writeFileSync(path.join(tmpDir, "tsconfig.browser.json"), JSON.stringify(browserTsconfig));

    // Warp config
    fs.writeFileSync(
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
    fs.writeFileSync(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-polyfill", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // ESM target should have the Node.js implementation
    const esmGreeter = fs.readFileSync(path.join(tmpDir, "dist/esm/greeter.js"), "utf-8");
    expect(esmGreeter).toContain("os");

    // Browser target should have the polyfill
    const browserGreeter = fs.readFileSync(path.join(tmpDir, "dist/browser/greeter.js"), "utf-8");
    expect(browserGreeter).toContain('"browser"');
    expect(browserGreeter).not.toContain("os");

    // Browser target should NOT contain greeter-browser.mjs
    expect(fs.existsSync(path.join(tmpDir, "dist/browser/greeter-browser.mjs"))).toBe(false);

    // ESM shim should be written
    const esmShim = JSON.parse(
      fs.readFileSync(path.join(tmpDir, "dist/esm/package.json"), "utf-8"),
    );
    expect(esmShim.type).toBe("module");

    const browserShim = JSON.parse(
      fs.readFileSync(path.join(tmpDir, "dist/browser/package.json"), "utf-8"),
    );
    expect(browserShim.type).toBe("module");
  });

  it("does not dedup targets with different polyfillSuffix", { timeout: 15_000 }, async () => {
    fs.mkdirSync(path.join(tmpDir, "src"), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "src/index.ts"), 'export const x: string = "hello";\n');
    fs.writeFileSync(
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

    fs.writeFileSync(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    fs.writeFileSync(path.join(tmpDir, "tsconfig.browser.json"), JSON.stringify(tsconfigBrowser));

    fs.writeFileSync(
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

    fs.writeFileSync(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-nodedup", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // ESM should have the original content
    const esmIndex = fs.readFileSync(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    expect(esmIndex).toContain('"hello"');

    // Browser should have the polyfill content
    const browserIndex = fs.readFileSync(path.join(tmpDir, "dist/browser/index.js"), "utf-8");
    expect(browserIndex).toContain('"browser"');

    // They must NOT be identical (dedup should not have fired)
    expect(esmIndex).not.toBe(browserIndex);
  });
});
