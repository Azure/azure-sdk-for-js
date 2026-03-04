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
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-build-"));
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

describe("build (integration)", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  async function setupPackage(): Promise<void> {
    // Create source
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      'export const greeting: string = "hello";\n',
    );

    // Create tsconfigs
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

    // Create warp config
    const warpConfig = {
      exports: {
        "./package.json": "./package.json",
        ".": "./src/index.ts",
      },
      targets: [
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        { name: "commonjs", condition: "require", tsconfig: "./tsconfig.cjs.json" },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));

    // Create package.json
    const pkg = { name: "test-package", version: "1.0.0" };
    await fs.writeFile(path.join(tmpDir, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);

    // Create pnpm-workspace.yaml to stop traversal
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");
  }

  it("builds successfully and writes exports to package.json", async () => {
    await setupPackage();

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Check dist files exist
    expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/esm/index.d.ts"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/commonjs/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/commonjs/index.d.ts"))).toBe(true);

    // Check package.json exports were rewritten
    const pkg = await readJsonObject(path.join(tmpDir, "package.json"));
    const pkgExports = asRecord(pkg["exports"], "Expected package.json exports object");
    expect(pkgExports["./package.json"]).toBe("./package.json");

    const rootExport = asRecord(pkgExports["."], "Expected '.' export object");
    const importExport = asRecord(rootExport["import"], "Expected 'import' export object");
    const requireExport = asRecord(rootExport["require"], "Expected 'require' export object");
    expect(importExport["default"]).toBe("./dist/esm/index.js");
    expect(importExport["types"]).toBe("./dist/esm/index.d.ts");
    expect(requireExport["default"]).toBe("./dist/commonjs/index.js");
    expect(requireExport["types"]).toBe("./dist/commonjs/index.d.ts");

    // Check commonjs shim was written
    const shimPath = path.join(tmpDir, "dist/commonjs/package.json");
    expect(await exists(shimPath)).toBe(true);
    const shim = await readJsonObject(shimPath);
    expect(shim["type"]).toBe("commonjs");
  });

  it("dry-run does not write any files", async () => {
    await setupPackage();

    const result = await build({ cwd: tmpDir, dryRun: true });
    expect(result.success).toBe(true);

    // Dist should not exist
    expect(await exists(path.join(tmpDir, "dist"))).toBe(false);

    // package.json exports should not have been modified
    const pkg = await readJsonObject(path.join(tmpDir, "package.json"));
    expect(pkg["exports"]).toBeUndefined();
  });

  it("does not write exports to package.json when using target", async () => {
    await setupPackage();

    const result = await build({ cwd: tmpDir, target: ["esm"] });
    expect(result.success).toBe(true);

    expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);

    const pkg = await readJsonObject(path.join(tmpDir, "package.json"));
    expect(pkg["exports"]).toBeUndefined();
  });
});
