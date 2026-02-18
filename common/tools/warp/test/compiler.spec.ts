// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { parseTargetTsConfig } from "../src/compiler.ts";
import type { WarpTarget } from "../src/types.ts";

function createTmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "warp-compiler-"));
}

describe("parseTargetTsConfig", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = createTmpDir();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("parses a valid tsconfig with outDir and rootDir", () => {
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
    fs.writeFileSync(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    fs.mkdirSync(path.join(tmpDir, "src"), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "src/index.ts"), "export const x = 1;");

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

  it("throws when outDir is missing", () => {
    const tsconfig = {
      compilerOptions: {
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
      },
      include: ["src/**/*.ts"],
    };
    fs.writeFileSync(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    fs.mkdirSync(path.join(tmpDir, "src"), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "src/index.ts"), "export const x = 1;");

    const target: WarpTarget = {
      name: "esm",
      condition: "import",
      tsconfig: "./tsconfig.esm.json",
    };

    expect(() => parseTargetTsConfig(target, tmpDir)).toThrow('must specify "outDir"');
  });

  it("warns but does not throw when rootDir is missing", () => {
    const tsconfig = {
      compilerOptions: {
        outDir: "./dist/esm",
        module: "NodeNext",
        moduleResolution: "NodeNext",
      },
      include: ["src/**/*.ts"],
    };
    fs.writeFileSync(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));
    fs.mkdirSync(path.join(tmpDir, "src"), { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "src/index.ts"), "export const x = 1;");

    const target: WarpTarget = {
      name: "esm",
      condition: "import",
      tsconfig: "./tsconfig.esm.json",
    };

    // Should not throw
    const result = parseTargetTsConfig(target, tmpDir);
    expect(result.outDir).toContain("dist/esm");
  });
});
