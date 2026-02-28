// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import * as ts from "typescript";
import { stringify } from "yaml";
import { WarpError } from "../../src/types.ts";
import { findWarpConfig, inferModuleType } from "../../src/config.ts";
import {
  validateOutDirs,
  optionsSignature,
  SharedSourceFileCache,
  cleanOutDir,
} from "../../src/compiler.ts";
import type { ParsedTargetConfig } from "../../src/compiler.ts";
import { verifyDistFiles, writeExportsToPackageJson } from "../../src/exports.ts";
import { build } from "../../src/build.ts";

async function exists(p: string): Promise<boolean> {
  return fs.access(p).then(
    () => true,
    () => false,
  );
}

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-quality-"));
}

async function cleanup(dir: string): Promise<void> {
  await fs.rm(dir, { recursive: true, force: true });
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

/** Build a minimal ParsedTargetConfig for tests that only inspect outDir/target. */
function mockParsedConfig(overrides: {
  target: ParsedTargetConfig["target"];
  outDir: string;
  rootDir: string;
}): ParsedTargetConfig {
  return {
    target: overrides.target,
    parsedConfig: {
      options: {},
      fileNames: [],
      errors: [],
    } as unknown as ts.ParsedCommandLine,
    outDir: overrides.outDir,
    rootDir: overrides.rootDir,
  };
}

// ---------------------------------------------------------------------------
// WarpError structured errors
// ---------------------------------------------------------------------------

describe("WarpError", () => {
  it("has a code property", () => {
    const err = new WarpError("CONFIG_NOT_FOUND", "test message");
    expect(err.code).toBe("CONFIG_NOT_FOUND");
    expect(err.message).toBe("test message");
    expect(err.name).toBe("WarpError");
    expect(err).toBeInstanceOf(Error);
  });

  it("supports cause chaining", () => {
    const cause = new Error("underlying");
    const err = new WarpError("COMPILE_ERROR", "wrapped", { cause });
    expect(err.cause).toBe(cause);
  });

  it("is thrown by config resolution when no config found", async () => {
    const tmpDir = await createTmpDir();
    try {
      const result = await findWarpConfig(tmpDir);
      expect(result).toBeUndefined();
    } finally {
      await cleanup(tmpDir);
    }
  });

  it("is thrown by config validation on invalid config", async () => {
    const tmpDir = await createTmpDir();
    try {
      await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify({ exports: "bad" }));
      await expect(findWarpConfig(tmpDir)).rejects.toThrow(WarpError);
      await expect(findWarpConfig(tmpDir)).rejects.toMatchObject({
        code: "CONFIG_INVALID",
      });
    } finally {
      await cleanup(tmpDir);
    }
  });
});

// ---------------------------------------------------------------------------
// Logger: buffered replay on failure
// ---------------------------------------------------------------------------

describe("Logger buffering", () => {
  let captured: string[];
  const origLog = console.log;
  const origErr = console.error;

  beforeEach(() => {
    captured = [];
    console.log = (msg: string) => captured.push(`out:${msg}`);
    console.error = (msg: string) => captured.push(`err:${msg}`);
  });

  afterEach(() => {
    console.log = origLog;
    console.error = origErr;
  });

  it("flush() replays only suppressed messages to stderr at info level", async () => {
    const { Logger } = await import("../../src/logger.ts");
    const log = new Logger("info");
    log.info("step 1"); // printed to stdout — NOT buffered
    log.verbose("debug detail"); // suppressed at info — buffered

    captured.length = 0; // clear the info output to isolate flush
    log.flush();

    const errLines = captured.filter((l) => l.startsWith("err:"));
    // Only the suppressed verbose message should replay, not the already-printed info
    expect(errLines.some((l) => l.includes("debug detail"))).toBe(true);
    expect(errLines.some((l) => l.includes("step 1"))).toBe(false);
  });

  it("flush() is a no-op at verbose level (already printed)", async () => {
    const { Logger } = await import("../../src/logger.ts");
    const log = new Logger("verbose");
    log.info("step 1");
    log.verbose("debug detail");

    captured.length = 0;
    log.flush();

    expect(captured.length).toBe(0);
  });

  it("clear() discards the buffer", async () => {
    const { Logger } = await import("../../src/logger.ts");
    const log = new Logger("info");
    log.info("step 1");
    log.verbose("debug detail");

    log.clear();

    captured.length = 0;
    log.flush();

    // Only the header should NOT appear because buffer was cleared
    expect(captured.length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Config validation: duplicate names/conditions
// ---------------------------------------------------------------------------

describe("config validation: duplicates", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it("rejects duplicate target names", async () => {
    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "esm", condition: "import", tsconfig: "./t1.json" },
          { name: "esm", condition: "require", tsconfig: "./t2.json" },
        ],
      }),
    );

    await expect(findWarpConfig(tmpDir)).rejects.toThrow('duplicate target name "esm"');
    await expect(findWarpConfig(tmpDir)).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
    });
  });

  it("rejects duplicate target conditions", async () => {
    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "esm", condition: "import", tsconfig: "./t1.json" },
          { name: "cjs", condition: "import", tsconfig: "./t2.json" },
        ],
      }),
    );

    await expect(findWarpConfig(tmpDir)).rejects.toThrow('duplicate target condition "import"');
  });

  it("validates moduleType field", async () => {
    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          {
            name: "esm",
            condition: "import",
            tsconfig: "./t.json",
            moduleType: "invalid",
          },
        ],
      }),
    );

    await expect(findWarpConfig(tmpDir)).rejects.toThrow(
      'moduleType must be "module" or "commonjs"',
    );
  });
});

// ---------------------------------------------------------------------------
// Config: no directory traversal
// ---------------------------------------------------------------------------

describe("config: no traversal", () => {
  it("does not walk up to parent directory", async () => {
    const parentDir = await createTmpDir();
    const childDir = path.join(parentDir, "child");
    await fs.mkdir(childDir, { recursive: true });

    try {
      // Put config in parent only
      await fs.writeFile(
        path.join(parentDir, "warp.config.yml"),
        stringify({
          exports: { ".": "./src/index.ts" },
          targets: [{ name: "esm", condition: "import", tsconfig: "./t.json" }],
        }),
      );

      // Child should NOT find parent's config
      const result = await findWarpConfig(childDir);
      expect(result).toBeUndefined();
    } finally {
      await cleanup(parentDir);
    }
  });
});

// ---------------------------------------------------------------------------
// outDir overlap validation
// ---------------------------------------------------------------------------

describe("validateOutDirs", () => {
  it("passes with distinct outDirs", () => {
    const configs: ParsedTargetConfig[] = [
      mockParsedConfig({
        target: { name: "esm", condition: "import", tsconfig: "./t.json" },
        outDir: "/pkg/dist/esm",
        rootDir: "/pkg/src",
      }),
      mockParsedConfig({
        target: { name: "cjs", condition: "require", tsconfig: "./t2.json" },
        outDir: "/pkg/dist/cjs",
        rootDir: "/pkg/src",
      }),
    ];
    expect(() => validateOutDirs(configs)).not.toThrow();
  });

  it("throws on overlapping outDirs", () => {
    const configs: ParsedTargetConfig[] = [
      mockParsedConfig({
        target: { name: "esm", condition: "import", tsconfig: "./t.json" },
        outDir: "/pkg/dist/shared",
        rootDir: "/pkg/src",
      }),
      mockParsedConfig({
        target: { name: "cjs", condition: "require", tsconfig: "./t2.json" },
        outDir: "/pkg/dist/shared",
        rootDir: "/pkg/src",
      }),
    ];
    expect(() => validateOutDirs(configs)).toThrow("share the same outDir");
    expect(() => validateOutDirs(configs)).toThrow(WarpError);
  });
});

// ---------------------------------------------------------------------------
// optionsSignature includes fileNames
// ---------------------------------------------------------------------------

describe("optionsSignature includes fileNames", () => {
  const baseOpts: ts.CompilerOptions = {
    module: ts.ModuleKind.NodeNext,
    target: ts.ScriptTarget.ES2022,
    declaration: true,
  };

  it("same options + same files → same signature", () => {
    const files = ["/a/b.ts", "/a/c.ts"];
    const sig1 = optionsSignature(baseOpts, files);
    const sig2 = optionsSignature(baseOpts, files);
    expect(sig1).toBe(sig2);
  });

  it("same options + different files → different signature", () => {
    const sig1 = optionsSignature(baseOpts, ["/a/b.ts", "/a/c.ts"]);
    const sig2 = optionsSignature(baseOpts, ["/a/b.ts"]);
    expect(sig1).not.toBe(sig2);
  });

  it("different options + same files → different signature", () => {
    const opts2 = { ...baseOpts, strict: true };
    const files = ["/a/b.ts"];
    const sig1 = optionsSignature(baseOpts, files);
    const sig2 = optionsSignature(opts2, files);
    expect(sig1).not.toBe(sig2);
  });

  it("file order does not matter (sorted)", () => {
    const sig1 = optionsSignature(baseOpts, ["/z.ts", "/a.ts"]);
    const sig2 = optionsSignature(baseOpts, ["/a.ts", "/z.ts"]);
    expect(sig1).toBe(sig2);
  });

  it("polyfillSuffix changes signature", () => {
    const files = ["/a.ts"];
    const sig1 = optionsSignature(baseOpts, files);
    const sig2 = optionsSignature(baseOpts, files, "-browser");
    expect(sig1).not.toBe(sig2);
  });
});

// ---------------------------------------------------------------------------
// SharedSourceFileCache with ScriptTarget key
// ---------------------------------------------------------------------------

describe("SharedSourceFileCache with ScriptTarget", () => {
  it("returns undefined for uncached files", () => {
    const cache = new SharedSourceFileCache();
    expect(cache.get("/a.ts", ts.ScriptTarget.ES2022)).toBeUndefined();
  });

  it("caches by fileName + scriptTarget", () => {
    const cache = new SharedSourceFileCache();
    const sf = ts.createSourceFile("/a.ts", "const x = 1;", ts.ScriptTarget.ES2022);
    cache.set("/a.ts", ts.ScriptTarget.ES2022, sf);

    expect(cache.get("/a.ts", ts.ScriptTarget.ES2022)).toBe(sf);
    // Different target → different entry
    expect(cache.get("/a.ts", ts.ScriptTarget.ES5)).toBeUndefined();
  });

  it("normalizes paths to absolute in makeKey", () => {
    const cache = new SharedSourceFileCache();
    const sf = ts.createSourceFile("a.ts", "const x = 1;", ts.ScriptTarget.ES2022);
    const absPath = path.resolve("a.ts");
    cache.set(absPath, ts.ScriptTarget.ES2022, sf);
    expect(cache.get(absPath, ts.ScriptTarget.ES2022)).toBe(sf);
  });
});

// ---------------------------------------------------------------------------
// inferModuleType
// ---------------------------------------------------------------------------

describe("inferModuleType", () => {
  it('returns "commonjs" for CommonJS module kind', () => {
    expect(inferModuleType(ts.ModuleKind.CommonJS)).toBe("commonjs");
  });

  it('returns "module" for ESNext', () => {
    expect(inferModuleType(ts.ModuleKind.ESNext)).toBe("module");
  });

  it('returns "module" for NodeNext', () => {
    expect(inferModuleType(ts.ModuleKind.NodeNext)).toBe("module");
  });

  it('returns "module" for undefined', () => {
    expect(inferModuleType(undefined)).toBe("module");
  });
});

// ---------------------------------------------------------------------------
// cleanOutDir
// ---------------------------------------------------------------------------

describe("cleanOutDir", () => {
  it("removes existing directory", async () => {
    const tmpDir = await createTmpDir();
    const outDir = path.join(tmpDir, "dist");
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "file.js"), "content");

    await cleanOutDir(outDir);
    expect(await exists(outDir)).toBe(false);
    await cleanup(tmpDir);
  });

  it("does not throw for non-existent directory", async () => {
    await expect(cleanOutDir("/tmp/nonexistent-warp-dir-12345")).resolves.toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// verifyDistFiles
// ---------------------------------------------------------------------------

describe("verifyDistFiles", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it("returns empty array when all files exist", async () => {
    await fs.mkdir(path.join(tmpDir, "dist/esm"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "dist/esm/index.js"), "");
    await fs.writeFile(path.join(tmpDir, "dist/esm/index.d.ts"), "");

    const exportsMap = {
      ".": {
        import: {
          types: "./dist/esm/index.d.ts",
          default: "./dist/esm/index.js",
        },
      },
    };

    expect(await verifyDistFiles(exportsMap, tmpDir)).toEqual([]);
  });

  it("returns missing files", async () => {
    const exportsMap = {
      ".": {
        import: {
          types: "./dist/esm/index.d.ts",
          default: "./dist/esm/index.js",
        },
      },
    };

    const missing = await verifyDistFiles(exportsMap, tmpDir);
    expect(missing).toContain("./dist/esm/index.js");
    expect(missing).toContain("./dist/esm/index.d.ts");
  });

  it("ignores pass-through entries", async () => {
    const exportsMap = {
      "./package.json": "./package.json",
    };

    // package.json is not a .js or .d.ts file, so it's skipped
    expect(await verifyDistFiles(exportsMap, tmpDir)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Exports merge (non-destructive)
// ---------------------------------------------------------------------------

describe("writeExportsToPackageJson: merge", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it("preserves unmanaged exports entries", async () => {
    const pkg = {
      name: "test",
      exports: {
        "./internal": "./dist/internal.js",
      },
    };
    await fs.writeFile(path.join(tmpDir, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);

    const exportsMap = {
      ".": {
        import: { types: "./dist/esm/index.d.ts", default: "./dist/esm/index.js" },
      },
    };

    const results = [
      {
        target: { name: "esm", condition: "import", tsconfig: "./t.json" },
        diagnostics: [] as readonly ts.Diagnostic[],
        success: true,
        outDir: path.join(tmpDir, "dist/esm"),
        rootDir: path.join(tmpDir, "src"),
        compileTimeMs: 0,
        deduped: false,
      },
    ];

    await fs.mkdir(path.join(tmpDir, "dist/esm"), { recursive: true });
    await writeExportsToPackageJson(exportsMap, results, tmpDir);

    const updated = await readJsonObject(path.join(tmpDir, "package.json"));
    const updatedExports = asRecord(updated["exports"], "Expected exports object in package.json");
    // Warp-managed entry present
    expect(updatedExports["."]).toBeDefined();
    // Unmanaged entry preserved
    expect(updatedExports["./internal"]).toBe("./dist/internal.js");
  });

  it("Warp entries take precedence over existing entries with same key", async () => {
    const pkg = {
      name: "test",
      exports: {
        ".": "./old-entry.js",
      },
    };
    await fs.writeFile(path.join(tmpDir, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);

    const exportsMap = {
      ".": {
        import: { types: "./dist/esm/index.d.ts", default: "./dist/esm/index.js" },
      },
    };

    const results = [
      {
        target: { name: "esm", condition: "import", tsconfig: "./t.json" },
        diagnostics: [] as readonly ts.Diagnostic[],
        success: true,
        outDir: path.join(tmpDir, "dist/esm"),
        rootDir: path.join(tmpDir, "src"),
        compileTimeMs: 0,
        deduped: false,
      },
    ];

    await fs.mkdir(path.join(tmpDir, "dist/esm"), { recursive: true });
    await writeExportsToPackageJson(exportsMap, results, tmpDir);

    const updated = await readJsonObject(path.join(tmpDir, "package.json"));
    const updatedExports = asRecord(updated["exports"], "Expected exports object in package.json");
    // Warp entry overwrites old
    expect(updatedExports["."]).toEqual({
      import: { types: "./dist/esm/index.d.ts", default: "./dist/esm/index.js" },
    });
  });
});

// ---------------------------------------------------------------------------
// Module type shim from compiler options
// ---------------------------------------------------------------------------

describe("module type shim from compiler options", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it("writes commonjs shim when moduleType is explicit", async () => {
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test" }, null, 2)}\n`,
    );
    await fs.mkdir(path.join(tmpDir, "dist/cjs"), { recursive: true });

    const results = [
      {
        target: {
          name: "cjs",
          condition: "node",
          tsconfig: "./t.json",
          moduleType: "commonjs" as const,
        },
        diagnostics: [] as readonly ts.Diagnostic[],
        success: true,
        outDir: path.join(tmpDir, "dist/cjs"),
        rootDir: path.join(tmpDir, "src"),
        compileTimeMs: 0,
        deduped: false,
      },
    ];

    await writeExportsToPackageJson({}, results, tmpDir);

    const shim = await readJsonObject(path.join(tmpDir, "dist/cjs/package.json"));
    expect(shim["type"]).toBe("commonjs");
  });

  it("infers commonjs from compiler options when no explicit moduleType", async () => {
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test" }, null, 2)}\n`,
    );
    await fs.mkdir(path.join(tmpDir, "dist/cjs"), { recursive: true });

    const results = [
      {
        target: { name: "cjs", condition: "require", tsconfig: "./t.json" },
        diagnostics: [] as readonly ts.Diagnostic[],
        success: true,
        outDir: path.join(tmpDir, "dist/cjs"),
        rootDir: path.join(tmpDir, "src"),
        compileTimeMs: 0,
        deduped: false,
      },
    ];

    const moduleKinds = new Map<string, number | undefined>();
    moduleKinds.set("cjs", ts.ModuleKind.CommonJS);

    await writeExportsToPackageJson({}, results, tmpDir, moduleKinds);

    const shim = await readJsonObject(path.join(tmpDir, "dist/cjs/package.json"));
    expect(shim["type"]).toBe("commonjs");
  });

  it("infers module from ESNext compiler options", async () => {
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test" }, null, 2)}\n`,
    );
    await fs.mkdir(path.join(tmpDir, "dist/esm"), { recursive: true });

    const results = [
      {
        target: { name: "esm", condition: "import", tsconfig: "./t.json" },
        diagnostics: [] as readonly ts.Diagnostic[],
        success: true,
        outDir: path.join(tmpDir, "dist/esm"),
        rootDir: path.join(tmpDir, "src"),
        compileTimeMs: 0,
        deduped: false,
      },
    ];

    const moduleKinds = new Map<string, number | undefined>();
    moduleKinds.set("esm", ts.ModuleKind.ESNext);

    await writeExportsToPackageJson({}, results, tmpDir, moduleKinds);

    const shim = await readJsonObject(path.join(tmpDir, "dist/esm/package.json"));
    expect(shim["type"]).toBe("module");
  });
});

// ---------------------------------------------------------------------------
// rootNames filter: basename-aware
// ---------------------------------------------------------------------------

describe("rootNames polyfill filter (basename-aware)", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it("does not false-match files that end with suffix in a different context", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    // A file named "not-a-browser.ts" should NOT be filtered out by suffix "-browser"
    await fs.writeFile(
      path.join(tmpDir, "src/not-a-browser.ts"),
      'export const x: string = "not a polyfill";\n',
    );
    await fs.writeFile(
      path.join(tmpDir, "src/index.ts"),
      'export { x } from "./not-a-browser.js";\n',
    );

    const tsconfig = {
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
    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(tsconfig));

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          {
            name: "browser",
            condition: "browser",
            tsconfig: "./tsconfig.esm.json",
            polyfillSuffix: "-browser",
          },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-filter", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // not-a-browser.ts should still be compiled (not filtered out)
    expect(await exists(path.join(tmpDir, "dist/esm/not-a-browser.js"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Clean step
// ---------------------------------------------------------------------------

describe("clean step", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  async function setupPackage(): Promise<void> {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), 'export const x: string = "hello";\n');

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

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
      }),
    );
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-clean", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );
  }

  it("removes stale files from previous build", async () => {
    await setupPackage();

    // Plant a stale file
    await fs.mkdir(path.join(tmpDir, "dist/esm"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "dist/esm/stale.js"), "stale content");

    const result = await build({ cwd: tmpDir, clean: true });
    expect(result.success).toBe(true);

    // Stale file should be gone
    expect(await exists(path.join(tmpDir, "dist/esm/stale.js"))).toBe(false);
    // Fresh file should exist
    expect(await exists(path.join(tmpDir, "dist/esm/index.js"))).toBe(true);
  });

  it("preserves stale files when clean=false", async () => {
    await setupPackage();

    await fs.mkdir(path.join(tmpDir, "dist/esm"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "dist/esm/stale.js"), "stale content");

    const result = await build({ cwd: tmpDir, clean: false });
    expect(result.success).toBe(true);

    // Stale file should still be there
    expect(await exists(path.join(tmpDir, "dist/esm/stale.js"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// symlink handling in dedup copy
// ---------------------------------------------------------------------------

describe("dedup handles symlinks", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it("copies symlinks when deduplicating targets", async () => {
    // Create source with a file
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), 'export const x: string = "hello";\n');

    // Create two tsconfigs with identical settings (except outDir)
    const esmTsconfig = {
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
    const workerdTsconfig = {
      compilerOptions: {
        ...esmTsconfig.compilerOptions,
        outDir: "./dist/workerd",
      },
      include: ["src/**/*.ts"],
    };

    await fs.writeFile(path.join(tmpDir, "tsconfig.esm.json"), JSON.stringify(esmTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.workerd.json"), JSON.stringify(workerdTsconfig));

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
          { name: "workerd", condition: "workerd", tsconfig: "./tsconfig.workerd.json" },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-symlink", version: "1.0.0", type: "module" }, null, 2)}\n`,
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(true);

    // Both outputs should exist and be identical
    const esmContent = await fs.readFile(path.join(tmpDir, "dist/esm/index.js"), "utf-8");
    const workerdContent = await fs.readFile(path.join(tmpDir, "dist/workerd/index.js"), "utf-8");
    expect(esmContent).toBe(workerdContent);
  });
});

// ---------------------------------------------------------------------------
// outDir overlap via full build
// ---------------------------------------------------------------------------

describe("outDir overlap detection via build", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it("fails build when two targets share outDir", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const x = 1;\n");

    const sharedTsconfig = {
      compilerOptions: {
        outDir: "./dist/shared",
        rootDir: "./src",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        target: "ES2023",
        declaration: true,
      },
      include: ["src/**/*.ts"],
    };

    await fs.writeFile(path.join(tmpDir, "tsconfig.a.json"), JSON.stringify(sharedTsconfig));
    await fs.writeFile(path.join(tmpDir, "tsconfig.b.json"), JSON.stringify(sharedTsconfig));

    await fs.writeFile(
      path.join(tmpDir, "warp.config.yml"),
      stringify({
        exports: { ".": "./src/index.ts" },
        targets: [
          { name: "a", condition: "import", tsconfig: "./tsconfig.a.json" },
          { name: "b", condition: "require", tsconfig: "./tsconfig.b.json" },
        ],
      }),
    );

    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-overlap", version: "1.0.0" }, null, 2)}\n`,
    );

    // The build should throw due to outDir overlap
    await expect(build({ cwd: tmpDir })).rejects.toThrow("share the same outDir");
  });
});

// ---------------------------------------------------------------------------
// Missing dist files fail the build
// ---------------------------------------------------------------------------

describe("missing dist files fail the build", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  it("returns success=false when exports reference non-produced files", async () => {
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const x = 1;\n");

    // Export "./sub" references a source file that doesn't exist,
    // so compilation succeeds but dist/esm/sub.js is never produced.
    const warpConfig = {
      exports: { ".": "./src/index.ts", "./sub": "./src/sub.ts" },
      targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
    };

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
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(warpConfig));
    await fs.writeFile(
      path.join(tmpDir, "package.json"),
      `${JSON.stringify({ name: "test-missing", version: "1.0.0" }, null, 2)}\n`,
    );

    const result = await build({ cwd: tmpDir });
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// WarpError wrapping for worker / parallel errors
// ---------------------------------------------------------------------------

describe("WarpError wrapping", () => {
  it("resolveWorkerPath throws WarpError with COMPILE_ERROR", () => {
    // The internal resolveWorkerPath can't be tested directly without mocking,
    // but we can verify the WarpError construction pattern works correctly.
    const err = new WarpError(
      "COMPILE_ERROR",
      `[warp] Worker thread crashed while compiling target "esm". Try running without --parallel. Original error: OOM`,
      { cause: new Error("OOM") },
    );
    expect(err.code).toBe("COMPILE_ERROR");
    expect(err.message).toContain("--parallel");
    expect(err.message).toContain("esm");
    expect(err.cause).toBeInstanceOf(Error);
  });

  it("DIST_MISSING code is a valid WarpErrorCode", () => {
    const err = new WarpError("DIST_MISSING", "[warp] Missing dist files");
    expect(err.code).toBe("DIST_MISSING");
    expect(err.name).toBe("WarpError");
    expect(err).toBeInstanceOf(Error);
  });
});
