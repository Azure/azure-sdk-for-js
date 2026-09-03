// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { parseTargetTsConfig } from "../../src/compiler.ts";
import { WarpError } from "../../src/types.ts";
import type { WarpTarget } from "../../src/types.ts";

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-compiler-"));
}

describe("parseTargetTsConfig", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("parses a valid tsconfig with outDir and rootDir", async () => {
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
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const x = 1;");

    const target: WarpTarget = {
      name: "esm",
      condition: "import",
      tsconfig: "./tsconfig.esm.json",
    };

    const result = parseTargetTsConfig(target, tmpDir);
    expect(result.outDir).toContain("dist/esm");
    expect(result.rootDir).toContain("src");
    expect(result.parsedConfig.fileNames.length).toBeGreaterThan(0);
  });

  it("throws when outDir is missing", async () => {
    const tsconfig = {
      compilerOptions: {
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const x = 1;");

    const target: WarpTarget = {
      name: "esm",
      condition: "import",
      tsconfig: "./tsconfig.esm.json",
    };

    expect(() => parseTargetTsConfig(target, tmpDir)).toThrow('must specify "outDir"');
  });

  it("warns but does not throw when rootDir is missing", async () => {
    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        module: "NodeNext",
        moduleResolution: "NodeNext",
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const x = 1;");

    const target: WarpTarget = {
      name: "esm",
      condition: "import",
      tsconfig: "./tsconfig.esm.json",
    };

    // Should not throw
    const result = parseTargetTsConfig(target, tmpDir);
    expect(result.outDir).toContain("dist/esm");
  });

  it("throws WarpError when tsconfig matches zero source files", async () => {
    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
      },
      include: ["nonexistent/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));

    const target: WarpTarget = {
      name: "esm",
      condition: "import",
      tsconfig: "./tsconfig.esm.json",
    };

    // TypeScript detects "No inputs" and our code wraps it in a WarpError.
    // The safety-net check for zero fileNames provides defense-in-depth.
    expect(() => parseTargetTsConfig(target, tmpDir)).toThrow(WarpError);
    expect(() => parseTargetTsConfig(target, tmpDir)).toThrow("No inputs were found");
  });

  it("includes extends hint when tsconfig references missing base config", async () => {
    // A tsconfig that extends a non-existent base file
    const tsconfig = {
      extends: "./tsconfig.base.json",
      compilerOptions: {
        outDir: "./dist/esm",
        rootDir: "./src",
      },
      include: ["src/**/*.ts"],
    };
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    // Do NOT create tsconfig.base.json — this is the missing extends target

    const target: WarpTarget = {
      name: "esm",
      condition: "import",
      tsconfig: "./tsconfig.esm.json",
    };

    expect(() => parseTargetTsConfig(target, tmpDir)).toThrow(WarpError);
    expect(() => parseTargetTsConfig(target, tmpDir)).toThrow(/extends/i);
  });
});
