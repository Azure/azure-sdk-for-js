// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { validatePlatformImports } from "../../src/resolveImports.ts";
import type { ImportsMap } from "../../src/resolveImports.ts";

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-platform-validation-"));
}

describe("validatePlatformImports", () => {
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

  it("returns empty array when no platform files exist", async () => {
    await fs.mkdir(path.join(tmpDir, "src"));
    await fs.writeFile(
      path.join(tmpDir, "src", "index.ts"),
      `export * from "./utils.js";`,
    );
    await fs.writeFile(
      path.join(tmpDir, "src", "utils.ts"),
      `export const foo = 1;`,
    );

    const violations = await validatePlatformImports(importsMap, tmpDir);
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

    const violations = await validatePlatformImports(importsMap, tmpDir);
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

    const violations = await validatePlatformImports(importsMap, tmpDir);
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

    const violations = await validatePlatformImports(importsMap, tmpDir);
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
    await fs.writeFile(
      path.join(tmpDir, "src", "constants.ts"),
      `export const VERSION = "1.0";`,
    );

    const violations = await validatePlatformImports(importsMap, tmpDir);
    expect(violations).toEqual([]);
  });

  it("handles subdirectory imports", async () => {
    await fs.mkdir(path.join(tmpDir, "src", "policies"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src", "index-browser.mts"),
      `export * from "./policies/auth.js";`,
    );
    await fs.writeFile(
      path.join(tmpDir, "src", "policies", "auth.ts"),
      `export const auth = {};`,
    );
    await fs.writeFile(
      path.join(tmpDir, "src", "policies", "auth-browser.mts"),
      `export const auth = { browser: true };`,
    );

    const violations = await validatePlatformImports(importsMap, tmpDir);
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

    const violations = await validatePlatformImports(importsMap, tmpDir);
    expect(violations).toHaveLength(1);
    expect(violations[0].targetPlatform).toBe("react-native");
    expect(violations[0].suggestedImport).toBe("#platform/hash");
  });
});
