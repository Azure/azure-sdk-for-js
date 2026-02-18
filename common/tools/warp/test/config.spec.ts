// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { resolveWarpConfig } from "../src/config.ts";

function createTmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "warp-test-"));
}

function cleanup(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true });
}

describe("resolveWarpConfig", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = createTmpDir();
  });

  afterEach(() => {
    cleanup(tmpDir);
  });

  const minimalConfig = {
    exports: { ".": "./src/index.ts" },
    targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
  };

  it("resolves warp.config.yml", async () => {
    const { stringify } = await import("yaml");
    fs.writeFileSync(path.join(tmpDir, "warp.config.yml"), stringify(minimalConfig));
    // Write a pnpm-workspace.yaml to stop traversal
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await resolveWarpConfig(tmpDir);
    expect(result.source.type).toBe("yaml");
    expect(result.config.exports["."]).toBe("./src/index.ts");
    expect(result.config.targets).toHaveLength(1);
    expect(result.config.targets[0].name).toBe("esm");
  });

  it("resolves warp.config.yaml (alternate extension)", async () => {
    const { stringify } = await import("yaml");
    fs.writeFileSync(path.join(tmpDir, "warp.config.yaml"), stringify(minimalConfig));
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await resolveWarpConfig(tmpDir);
    expect(result.source.type).toBe("yaml");
  });

  it("resolves package.json warp key as fallback", async () => {
    const pkg = { name: "test", warp: minimalConfig };
    fs.writeFileSync(path.join(tmpDir, "package.json"), JSON.stringify(pkg));
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await resolveWarpConfig(tmpDir);
    expect(result.source.type).toBe("package.json");
    expect(result.config.targets[0].condition).toBe("import");
  });

  it("prefers yml over yaml", async () => {
    const { stringify } = await import("yaml");
    fs.writeFileSync(path.join(tmpDir, "warp.config.yml"), stringify(minimalConfig));
    const altConfig = {
      ...minimalConfig,
      targets: [{ name: "cjs", condition: "require", tsconfig: "./tsconfig.cjs.json" }],
    };
    fs.writeFileSync(path.join(tmpDir, "warp.config.yaml"), stringify(altConfig));
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await resolveWarpConfig(tmpDir);
    expect(result.config.targets[0].name).toBe("esm");
  });

  it("prefers yaml file over package.json warp key", async () => {
    const { stringify } = await import("yaml");
    fs.writeFileSync(path.join(tmpDir, "warp.config.yml"), stringify(minimalConfig));
    const pkg = {
      name: "test",
      warp: {
        ...minimalConfig,
        targets: [{ name: "cjs", condition: "require", tsconfig: "./tsconfig.cjs.json" }],
      },
    };
    fs.writeFileSync(path.join(tmpDir, "package.json"), JSON.stringify(pkg));
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await resolveWarpConfig(tmpDir);
    expect(result.config.targets[0].name).toBe("esm");
  });

  it("throws when no config is found", async () => {
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    await expect(resolveWarpConfig(tmpDir)).rejects.toThrow("No Warp configuration found");
  });

  it("throws on missing exports", async () => {
    const { stringify } = await import("yaml");
    const bad = { targets: [{ name: "esm", condition: "import", tsconfig: "./t.json" }] };
    fs.writeFileSync(path.join(tmpDir, "warp.config.yml"), stringify(bad));
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    await expect(resolveWarpConfig(tmpDir)).rejects.toThrow('"exports" must be an object');
  });

  it("throws on empty targets array", async () => {
    const { stringify } = await import("yaml");
    const bad = { exports: { ".": "./src/index.ts" }, targets: [] };
    fs.writeFileSync(path.join(tmpDir, "warp.config.yml"), stringify(bad));
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    await expect(resolveWarpConfig(tmpDir)).rejects.toThrow('"targets" must be a non-empty array');
  });

  it("throws on target missing required fields", async () => {
    const { stringify } = await import("yaml");
    const bad = {
      exports: { ".": "./src/index.ts" },
      targets: [{ name: "esm" }],
    };
    fs.writeFileSync(path.join(tmpDir, "warp.config.yml"), stringify(bad));
    fs.writeFileSync(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    await expect(resolveWarpConfig(tmpDir)).rejects.toThrow(
      "targets[0].condition must be a non-empty string",
    );
  });
});
