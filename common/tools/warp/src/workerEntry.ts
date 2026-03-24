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
  createCachedHost,
  compileTarget,
  transpileFiles,
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
      const result = await runCompilation(msg);
      port.postMessage(result);
    })();
  }
});

async function runCompilation(msg: CompileMessage): Promise<ResultMessage> {
  const parsed = parseTargetTsConfig(msg.target, msg.packageRoot);
  const cache = workerCache;

  const host = createCachedHost(parsed.parsedConfig.options, cache);

  // Fast path: transpileFiles bypasses ts.createProgram entirely for
  // targets that skip type-checking and declarations (~3-10× faster).
  let result;
  if (!msg.typeCheck && msg.skipDeclarations) {
    result = await transpileFiles(parsed);
  } else {
    result = compileTarget(parsed, host, {
      typeCheck: msg.typeCheck,
      skipDeclarations: msg.skipDeclarations,
    });
  }

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
