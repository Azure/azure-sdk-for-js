// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Parallel compilation using worker threads.
 *
 * Architecture:
 * - WorkerPool: pre-starts N workers that each load TypeScript once (~300ms),
 *   then stay alive to process multiple compile tasks via message passing.
 * - executeTaskGraph: generic DAG scheduler that runs tasks respecting
 *   dependency edges, with unbounded concurrency (limited by pool size).
 * - compileAllTargetsParallel: builds the task graph from dedup groups
 *   and source identities, dispatches compilations to workers, handles
 *   .d.ts copying and dedup copying on the main thread.
 */
import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import * as fsp from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import type { CompileResult, ParsedTargetConfig } from "./compiler.ts";
import {
  validateOutDirs,
  groupBySignature,
  sourceIdentity,
  discoverPolyfills,
  cleanOutDir,
  copyDir,
  copyDtsFiles,
} from "./compiler.ts";
import { getLogger } from "./logger.ts";
import { WarpError } from "./types.ts";
import type { CompileMessage, ResultMessage, ReadyMessage } from "./workerEntry.ts";

// Resolve worker entry point. First try the compiled .js alongside this file
// (works when running from dist/ directly). Then try workerBoot.js at the
// package root, which registers tsx and loads workerEntry.ts from source
// (works when running via tsx from src/). Fall back to dist/ from the package
// root (#20).
const thisFile = fileURLToPath(import.meta.url);
const thisDir = path.dirname(thisFile);
const siblingWorker = path.join(thisDir, "workerEntry.js");
const packageDir = path.resolve(thisDir, "..");
const bootWorker = path.join(packageDir, "workerBoot.js");
const distWorker = path.join(packageDir, "dist", "workerEntry.js");

let cachedWorkerPath: string | undefined;

async function resolveWorkerPath(): Promise<string> {
  if (cachedWorkerPath) return cachedWorkerPath;
  // Probe all candidate paths in parallel to avoid sequential filesystem
  // round-trips (~3× faster when the first candidates don't exist).
  const candidates = [siblingWorker, bootWorker, distWorker];
  const results = await Promise.allSettled(candidates.map((p) => fsp.access(p).then(() => p)));
  for (const result of results) {
    if (result.status === "fulfilled") {
      cachedWorkerPath = result.value;
      return result.value;
    }
  }
  throw new WarpError(
    "COMPILE_ERROR",
    `[warp] Failed to resolve worker entry point. Looked for:\n- ${siblingWorker}\n- ${bootWorker}\n- ${distWorker}`,
  );
}

// ---------------------------------------------------------------------------
// Worker pool
// ---------------------------------------------------------------------------

interface PoolWorker {
  worker: Worker;
  resolve?: (result: ResultMessage) => void;
  reject?: (err: Error) => void;
  /** Name of the target being compiled, for error context. */
  activeTarget?: string;
  /** Set once the worker has been handled by the death handler (deduplicates error+exit). */
  dead?: boolean;
}

interface PendingTask {
  message: CompileMessage;
  resolve: (result: ResultMessage) => void;
  reject: (err: Error) => void;
}

export class WorkerPool {
  private workers: PoolWorker[] = [];
  private idle: PoolWorker[] = [];
  private pending: PendingTask[] = [];
  private readyCount = 0;
  private expectedSize: number;
  private readyResolve?: () => void;
  private readyReject?: (err: Error) => void;
  private _readyPromise: Promise<void>;
  private _terminated = false;

  constructor(workerPath: string, size: number) {
    this.expectedSize = size;
    this._readyPromise = new Promise<void>((resolve, reject) => {
      this.readyResolve = resolve;
      this.readyReject = reject;
    });

    for (let i = 0; i < size; i++) {
      const w = new Worker(workerPath);
      const pw: PoolWorker = { worker: w };
      this.workers.push(pw);

      w.on("message", (msg: ReadyMessage | ResultMessage) => {
        if (msg.type === "ready") {
          this.readyCount++;
          this.idle.push(pw);
          if (this.readyCount === this.expectedSize) {
            this.readyResolve?.();
          }
          this.dispatch();
        } else if (msg.type === "result") {
          pw.resolve?.(msg);
          pw.resolve = undefined;
          pw.reject = undefined;
          pw.activeTarget = undefined;
          this.idle.push(pw);
          this.dispatch();
        }
      });

      w.on("error", (err) => {
        this.handleWorkerDeath(pw, err);
      });

      w.on("exit", (code) => {
        if (code !== 0 && !this._terminated) {
          this.handleWorkerDeath(pw, new Error(`Worker exited with code ${code}`));
        }
      });
    }
  }

  /**
   * Centralized handler for worker death — called from both the `error` and
   * `exit` events.  The `dead` flag on each PoolWorker deduplicates the two
   * events that Node fires for an uncaught exception (error then exit).
   */
  private handleWorkerDeath(pw: PoolWorker, err: Error): void {
    if (pw.dead) return;
    pw.dead = true;

    // Reject the current task if any (#8)
    if (pw.reject) {
      const targetCtx = pw.activeTarget ? ` while compiling target "${pw.activeTarget}"` : "";
      pw.reject(
        new WarpError(
          "COMPILE_ERROR",
          `[warp] Worker thread crashed${targetCtx}. ` +
            `Try running without --parallel. Original error: ${err.message}`,
          { cause: err },
        ),
      );
      pw.resolve = undefined;
      pw.reject = undefined;
      pw.activeTarget = undefined;
    }

    // Remove the dead worker from the pool — it won't accept new tasks
    this.workers = this.workers.filter((p) => p !== pw);
    this.idle = this.idle.filter((p) => p !== pw);

    // If the pool hasn't finished starting up, fail fast.  A dead worker
    // during startup almost always indicates a fundamental problem (broken
    // script, OOM, etc.) and we must not hang waiting for a ready count
    // that can never be reached.
    if (this.readyCount < this.expectedSize) {
      this.readyReject?.(
        new WarpError("COMPILE_ERROR", `[warp] Worker failed during pool startup: ${err.message}`, {
          cause: err,
        }),
      );
    }

    // If all workers are dead and there are pending tasks, reject them so
    // their promises don't hang forever.
    if (this.workers.length === 0 && this.pending.length > 0) {
      const pendingErr = new WarpError(
        "COMPILE_ERROR",
        `[warp] All worker threads have died. ${this.pending.length} compilation task(s) abandoned: ${err.message}`,
        { cause: err },
      );
      for (const task of this.pending) {
        task.reject(pendingErr);
      }
      this.pending = [];
    }
  }

  /** Wait for all workers to finish loading TypeScript and signal ready. */
  async waitReady(): Promise<void> {
    return this._readyPromise;
  }

  /** Submit a compilation task to the pool. Rejects immediately if the pool is terminated. */
  compile(message: CompileMessage): Promise<ResultMessage> {
    if (this._terminated) {
      return Promise.reject(
        new WarpError(
          "COMPILE_ERROR",
          `[warp] Cannot submit task "${message.target.name}" — worker pool is terminated.`,
        ),
      );
    }
    return new Promise<ResultMessage>((resolve, reject) => {
      this.pending.push({ message, resolve, reject });
      this.dispatch();
    });
  }

  private dispatch(): void {
    while (this.idle.length > 0 && this.pending.length > 0) {
      const pw = this.idle.shift()!;
      const task = this.pending.shift()!;
      pw.resolve = task.resolve;
      pw.reject = task.reject;
      pw.activeTarget = task.message.target.name;
      pw.worker.postMessage(task.message);
    }
  }

  /** Terminate all workers. Rejects any pending and in-flight tasks. */
  terminate(): void {
    this._terminated = true;
    // Reject in-flight tasks (active on a worker) before terminating
    const terminateErr = new WarpError("COMPILE_ERROR", `[warp] Worker pool terminated.`);
    for (const pw of this.workers) {
      if (pw.reject) {
        pw.reject(terminateErr);
        pw.resolve = undefined;
        pw.reject = undefined;
        pw.activeTarget = undefined;
      }
      void pw.worker.terminate();
    }
    this.workers = [];
    this.idle = [];
    // Reject any pending (queued but not dispatched) tasks
    if (this.pending.length > 0) {
      const err = new WarpError(
        "COMPILE_ERROR",
        `[warp] Worker pool terminated with ${this.pending.length} task(s) still pending.`,
      );
      for (const task of this.pending) {
        task.reject(err);
      }
      this.pending = [];
    }
  }

  get size(): number {
    return this.workers.length;
  }
}

/**
 * Create a worker pool sized for the workload.
 * Workers = min(cpuCount, compilationCount), at least 1.
 */
export async function createWorkerPool(compilationCount: number): Promise<WorkerPool> {
  const cpus = os.cpus().length;
  const size = Math.max(1, Math.min(cpus, compilationCount));
  const workerPath = await resolveWorkerPath();
  return new WorkerPool(workerPath, size);
}

// ---------------------------------------------------------------------------
// DAG task scheduler
// ---------------------------------------------------------------------------

export interface ScheduledTask<T> {
  id: string;
  deps: string[];
  execute: () => Promise<T>;
}

/**
 * Execute a DAG of tasks. A task runs as soon as all its dependencies
 * have completed. Concurrency is unbounded (limited by pool externally).
 *
 * Pre-validates the graph for cycles (#9) — throws immediately on detection.
 */
export async function executeTaskGraph<T>(tasks: ScheduledTask<T>[]): Promise<Map<string, T>> {
  const results = new Map<string, T>();
  const remaining = new Map(tasks.map((t) => [t.id, t]));

  if (remaining.size === 0) return results;

  // Cycle detection via Kahn's algorithm (#9)
  // Build a forward adjacency map for O(V+E) traversal instead of
  // scanning all tasks on every dequeue (which was O(V×E)).
  const inDegree = new Map<string, number>();
  const taskIds = new Set(tasks.map((t) => t.id));
  const dependents = new Map<string, string[]>(); // dep → [tasks that depend on it]
  for (const t of tasks) {
    const validDeps = t.deps.filter((d) => taskIds.has(d));
    inDegree.set(t.id, validDeps.length);
    for (const d of validDeps) {
      let list = dependents.get(d);
      if (!list) {
        list = [];
        dependents.set(d, list);
      }
      list.push(t.id);
    }
  }
  // Use an index pointer instead of queue.shift() to avoid O(N) array
  // shifts on each dequeue — makes Kahn's traversal truly O(V+E).
  const queue: string[] = [];
  for (const [id, deg] of inDegree) {
    if (deg === 0) queue.push(id);
  }
  let queueIdx = 0;
  let visited = 0;
  while (queueIdx < queue.length) {
    const id = queue[queueIdx++];
    visited++;
    const deps = dependents.get(id);
    if (deps) {
      for (const depId of deps) {
        const newDeg = inDegree.get(depId)! - 1;
        inDegree.set(depId, newDeg);
        if (newDeg === 0) queue.push(depId);
      }
    }
  }
  if (visited !== tasks.length) {
    const stuck = tasks.filter((t) => inDegree.get(t.id)! > 0).map((t) => t.id);
    throw new WarpError(
      "COMPILE_ERROR",
      `[warp] Task graph cycle detected among: ${stuck.join(", ")}`,
    );
  }

  // Reuse the dependents map and in-degree counts for runtime scheduling.
  // Instead of scanning all remaining tasks on every completion (O(V²)),
  // only wake tasks whose in-degree just reached zero — O(V+E) total.
  const rtInDegree = new Map<string, number>();
  for (const t of tasks) {
    rtInDegree.set(t.id, t.deps.filter((d) => taskIds.has(d)).length);
  }

  return new Promise<Map<string, T>>((resolve, reject) => {
    let running = 0;
    let settled = false;

    function launch(id: string): void {
      const task = remaining.get(id);
      if (!task || settled) return;
      remaining.delete(id);
      running++;
      task
        .execute()
        .then((result) => {
          results.set(id, result);
          running--;
          if (settled) return;
          // Wake only direct dependents whose in-degree just hit zero
          const deps = dependents.get(id);
          if (deps) {
            for (const depId of deps) {
              const newDeg = rtInDegree.get(depId)! - 1;
              rtInDegree.set(depId, newDeg);
              if (newDeg === 0) launch(depId);
            }
          }
          if (remaining.size === 0 && running === 0) {
            settled = true;
            resolve(results);
          }
        })
        .catch((err) => {
          if (!settled) {
            settled = true;
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        });
    }

    // Seed: launch all tasks with zero in-degree
    for (const [id, deg] of rtInDegree) {
      if (deg === 0) launch(id);
    }
    // Edge case: no tasks at all
    if (remaining.size === 0 && running === 0 && !settled) {
      settled = true;
      resolve(results);
    }
  });
}

// ---------------------------------------------------------------------------
// Parallel compilation orchestrator
// ---------------------------------------------------------------------------

/**
 * Compile all targets in parallel using a worker pool.
 *
 * The task graph is:
 * - Primary targets from different source groups run in parallel.
 * - Secondary targets (skip-typecheck, skip-dts) depend on their
 *   source group's primary for .d.ts files.
 * - Dedup copy targets depend on their group's primary.
 */
export async function compileAllTargetsParallel(
  parsedConfigs: ParsedTargetConfig[],
  options: { clean?: boolean; packageRoot: string },
  pool?: WorkerPool,
): Promise<CompileResult[]> {
  const { clean = true, packageRoot } = options;

  validateOutDirs(parsedConfigs);

  const log = getLogger();

  const polyfillResults = new Map<string, Map<string, string>>();

  // Discover polyfills and clean outDirs first — we need polyfill results
  // to compute dedup groups, which determines worker pool size.
  const initTasks: Promise<void>[] = [];

  initTasks.push(
    Promise.all(
      parsedConfigs.map(async (pc) => {
        const suffix = pc.target.polyfillSuffix;
        if (suffix) {
          const map = await discoverPolyfills(pc.parsedConfig.fileNames, suffix);
          polyfillResults.set(pc.target.name, map);
        }
      }),
    ).then(() => {}),
  );

  if (clean) {
    const cleanOps = parsedConfigs.map((pc) => cleanOutDir(pc.outDir));
    initTasks.push(Promise.all(cleanOps).then(() => {}));
  }

  await Promise.all(initTasks);

  const getEffectiveSuffix = (pc: ParsedTargetConfig): string | undefined => {
    const map = polyfillResults.get(pc.target.name);
    return map && map.size > 0 ? pc.target.polyfillSuffix : undefined;
  };

  const groups = groupBySignature(parsedConfigs, getEffectiveSuffix);
  const dedupCount = parsedConfigs.length - groups.length;
  if (dedupCount > 0) {
    log.info(`[warp] Dedup: ${groups.length} unique compilation(s), ${dedupCount} copied`);
  }

  const typeCheckedSources = new Map<string, { outDir: string; taskId: string }>();
  const tasks: ScheduledTask<CompileResult[]>[] = [];

  // Size the worker pool to the actual number of compilation tasks (after
  // dedup), not the raw target count.  This avoids spawning idle workers
  // that each spend ~300-600ms loading TypeScript for nothing.
  const compilationCount = groups.length;
  const poolCreating = pool ? undefined : createWorkerPool(compilationCount);
  const activePool = pool ?? (await poolCreating!);
  const ownsPool = !pool;

  // Track deferred .d.ts copy operations. When a secondary group uses the
  // transpileFiles fast path (skip-typecheck + skip-dts), its compilation
  // is independent of the primary. The .d.ts copy is deferred to after all
  // compilations complete, enabling true parallelism.
  const deferredDtsCopies: Array<{ sourceOutDir: string; targetOutDir: string }> = [];

  for (const group of groups) {
    const suffix = group.primary.target.polyfillSuffix;
    const effSuffix = getEffectiveSuffix(group.primary);
    const srcId = sourceIdentity(group.primary.parsedConfig.fileNames, effSuffix);
    const alreadyChecked = typeCheckedSources.get(srcId);
    const needsTypeCheck = !alreadyChecked;
    const canSkipDeclarations = !!alreadyChecked;
    const primaryTaskId = `compile:${group.primary.target.name}`;

    if (needsTypeCheck) {
      typeCheckedSources.set(srcId, { outDir: group.primary.outDir, taskId: primaryTaskId });
    }

    // Secondary groups (skip-typecheck + skip-dts) use transpileFiles which
    // is fully independent of the primary — no dependency needed. The .d.ts
    // copy is deferred to run after all compilations complete.
    const deps: string[] = [];
    if (canSkipDeclarations && alreadyChecked) {
      deferredDtsCopies.push({
        sourceOutDir: alreadyChecked.outDir,
        targetOutDir: group.primary.outDir,
      });
    }

    const primaryConfig = group.primary;
    const copies = group.copies;

    tasks.push({
      id: primaryTaskId,
      deps,
      execute: async (): Promise<CompileResult[]> => {
        const label: string[] = [];
        if (!needsTypeCheck) label.push("skip-typecheck");
        if (canSkipDeclarations) label.push("skip-dts");

        const polyfillMap = polyfillResults.get(primaryConfig.target.name);
        const hasPolyfills = polyfillMap != null && polyfillMap.size > 0;
        if (hasPolyfills) {
          label.push(`${polyfillMap.size} polyfill(s) via "${suffix}"`);
        }
        if (label.length > 0) {
          log.info(`[warp] [${primaryConfig.target.name}] ${label.join(", ")}`);
        }

        const polyfillEntries = polyfillMap ? [...polyfillMap.entries()] : undefined;
        const workerResult = await activePool.compile({
          type: "compile",
          packageRoot,
          target: primaryConfig.target,
          typeCheck: needsTypeCheck,
          skipDeclarations: canSkipDeclarations,
          polyfillEntries,
        });

        if (workerResult.diagnosticText) {
          log.info(workerResult.diagnosticText);
        }

        const primaryResult: CompileResult = {
          target: primaryConfig.target,
          diagnostics: [],
          diagnosticText: workerResult.diagnosticText || undefined,
          success: workerResult.success,
          outDir: primaryConfig.outDir,
          rootDir: primaryConfig.rootDir,
          compileTimeMs: workerResult.timeMs,
          deduped: false,
        };

        const results: CompileResult[] = [primaryResult];
        if (copies.length > 0) {
          const copyResults = await Promise.all(
            copies.map(async (copy) => {
              const t0 = performance.now();
              if (primaryResult.success) {
                await copyDir(primaryConfig.outDir, copy.outDir);
              }
              return {
                target: copy.target,
                diagnostics: [] as readonly import("typescript").Diagnostic[],
                success: primaryResult.success,
                outDir: copy.outDir,
                rootDir: copy.rootDir,
                compileTimeMs: performance.now() - t0,
                deduped: true,
              } satisfies CompileResult;
            }),
          );
          results.push(...copyResults);
        }

        return results;
      },
    });
  }

  let taskResults: Map<string, CompileResult[]>;
  try {
    await activePool.waitReady();
    log.info(`[warp] Parallel: ${activePool.size} worker(s), ${tasks.length} compilation task(s)`);
    taskResults = await executeTaskGraph(tasks);
  } finally {
    if (ownsPool) {
      activePool.terminate();
    }
  }

  // Run deferred .d.ts copy operations now that all compilations are done.
  // This was deferred so that transpileFiles targets could run in parallel
  // with the primary compilation that produces the .d.ts files.
  const allSucceeded = [...taskResults.values()].every((batch) => batch.every((r) => r.success));
  if (allSucceeded && deferredDtsCopies.length > 0) {
    await Promise.all(
      deferredDtsCopies.map(({ sourceOutDir, targetOutDir }) =>
        copyDtsFiles(sourceOutDir, targetOutDir),
      ),
    );
  }

  const totalTargets = parsedConfigs.length;
  let completedCount = 0;
  const resultMap = new Map<string, CompileResult>();
  for (const batch of taskResults.values()) {
    for (const r of batch) {
      completedCount++;
      const label = r.deduped ? "copied" : "done";
      log.info(
        `[warp] [${completedCount}/${totalTargets}] ${r.target.name} ${label} (${r.compileTimeMs.toFixed(0)}ms)`,
      );
      resultMap.set(r.target.name, r);
    }
  }

  return parsedConfigs.map((pc) => resultMap.get(pc.target.name)!);
}
