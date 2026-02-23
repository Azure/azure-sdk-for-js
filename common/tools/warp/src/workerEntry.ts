// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Worker thread entry point for parallel compilation.
 *
 * Each worker pre-loads TypeScript on startup, signals readiness,
 * then processes compile tasks received via message passing.
 * This amortizes the ~300ms TypeScript load cost across multiple tasks.
 */
import { parentPort } from "node:worker_threads";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import * as ts from "typescript";
import {
  parseTargetTsConfig,
  discoverPolyfills,
  createPolyfillHost,
  createCachedHost,
  compileTarget,
  resolveBuildInfoPath,
  SharedSourceFileCache,
} from "./compiler.ts";
import { formatSingleDiagnostic } from "./diagnostics.ts";
import type { WarpTarget } from "./types.ts";

/** Message sent from pool to worker. */
export interface CompileMessage {
  type: "compile";
  packageRoot: string;
  target: WarpTarget;
  typeCheck: boolean;
  skipDeclarations: boolean;
  incremental: boolean;
  /**
   * Pre-discovered polyfill map entries (original → polyfill path pairs).
   * When provided, the worker skips filesystem-based polyfill discovery.
   */
  polyfillEntries?: [string, string][];
}

/** Message sent from worker to pool. */
export interface ResultMessage {
  type: "result";
  targetName: string;
  success: boolean;
  diagnosticText: string;
  errorCount: number;
  timeMs: number;
  outDir: string;
}

/** Readiness signal sent once TypeScript is loaded. */
export interface ReadyMessage {
  type: "ready";
}

const port = parentPort!;

// Reuse a single SourceFile cache across all compilation tasks within this
// worker. Previously a fresh cache was created per task, discarding parsed
// SourceFiles that later targets could reuse (same lib files, shared sources).
const workerCache = new SharedSourceFileCache();

// Signal that TypeScript module is loaded and worker is ready for tasks.
port.postMessage({ type: "ready" } satisfies ReadyMessage);

port.on("message", async (msg: CompileMessage) => {
  if (msg.type === "compile") {
    const result = await runCompilation(msg);
    port.postMessage(result);
  }
});

async function runCompilation(msg: CompileMessage): Promise<ResultMessage> {
  const parsed = parseTargetTsConfig(msg.target, msg.packageRoot);
  const cache = workerCache;
  const suffix = msg.target.polyfillSuffix;

  let host: ts.CompilerHost;
  let hasPolyfills = false;
  if (suffix) {
    // Use pre-discovered polyfill map from main thread when available,
    // avoiding redundant readdir I/O in each worker.
    let polyfillMap: Map<string, string>;
    if (msg.polyfillEntries && msg.polyfillEntries.length > 0) {
      polyfillMap = new Map(msg.polyfillEntries);
    } else if (msg.polyfillEntries) {
      // Explicitly empty — main thread found no polyfills
      polyfillMap = new Map();
    } else {
      // Fallback: discover polyfills (backwards compat)
      polyfillMap = await discoverPolyfills(parsed.parsedConfig.fileNames, suffix);
    }
    if (polyfillMap.size > 0) {
      hasPolyfills = true;
      ({ host } = createPolyfillHost(parsed.parsedConfig.options, polyfillMap, cache));
    } else {
      host = createCachedHost(parsed.parsedConfig.options, cache);
    }
  } else {
    host = createCachedHost(parsed.parsedConfig.options, cache);
  }

  const useIncremental = msg.incremental && !hasPolyfills;

  // Ensure the cache directory for .tsbuildinfo exists before compilation
  if (useIncremental) {
    const buildInfoPath = resolveBuildInfoPath(msg.target.name, msg.packageRoot);
    await fsp.mkdir(path.dirname(buildInfoPath), { recursive: true });
  }

  const result = compileTarget(parsed, host, {
    typeCheck: msg.typeCheck,
    skipDeclarations: msg.skipDeclarations,
    incremental: useIncremental,
    packageRoot: msg.packageRoot,
  });

  let diagnosticText = "";
  if (result.diagnostics.length > 0) {
    const prefix = `[${msg.target.name}]`;
    diagnosticText = result.diagnostics.map((d) => formatSingleDiagnostic(d, prefix)).join("\n");
  }

  return {
    type: "result",
    targetName: msg.target.name,
    success: result.success,
    diagnosticText,
    errorCount: result.diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error).length,
    timeMs: result.compileTimeMs,
    outDir: result.outDir,
  };
}
