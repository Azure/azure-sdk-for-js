// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import { build } from "../src/build.ts";

function createTmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "warp-build-"));
}

describe("build (integration)", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = createTmpDir();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function setupPackage(): void {
    // Create source
    fs.mkdirSync(path.join(tmpDir, "src"), { recursive: true });
    fs.writeFileSync(
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

    fs.writeFileSync(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));
    fs.writeFileSync(path.join(tmpDir, "tsconfig.cjs.json"), JSON.stringify(cjsTsconfig));

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
    fs.writeFileSync(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));

    // Create package.json
    const pkg = { name: "test-package", version: "1.0.0" };
    fs.writeFileSync(path.join(tmpDir, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);

    // Create pnpm-workspace.yaml to stop traversal
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");
  }

  it("builds successfully and writes exports to package.json", { timeout: 15_000 }, async () => {
    setupPackage();

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Check dist files exist
    expect(fs.existsSync(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "dist/esm/index.d.ts"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "dist/commonjs/index.js"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "dist/commonjs/index.d.ts"))).toBe(true);

    // Check package.json exports were rewritten
    const pkg = JSON.parse(fs.readFileSync(path.join(tmpDir, "package.json"), "utf-8"));
    expect(pkg.exports["./package.json"]).toBe("./package.json");
    expect(pkg.exports["."]["import"]["default"]).toBe("./dist/esm/index.js");
    expect(pkg.exports["."]["import"]["types"]).toBe("./dist/esm/index.d.ts");
    expect(pkg.exports["."]["require"]["default"]).toBe("./dist/commonjs/index.js");
    expect(pkg.exports["."]["require"]["types"]).toBe("./dist/commonjs/index.d.ts");

    // Check commonjs shim was written
    const shimPath = path.join(tmpDir, "dist/commonjs/package.json");
    expect(fs.existsSync(shimPath)).toBe(true);
    const shim = JSON.parse(fs.readFileSync(shimPath, "utf-8"));
    expect(shim.type).toBe("commonjs");
  });

  it("dry-run does not write any files", async () => {
    setupPackage();

    const result = await build({ cwd: tmpDir, dryRun: true });
    expect(result.success).toBe(true);

    // Dist should not exist
    expect(fs.existsSync(path.join(tmpDir, "dist"))).toBe(false);

    // package.json exports should not have been modified
    const pkg = JSON.parse(fs.readFileSync(path.join(tmpDir, "package.json"), "utf-8"));
    expect(pkg.exports).toBeUndefined();
  });
});
