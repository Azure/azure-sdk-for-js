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
import * as ts from "typescript";
import {
  parseTargetTsConfig,
  discoverPolyfills,
  createPolyfillHost,
  createCachedHost,
  compileTarget,
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
  skipEmit?: boolean;
  /** @deprecated Use skipEmit instead. Removed in a later commit. */
  skipDeclarations?: boolean;
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

port.on("message", (msg: CompileMessage) => {
  if (msg.type === "compile") {
    void (async () => {
      try {
        const result = await runCompilation(msg);
        port.postMessage(result);
      } catch (err) {
        const errorText = err instanceof Error ? (err.stack ?? err.message) : String(err);
        port.postMessage({
          type: "result",
          targetName: msg.target.name,
          success: false,
          diagnosticText: `Worker crash: ${errorText}`,
          errorCount: 1,
          timeMs: 0,
          outDir: msg.target.tsconfig,
        } satisfies ResultMessage);
      }
    })();
  }
});

async function runCompilation(msg: CompileMessage): Promise<ResultMessage> {
  const parsed = parseTargetTsConfig(msg.target, msg.packageRoot);
  const cache = workerCache;
  const suffix = msg.target.polyfillSuffix;

  let host: ts.CompilerHost;
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
      ({ host } = createPolyfillHost(parsed.parsedConfig.options, polyfillMap, cache));
    } else {
      host = createCachedHost(parsed.parsedConfig.options, cache);
    }
  } else {
    host = createCachedHost(parsed.parsedConfig.options, cache);
  }

  const result = await compileTarget(parsed, host, {
    typeCheck: msg.typeCheck,
    skipEmit: msg.skipEmit,
    skipDeclarations: msg.skipDeclarations,
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
