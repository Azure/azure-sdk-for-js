// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import {
  build,
  planPlatformTargetPruning,
  computeLegacyPlatformFieldUpdates,
} from "../../src/index.ts";
import type { ParsedTargetConfig } from "../../src/index.ts";
import type { ImportsMap } from "../../src/index.ts";
import type { WarpTarget } from "../../src/index.ts";

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-prune-"));
}

async function exists(p: string): Promise<boolean> {
  return fs.access(p).then(
    () => true,
    () => false,
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readJsonObject(filePath: string): Promise<Record<string, unknown>> {
  const raw: unknown = JSON.parse(await fs.readFile(filePath, "utf-8"));
  if (!isRecord(raw)) throw new Error(`Expected JSON object in ${filePath}`);
  return raw;
}

/**
 * Build a minimal {@link ParsedTargetConfig}. `planPlatformTargetPruning` only
 * reads `target` and `rootDir`, so the heavyweight `parsedConfig` is stubbed.
 */
function makePc(
  name: string,
  condition: string,
  opts: { polyfillSuffix?: string; rootDir?: string } = {},
): ParsedTargetConfig {
  const target: WarpTarget = {
    name,
    condition,
    tsconfig: `./tsconfig.${name}.json`,
    ...(opts.polyfillSuffix !== undefined && { polyfillSuffix: opts.polyfillSuffix }),
  };
  return {
    target,
    rootDir: opts.rootDir ?? "src",
    outDir: `dist/${name}`,
    parsedConfig: {} as ParsedTargetConfig["parsedConfig"],
  };
}

describe("planPlatformTargetPruning", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  const fourTargets = (): ParsedTargetConfig[] => [
    makePc("browser", "browser"),
    makePc("react-native", "react-native"),
    makePc("esm", "import"),
    makePc("commonjs", "require"),
  ];

  it("prunes browser and react-native when no platform code exists", async () => {
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const a = 1;\n");

    const plan = await planPlatformTargetPruning(fourTargets(), undefined, tmpDir);

    expect(plan.pruned.map((pc) => pc.target.condition).sort()).toEqual([
      "browser",
      "react-native",
    ]);
    expect(plan.kept.map((pc) => pc.target.condition).sort()).toEqual(["import", "require"]);
  });

  it("never prunes the import / require base targets", async () => {
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const a = 1;\n");

    const plan = await planPlatformTargetPruning(fourTargets(), undefined, tmpDir);

    const keptConditions = plan.kept.map((pc) => pc.target.condition);
    expect(keptConditions).toContain("import");
    expect(keptConditions).toContain("require");
  });

  it("keeps a platform target that has polyfill files", async () => {
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const a = 1;\n");
    await fs.writeFile(path.join(tmpDir, "src/thing.ts"), "export const t = 1;\n");
    await fs.writeFile(path.join(tmpDir, "src/thing-browser.mts"), "export const t = 2;\n");

    const targets = [
      makePc("browser", "browser", { polyfillSuffix: "-browser" }),
      makePc("react-native", "react-native", { polyfillSuffix: "-react-native" }),
      makePc("esm", "import"),
      makePc("commonjs", "require"),
    ];

    const plan = await planPlatformTargetPruning(targets, undefined, tmpDir);

    // browser has a polyfill file; react-native does not.
    expect(plan.kept.map((pc) => pc.target.condition)).toContain("browser");
    expect(plan.pruned.map((pc) => pc.target.condition)).toEqual(["react-native"]);
  });

  it("keeps a platform target mapped via #imports to existing files", async () => {
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      'export { val } from "#platform/data";\n',
    );
    await fs.writeFile(path.join(tmpDir, "src/data.ts"), "export const val = 1;\n");
    await fs.writeFile(path.join(tmpDir, "src/data-browser.mts"), "export const val = 2;\n");

    const importsMap: ImportsMap = {
      "#platform/*": {
        browser: "./src/*-browser.mts",
        "react-native": "./src/*-react-native.mts",
        default: "./src/*.ts",
      },
    };

    const plan = await planPlatformTargetPruning(fourTargets(), importsMap, tmpDir);

    // Only the browser variant file exists, so react-native is still pruned.
    expect(plan.kept.map((pc) => pc.target.condition)).toContain("browser");
    expect(plan.pruned.map((pc) => pc.target.condition)).toEqual(["react-native"]);
  });

  it("does not prune custom non-platform conditions (e.g. workerd)", async () => {
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const a = 1;\n");

    const targets = [
      makePc("workerd", "workerd"),
      makePc("esm", "import"),
      makePc("commonjs", "require"),
    ];

    const plan = await planPlatformTargetPruning(targets, undefined, tmpDir);

    expect(plan.pruned).toHaveLength(0);
    expect(plan.kept.map((pc) => pc.target.condition)).toContain("workerd");
  });

  it("does not prune when there is no esm (import) fallback", async () => {
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const a = 1;\n");

    const targets = [makePc("browser", "browser"), makePc("commonjs", "require")];

    const plan = await planPlatformTargetPruning(targets, undefined, tmpDir);

    expect(plan.pruned).toHaveLength(0);
    expect(plan.kept).toHaveLength(2);
  });
});

describe("computeLegacyPlatformFieldUpdates", () => {
  const exportsMap = {
    ".": {
      import: { types: "./dist/esm/index.d.ts", default: "./dist/esm/index.js" },
      require: { types: "./dist/commonjs/index.d.ts", default: "./dist/commonjs/index.js" },
    },
  };

  it("repoints pruned platform conditions at the esm default", () => {
    const updates = computeLegacyPlatformFieldUpdates(
      [{ name: "browser", condition: "browser", tsconfig: "x" }],
      exportsMap,
    );
    expect(updates).toEqual({ browser: "./dist/esm/index.js" });
  });

  it("maps both browser and react-native", () => {
    const updates = computeLegacyPlatformFieldUpdates(
      [
        { name: "browser", condition: "browser", tsconfig: "x" },
        { name: "react-native", condition: "react-native", tsconfig: "y" },
      ],
      exportsMap,
    );
    expect(updates).toEqual({
      browser: "./dist/esm/index.js",
      "react-native": "./dist/esm/index.js",
    });
  });

  it("returns empty when nothing was pruned", () => {
    expect(computeLegacyPlatformFieldUpdates([], exportsMap)).toEqual({});
  });

  it("returns empty when there is no esm import default to fall back to", () => {
    const updates = computeLegacyPlatformFieldUpdates(
      [{ name: "browser", condition: "browser", tsconfig: "x" }],
      { ".": { require: { types: "./d.ts", default: "./d.js" } } },
    );
    expect(updates).toEqual({});
  });
});

describe("build (platform target pruning)", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  function tsconfig(outDir: string, moduleKind = "NodeNext"): string {
    return JSON.stringify({
      compilerOptions: {
        outDir,
        rootDir: "./src",
        module: moduleKind,
        moduleResolution: moduleKind,
        target: "ES2023",
        declaration: true,
        strict: true,
      },
      include: ["src/**/*.ts"],
    });
  }

  /**
   * Scaffold a package with all four base targets and no platform-specific
   * source code, so browser / react-native are prunable.
   */
  async function setupPackage(opts: {
    prunePlatformTargets?: boolean;
    legacyFields?: boolean;
  }): Promise<void> {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      'export const greeting: string = "hello";\n',
    );

    await fs.writeFile(path.join(tmpDir, "tsconfig.browser.json"), tsconfig("./dist/browser"));
    await fs.writeFile(
      path.join(tmpDir, "tsconfig.react-native.json"),
      tsconfig("./dist/react-native"),
    );
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), tsconfig("./dist/esm"));
    await fs.writeFile(
      path.join(tmpDir, "tsconfig.cjs.json"),
      tsconfig("./dist/commonjs", "Node16"),
    );

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        ...(opts.prunePlatformTargets !== undefined && {
          prunePlatformTargets: opts.prunePlatformTargets,
        }),
        exports: { "./package.json": "./package.json", ".": "./src/index.ts" },
        targets: [
          { name: "browser", condition: "browser", tsconfig: "./tsconfig.browser.json" },
          {
            name: "react-native",
            condition: "react-native",
            tsconfig: "./tsconfig.react-native.json",
          },
          { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
          {
            name: "commonjs",
            condition: "require",
            tsconfig: "./tsconfig.cjs.json",
            moduleType: "commonjs",
          },
        ],
      }),
    );

    const pkg: Record<string, unknown> = { name: "test-prune", version: "1.0.0", type: "module" };
    if (opts.legacyFields) {
      pkg.browser = "./dist/browser/index.js";
      pkg["react-native"] = "./dist/react-native/index.js";
    }
    await fs.writeFile(path.join(tmpDir, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");
  }

  it("prunes browser/react-native and repoints legacy fields when enabled", async () => {
    await setupPackage({ prunePlatformTargets: true, legacyFields: true });

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Only esm + commonjs survive.
    expect(result.config.targets.map((t) => t.name).sort()).toEqual(["commonjs", "esm"]);

    // No platform output produced.
    expect(await exists(path.join(tmpDir, "dist/browser"))).toBe(false);
    expect(await exists(path.join(tmpDir, "dist/react-native"))).toBe(false);
    expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/commonjs/index.js"))).toBe(true);

    const pkg = await readJsonObject(path.join(tmpDir, "package.json"));
    const dotExport = (pkg.exports as Record<string, unknown>)["."] as Record<string, unknown>;
    expect(Object.keys(dotExport).sort()).toEqual(["import", "require"]);
    expect(dotExport).not.toHaveProperty("browser");
    expect(dotExport).not.toHaveProperty("react-native");

    // Legacy top-level fields repointed at the esm build.
    expect(pkg.browser).toBe("./dist/esm/index.js");
    expect(pkg["react-native"]).toBe("./dist/esm/index.js");
  });

  it("does not introduce legacy fields that did not already exist", async () => {
    await setupPackage({ prunePlatformTargets: true, legacyFields: false });

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    const pkg = await readJsonObject(path.join(tmpDir, "package.json"));
    expect(pkg).not.toHaveProperty("browser");
    expect(pkg).not.toHaveProperty("react-native");
  });

  it("keeps all targets when the flag is absent", async () => {
    await setupPackage({ legacyFields: false });

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    expect(result.config.targets.map((t) => t.name).sort()).toEqual([
      "browser",
      "commonjs",
      "esm",
      "react-native",
    ]);
    expect(await exists(path.join(tmpDir, "dist/browser/index.js"))).toBe(true);
    expect(await exists(path.join(tmpDir, "dist/react-native/index.js"))).toBe(true);
  });

  it("keeps all targets when the flag is explicitly false", async () => {
    await setupPackage({ prunePlatformTargets: false, legacyFields: false });

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);
    expect(result.config.targets.map((t) => t.name)).toContain("browser");
    expect(await exists(path.join(tmpDir, "dist/browser/index.js"))).toBe(true);
  });

  it("an explicit --target overrides pruning", async () => {
    await setupPackage({ prunePlatformTargets: true, legacyFields: false });

    const result = await build({ cwd: tmpDir, target: ["browser"] });
    expect(result.success).toBe(true);
    expect(result.config.targets.map((t) => t.name)).toEqual(["browser"]);
    expect(await exists(path.join(tmpDir, "dist/browser/index.js"))).toBe(true);
  });
});
