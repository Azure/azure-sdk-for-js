// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import { build } from "../../src/index.ts";

async function exists(p: string): Promise<boolean> {
  return fs.access(p).then(
    () => true,
    () => false,
  );
}

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-dedup-"));
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

describe("target deduplication", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  async function setupPackageWithDuplicateTargets(): Promise<void> {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
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

    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.workerd.json"), JSON.stringify(workerdTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.cjs.json"), JSON.stringify(cjsTsconfig));

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
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-dedup", version: "1.0.0" }, null, 2)}\n`,
    );
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");
  }

  it("deduplicates targets with identical compiler options", async () => {
    await setupPackageWithDuplicateTargets();

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // All three output dirs should exist
    expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/workerd/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/commonjs/index.js"))).toBe(true);

    // ESM and workerd should have identical output (dedup copies)
    const esmContent = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    const workerdContent = await fs.readFile(path.join(tmpDir, "dist/workerd/index.js"), "utf-8");
    expect(esmContent).toBe(workerdContent);

    // Exports map should have all three conditions
    const pkg = await readJsonObject(path.join(tmpDir, "package.json"));
    const pkgExports = asRecord(pkg["exports"], "Expected package.json exports object");
    const rootExport = asRecord(pkgExports["."], "Expected '.' export object");
    expect(rootExport["import"]).toBeDefined();
    expect(rootExport["workerd"]).toBeDefined();
    expect(rootExport["require"]).toBeDefined();
  });
});
