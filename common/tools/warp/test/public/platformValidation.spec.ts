// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { validateNoDirectImports } from "../../src/resolveImports.ts";
import type { ImportsMap } from "../../src/resolveImports.ts";
import ts from "typescript";

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-platform-validation-"));
}

async function collectSourceFiles(srcDir: string): Promise<string[]> {
  const sourceFiles: string[] = [];
  if (!ts.sys.directoryExists(srcDir)) return sourceFiles;
  for (const entry of ts.sys.readDirectory(srcDir, [".ts", ".mts", ".cts"], [], [])) {
    sourceFiles.push(entry);
  }
  for (const subdir of ts.sys.getDirectories(srcDir)) {
    sourceFiles.push(...(await collectSourceFiles(path.join(srcDir, subdir))));
  }
  return sourceFiles;
}

describe("validateNoDirectImports with platform file validation", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  const importsMap: ImportsMap = {
    "#platform/*": {
      browser: "./src/*-browser.mts",
      "react-native": "./src/*-react-native.mts",
      default: "./src/*.ts",
    },
  };

  async function validate() {
    const srcDir = path.join(tmpDir, "src");
    const sourceFiles = await collectSourceFiles(srcDir);
    return validateNoDirectImports(sourceFiles, importsMap, tmpDir, true);
  }

  it("returns empty array when no platform files exist", async () => {
    await fs.mkdir(path.join(tmpDir, "src"));
    await fs.writeFile(path.join(tmpDir, "src", "index.ts"), `export * from "./utils.js";`);
    await fs.writeFile(path.join(tmpDir, "src", "utils.ts"), `export const foo = 1;`);

    const violations = await validate();
    expect(violations).toEqual([]);
  });

  it("returns empty array when platform files use #platform imports", async () => {
    await fs.mkdir(path.join(tmpDir, "src"));
    await fs.writeFile(
      path.join(tmpDir, "src", "index-browser.mts"),
      `export * from "#platform/utils";`,
    );
    await fs.writeFile(path.join(tmpDir, "src", "utils.ts"), `export const foo = 1;`);
    await fs.writeFile(path.join(tmpDir, "src", "utils-browser.mts"), `export const foo = 2;`);

    const violations = await validate();
    expect(violations).toEqual([]);
  });

  it("detects direct imports that should use #platform", async () => {
    await fs.mkdir(path.join(tmpDir, "src"));
    await fs.writeFile(
      path.join(tmpDir, "src", "index-browser.mts"),
      `export * from "./utils.js";`,
    );
    await fs.writeFile(path.join(tmpDir, "src", "utils.ts"), `export const foo = 1;`);
    await fs.writeFile(path.join(tmpDir, "src", "utils-browser.mts"), `export const foo = 2;`);

    const violations = await validate();
    expect(violations).toHaveLength(1);
    expect(violations[0]).toMatchObject({
      specifier: "./utils.js",
      suggestedImport: "#platform/utils",
      targetPlatform: "browser",
    });
    expect(violations[0].file).toContain("index-browser.mts");
    expect(violations[0].line).toBe(1);
  });

  it("detects multiple violations in same file", async () => {
    await fs.mkdir(path.join(tmpDir, "src"));
    await fs.writeFile(
      path.join(tmpDir, "src", "index-browser.mts"),
      `import { a } from "./moduleA.js";
import { b } from "./moduleB.js";
export { a, b };`,
    );
    await fs.writeFile(path.join(tmpDir, "src", "moduleA.ts"), `export const a = 1;`);
    await fs.writeFile(path.join(tmpDir, "src", "moduleA-browser.mts"), `export const a = 2;`);
    await fs.writeFile(path.join(tmpDir, "src", "moduleB.ts"), `export const b = 1;`);
    await fs.writeFile(path.join(tmpDir, "src", "moduleB-browser.mts"), `export const b = 2;`);

    const violations = await validate();
    expect(violations).toHaveLength(2);
    expect(violations[0].specifier).toBe("./moduleA.js");
    expect(violations[0].line).toBe(1);
    expect(violations[1].specifier).toBe("./moduleB.js");
    expect(violations[1].line).toBe(2);
  });

  it("ignores imports without platform variants", async () => {
    await fs.mkdir(path.join(tmpDir, "src"));
    await fs.writeFile(
      path.join(tmpDir, "src", "index-browser.mts"),
      `export * from "./constants.js";`,
    );
    await fs.writeFile(path.join(tmpDir, "src", "constants.ts"), `export const VERSION = "1.0";`);

    const violations = await validate();
    expect(violations).toEqual([]);
  });

  it("handles subdirectory imports", async () => {
    await fs.mkdir(path.join(tmpDir, "src", "policies"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src", "index-browser.mts"),
      `export * from "./policies/auth.js";`,
    );
    await fs.writeFile(path.join(tmpDir, "src", "policies", "auth.ts"), `export const auth = {};`);
    await fs.writeFile(
      path.join(tmpDir, "src", "policies", "auth-browser.mts"),
      `export const auth = { browser: true };`,
    );

    const violations = await validate();
    expect(violations).toHaveLength(1);
    expect(violations[0].specifier).toBe("./policies/auth.js");
    expect(violations[0].suggestedImport).toBe("#platform/policies/auth");
  });

  it("handles react-native platform files", async () => {
    await fs.mkdir(path.join(tmpDir, "src"));
    await fs.writeFile(
      path.join(tmpDir, "src", "crypto-react-native.mts"),
      `export * from "./hash.js";`,
    );
    await fs.writeFile(path.join(tmpDir, "src", "hash.ts"), `export const hash = () => {};`);
    await fs.writeFile(
      path.join(tmpDir, "src", "hash-react-native.mts"),
      `export const hash = () => {};`,
    );

    const violations = await validate();
    expect(violations).toHaveLength(1);
    expect(violations[0].targetPlatform).toBe("react-native");
    expect(violations[0].suggestedImport).toBe("#platform/hash");
  });

  it("handles exact-match platform files (non-wildcard)", async () => {
    await fs.mkdir(path.join(tmpDir, "src"));

    // Exact mapping (no wildcard)
    const exactImportsMap: ImportsMap = {
      "#platform/crypto": {
        browser: "./src/crypto-browser.mts",
        default: "./src/crypto.ts",
      },
      "#platform/hash": {
        browser: "./src/hash-browser.mts",
        default: "./src/hash.ts",
      },
    };

    // Browser file directly imports default variant (should use #platform/hash)
    await fs.writeFile(
      path.join(tmpDir, "src", "crypto-browser.mts"),
      `export * from "./hash.js";`,
    );
    await fs.writeFile(path.join(tmpDir, "src", "crypto.ts"), `export const c = 1;`);
    await fs.writeFile(path.join(tmpDir, "src", "hash.ts"), `export const hash = () => {};`);
    await fs.writeFile(
      path.join(tmpDir, "src", "hash-browser.mts"),
      `export const hash = () => {};`,
    );

    const srcDir = path.join(tmpDir, "src");
    const sourceFiles = await collectSourceFiles(srcDir);
    const violations = validateNoDirectImports(sourceFiles, exactImportsMap, tmpDir, true);

    expect(violations).toHaveLength(1);
    expect(violations[0].targetPlatform).toBe("browser");
    expect(violations[0].suggestedImport).toBe("#platform/hash");
    expect(violations[0].file).toContain("crypto-browser.mts");
  });

  it("uses require condition for .cts files", async () => {
    await fs.mkdir(path.join(tmpDir, "src"));

    const ctsImportsMap: ImportsMap = {
      "#platform/*": {
        require: "./src/*-cjs.cts",
        default: "./src/*.ts",
      },
    };

    // CJS file directly imports default variant
    await fs.writeFile(
      path.join(tmpDir, "src", "index-cjs.cts"),
      `export * from "./helper.js";`,
    );
    await fs.writeFile(path.join(tmpDir, "src", "helper.ts"), `export const h = 1;`);
    await fs.writeFile(path.join(tmpDir, "src", "helper-cjs.cts"), `export const h = 2;`);

    const srcDir = path.join(tmpDir, "src");
    const sourceFiles = await collectSourceFiles(srcDir);
    const violations = validateNoDirectImports(sourceFiles, ctsImportsMap, tmpDir, true);

    expect(violations).toHaveLength(1);
    expect(violations[0].targetPlatform).toBe("require");
    expect(violations[0].suggestedImport).toBe("#platform/helper");
  });
});
