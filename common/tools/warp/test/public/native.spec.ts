// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { API, Program, Snapshot } from "typescript/async";
import { version } from "typescript";
import { build, watch, formatDiagnostics } from "../../src/index.ts";
import type { WarpTarget } from "../../src/index.ts";

const exec = promisify(execFile);
const launch = fileURLToPath(new URL("../../launch.js", import.meta.url));

describe("TypeScript 7.1 native prototype", () => {
  let cwd: string;

  beforeEach(async () => {
    cwd = await fs.mkdtemp(path.join(os.tmpdir(), "warp-native-"));
    await fs.mkdir(path.join(cwd, "src"));
    await writeJson("package.json", {
      name: "warp-native-test",
      version: "1.0.0",
      type: "module",
      imports: { "#value": "./src/value.ts" },
    });
    await writeJson("tsconfig.base.json", {
      compilerOptions: {
        rootDir: "./src",
        target: "ES2023",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        strict: true,
        types: [],
        declaration: true,
        declarationMap: true,
        sourceMap: true,
      },
      include: ["src/**/*.ts", "src/**/*.mts", "src/**/*.cts"],
    });
    await fs.writeFile(path.join(cwd, "src", "index.ts"), 'export { value } from "#value";\n');
    await fs.writeFile(
      path.join(cwd, "src", "value.ts"),
      'export function value(): string { return "node"; }\n',
    );
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    await fs.rm(cwd, { recursive: true, force: true });
  });

  async function writeJson(fileName: string, value: unknown): Promise<void> {
    await fs.writeFile(path.join(cwd, fileName), JSON.stringify(value, null, 2) + "\n");
  }

  async function configure(
    targets: (Partial<WarpTarget> & { name: string })[] = [{ name: "esm" }],
    compilerOptions: Record<string, unknown> = {},
  ): Promise<void> {
    for (const target of targets) {
      await writeJson(`tsconfig.${target.name}.json`, {
        extends: "./tsconfig.base.json",
        compilerOptions: { outDir: `./dist/${target.name}`, ...compilerOptions },
      });
    }
    await writeJson("warp.config.json", {
      exports: { ".": "./src/index.ts", "./package.json": "./package.json" },
      targets: targets.map((target) => ({
        condition: target.name,
        tsconfig: `./tsconfig.${target.name}.json`,
        ...target,
      })),
    });
  }

  async function readOutput(target: string, file = "value.js"): Promise<string> {
    return fs.readFile(path.join(cwd, "dist", target, file), "utf-8");
  }

  it("uses the native beta directly", () => {
    expect(version).toBe("7.1.0-beta");
  });

  it("reuses one client, disposes each snapshot before the next target, and copies exact matches", async () => {
    const snapshots = vi.spyOn(API.prototype, "createSnapshot");
    const snapshotDisposals = vi.spyOn(Snapshot.prototype, "dispose");
    const programDisposals = vi.spyOn(Program.prototype, "dispose");
    const closes = vi.spyOn(API.prototype, "close");
    await fs.writeFile(
      path.join(cwd, "src", "value-browser.mts"),
      'export function value(): string { return "browser"; }\n',
    );
    await fs.writeFile(
      path.join(cwd, "src", "value-cjs.cts"),
      'export function value(): string { return "cjs"; }\n',
    );
    await configure([
      { name: "esm" },
      { name: "copy", polyfillSuffix: "-absent" },
      { name: "browser", polyfillSuffix: "-browser" },
      { name: "cjs", moduleType: "commonjs", polyfillSuffix: "-cjs" },
      { name: "esm-again" },
    ]);
    const result = await build({ cwd });
    expect(result.success).toBe(true);
    expect(result.compileResults?.map((r) => r.deduped)).toEqual([false, true, false, false, true]);
    expect(snapshots).toHaveBeenCalledTimes(3);
    expect(new Set(snapshots.mock.contexts).size).toBe(1);
    expect(snapshotDisposals).toHaveBeenCalledTimes(3);
    expect(programDisposals).toHaveBeenCalledTimes(3);
    expect(closes).toHaveBeenCalledTimes(1);
    for (let i = 0; i < 2; i++) {
      expect(snapshotDisposals.mock.invocationCallOrder[i]).toBeLessThan(
        snapshots.mock.invocationCallOrder[i + 1],
      );
    }
    expect(snapshotDisposals.mock.invocationCallOrder[2]).toBeLessThan(
      closes.mock.invocationCallOrder[0],
    );
    expect(await readOutput("esm")).toContain('"node"');
    expect(await readOutput("browser")).toContain('"browser"');
    expect(await readOutput("cjs")).toContain('"cjs"');
    expect(await readOutput("cjs")).toContain("exports.value");
    expect(await readOutput("esm-again")).toBe(await readOutput("esm"));
    expect(await readOutput("copy", "value.d.ts")).toBe(await readOutput("esm", "value.d.ts"));
    expect(await readOutput("copy", "value.js.map")).toBe(await readOutput("esm", "value.js.map"));
    expect(await readOutput("cjs", "index.js")).toContain('require("./value.js")');
    expect(await readOutput("cjs", "package.json")).toContain('"type": "commonjs"');
    await expect(
      fs.access(path.join(cwd, "dist", "browser", "value-browser.mjs")),
    ).rejects.toThrow();
    await expect(fs.access(path.join(cwd, "src", "package.json"))).rejects.toThrow();
    const pkgAfter = await fs.readFile(path.join(cwd, "package.json"), "utf-8");
    expect(JSON.parse(pkgAfter)).toMatchObject({
      name: "warp-native-test",
      type: "module",
      imports: { "#value": "./src/value.ts" },
      exports: { ".": { esm: { default: "./dist/esm/index.js", types: "./dist/esm/index.d.ts" } } },
    });
  });

  it("keeps diagnostics from a target with different type-check options instead of copying output", async () => {
    await fs.writeFile(path.join(cwd, "src", "value.ts"), "export const value = document;\n");
    await configure([{ name: "dom" }, { name: "no-dom" }]);
    await writeJson("tsconfig.dom.json", {
      extends: "./tsconfig.base.json",
      compilerOptions: { outDir: "./dist/dom", lib: ["ES2023", "DOM"] },
    });
    await writeJson("tsconfig.no-dom.json", {
      extends: "./tsconfig.base.json",
      compilerOptions: { outDir: "./dist/no-dom", lib: ["ES2023"] },
    });
    const result = await build({ cwd });
    expect(result.success).toBe(false);
    expect(result.compileResults?.[1].deduped).toBe(false);
    expect(formatDiagnostics(result.compileResults ?? [])).toMatch(/\[no-dom\].*TS2584/);
  });

  it("reports target-prefixed native errors with positions and does not rewrite package.json", async () => {
    await configure();
    await fs.writeFile(path.join(cwd, "src", "value.ts"), "export const value: string = 42;\n");
    const before = await fs.readFile(path.join(cwd, "package.json"), "utf-8");
    const disposals = vi.spyOn(Snapshot.prototype, "dispose");
    const closes = vi.spyOn(API.prototype, "close");
    const result = await build({ cwd });
    expect(result.success).toBe(false);
    const text = formatDiagnostics(result.compileResults ?? []);
    expect(text).toContain("[esm]");
    expect(text).toMatch(/value\.ts\(1,\d+\): error TS2322/);
    expect(await fs.readFile(path.join(cwd, "package.json"), "utf-8")).toBe(before);
    expect(disposals).toHaveBeenCalledTimes(1);
    expect(closes).toHaveBeenCalledTimes(1);
  });

  it("disposes the program, snapshot, and client when emit throws", async () => {
    await configure();
    vi.spyOn(Program.prototype, "emit").mockRejectedValueOnce(new Error("emit failed"));
    const programs = vi.spyOn(Program.prototype, "dispose");
    const snapshots = vi.spyOn(Snapshot.prototype, "dispose");
    const closes = vi.spyOn(API.prototype, "close");
    await expect(build({ cwd })).rejects.toThrow("emit failed");
    expect(programs).toHaveBeenCalledTimes(1);
    expect(snapshots).toHaveBeenCalledTimes(1);
    expect(closes).toHaveBeenCalledTimes(1);
  });

  it("uses native config diagnostics and closes the client on invalid extends", async () => {
    await configure();
    await writeJson("tsconfig.esm.json", { extends: "./missing.json" });
    const closes = vi.spyOn(API.prototype, "close");
    await expect(build({ cwd })).rejects.toThrow(/extends/);
    expect(closes).toHaveBeenCalledTimes(1);
  });

  it("reports removed compiler options instead of falling back to another compiler", async () => {
    await configure([{ name: "esm" }], { moduleResolution: "node10", module: "ESNext" });
    const result = await build({ cwd });
    expect(result.success).toBe(false);
    expect(formatDiagnostics(result.compileResults ?? [])).toContain("node10");
  });

  it("anchors external tsconfigs and ${configDir} at the package root without writing a virtual config", async () => {
    const external = path.join(cwd, "shared");
    const packageRoot = path.join(cwd, "package");
    await fs.mkdir(external);
    await fs.mkdir(packageRoot);
    await fs.mkdir(path.join(packageRoot, "src"));
    await fs.writeFile(path.join(packageRoot, "src", "index.ts"), "export const x = 1;\n");
    await writeJson("shared/tsconfig.json", {
      compilerOptions: {
        rootDir: "${configDir}/src",
        outDir: "${configDir}/dist",
        types: [],
        declaration: true,
        module: "NodeNext",
        moduleResolution: "NodeNext",
      },
      include: ["${configDir}/src/**/*.ts"],
    });
    await writeJson("package/package.json", { name: "external", type: "module" });
    await writeJson("package/warp.config.json", {
      exports: { ".": "./src/index.ts" },
      targets: [{ name: "esm", tsconfig: "../shared/tsconfig.json" }],
    });
    const result = await build({ cwd: packageRoot });
    expect(result.success).toBe(true);
    await expect(fs.access(path.join(packageRoot, "dist", "index.js"))).resolves.toBeUndefined();
    await expect(fs.access(path.join(packageRoot, "__warp_virtual_esm.json"))).rejects.toThrow();
  });

  it("supports dry-run, filtered builds, and no-clean without changing their contracts", async () => {
    await configure([{ name: "esm" }, { name: "copy" }]);
    const original = await fs.readFile(path.join(cwd, "package.json"), "utf-8");
    expect((await build({ cwd, dryRun: true })).success).toBe(true);
    await expect(fs.access(path.join(cwd, "dist"))).rejects.toThrow();
    expect((await build({ cwd, target: ["esm"] })).success).toBe(true);
    expect(await fs.readFile(path.join(cwd, "package.json"), "utf-8")).toBe(original);
    await fs.writeFile(path.join(cwd, "dist", "esm", "stale.js"), "stale");
    expect((await build({ cwd, clean: false })).success).toBe(true);
    await expect(fs.access(path.join(cwd, "dist", "esm", "stale.js"))).resolves.toBeUndefined();
    expect((await build({ cwd })).success).toBe(true);
    await expect(fs.access(path.join(cwd, "dist", "esm", "stale.js"))).rejects.toThrow();
  });

  it("does not reuse stale source content across builds", async () => {
    await configure();
    expect((await build({ cwd })).success).toBe(true);
    await fs.writeFile(path.join(cwd, "src", "value.ts"), 'export const value = "changed";\n');
    expect((await build({ cwd, clean: false })).success).toBe(true);
    expect(await readOutput("esm")).toContain('"changed"');
  });

  it("keeps --parallel bounded to one client rather than spawning a process per worker", async () => {
    await configure([{ name: "esm" }, { name: "cjs", moduleType: "commonjs" }]);
    const snapshots = vi.spyOn(API.prototype, "createSnapshot");
    expect((await build({ cwd, parallel: true })).success).toBe(true);
    expect(snapshots).toHaveBeenCalledTimes(2);
    expect(new Set(snapshots.mock.contexts).size).toBe(1);
  });

  it("supports watch rebuilds without retaining stale snapshots", async () => {
    await configure();
    const closes = vi.spyOn(API.prototype, "close");
    const controller = await watch({ cwd, debounceMs: 5 });
    try {
      await fs.writeFile(path.join(cwd, "src", "value.ts"), 'export const value = "watched";\n');
      await vi.waitFor(
        async () => {
          expect(await readOutput("esm")).toContain('"watched"');
          expect(closes).toHaveBeenCalledTimes(3);
        },
        { timeout: 10_000 },
      );
    } finally {
      controller.abort();
    }
  });

  it("shares its client with import rewriting and the optional API size report", async () => {
    await configure();
    const snapshots = vi.spyOn(API.prototype, "createSnapshot");
    const disposals = vi.spyOn(Snapshot.prototype, "dispose");
    const parses = vi.spyOn(API.prototype, "createSourceFile");
    const closes = vi.spyOn(API.prototype, "close");
    const result = await build({ cwd, stats: true });
    expect(result.success).toBe(true);
    expect(result.sizeReport?.apiSurface.exportCount).toBe(1);
    expect(new Set([...snapshots.mock.contexts, ...parses.mock.contexts]).size).toBe(1);
    expect(disposals).toHaveBeenCalledTimes(snapshots.mock.calls.length);
    expect(closes).toHaveBeenCalledTimes(1);
  });

  it.each([{ noEmit: true }, { emitDeclarationOnly: true }])(
    "explicitly rejects unsupported output modes: %j",
    async (options) => {
      await configure([{ name: "esm" }], options);
      await expect(build({ cwd })).rejects.toThrow(/requires JavaScript emit/);
    },
  );

  it("explicitly rejects project-reference builds", async () => {
    await configure();
    await writeJson("tsconfig.esm.json", {
      extends: "./tsconfig.base.json",
      compilerOptions: { outDir: "./dist/esm" },
      references: [{ path: "./referenced" }],
    });
    await expect(build({ cwd })).rejects.toThrow(/project references/);
  });

  it("runs from the CLI and preserves JSON output", async () => {
    await configure();
    const { stdout } = await exec(process.execPath, [launch, "build", "--json"], {
      cwd,
    });
    expect(JSON.parse(stdout)).toMatchObject({
      success: true,
      targets: [{ name: "esm", success: true, deduped: false }],
    });
  });
});
