// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import { build } from "../src/build.ts";

function createTmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "warp-dedup-"));
}

describe("target deduplication", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = createTmpDir();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function setupPackageWithDuplicateTargets(): void {
    fs.mkdirSync(path.join(tmpDir, "src"), { recursive: true });
    fs.writeFileSync(
      path.join(tmpDir, "src/index.ts"),
      'export const greeting: string = "hello";\n',
    );

    // ESM and workerd share identical tsconfig settings (except outDir)
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

    const workerdTsconfig = {
      compilerOptions: {
        outDir: "./dist/workerd",
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

    fs.writeFileSync(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));
    fs.writeFileSync(path.join(tmpDir, "tsconfig.workerd.json"), JSON.stringify(workerdTsconfig));
    fs.writeFileSync(path.join(tmpDir, "tsconfig.cjs.json"), JSON.stringify(cjsTsconfig));

    const warpConfig = {
      exports: {
        "./package.json": "./package.json",
        ".": "./src/index.ts",
      },
      targets: [
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        { name: "workerd", condition: "workerd", tsconfig: "./tsconfig.workerd.json" },
        { name: "commonjs", condition: "require", tsconfig: "./tsconfig.cjs.json" },
      ],
    };
    fs.writeFileSync(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));
    fs.writeFileSync(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-dedup", version: "1.0.0" }, null, 2)}\n`,
    );
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");
  }

  it("deduplicates targets with identical compiler options", { timeout: 15_000 }, async () => {
    setupPackageWithDuplicateTargets();

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // All three output dirs should exist
    expect(fs.existsSync(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "dist/workerd/index.js"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "dist/commonjs/index.js"))).toBe(true);

    // ESM and workerd should have identical output (dedup copies)
    const esmContent = fs.readFileSync(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    const workerdContent = fs.readFileSync(path.join(tmpDir, "dist/workerd/index.js"), "utf-8");
    expect(esmContent).toBe(workerdContent);

    // Exports map should have all three conditions
    const pkg = JSON.parse(fs.readFileSync(path.join(tmpDir, "package.json"), "utf-8"));
    expect(pkg.exports["."]["import"]).toBeDefined();
    expect(pkg.exports["."]["workerd"]).toBeDefined();
    expect(pkg.exports["."]["require"]).toBeDefined();
  });
});
