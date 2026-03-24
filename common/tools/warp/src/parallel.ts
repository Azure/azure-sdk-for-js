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
  optionsSignature,
  programIdentity,
  cleanOutDir,
  copyDir,
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
 * Task graph: each target becomes one task. Targets that can reuse output
 * depend on the emitting target. Pure copies are deferred to after the
 * emitter completes (no worker needed).
 */
export async function compileAllTargetsParallel(
  parsedConfigs: ParsedTargetConfig[],
  options: { clean?: boolean; packageRoot: string },
  pool?: WorkerPool,
): Promise<CompileResult[]> {
  const { clean = true, packageRoot } = options;

  validateOutDirs(parsedConfigs);

  const log = getLogger();

  // Clean outDirs before compilation.
  if (clean) {
    await Promise.all(parsedConfigs.map((pc) => cleanOutDir(pc.outDir)));
  }

  // Two-dimensional deduplication (same as sequential path).
  const emittedPrograms = new Map<string, { outDir: string; taskId: string }>();
  const typeCheckedIds = new Set<string>();

  const tasks: ScheduledTask<CompileResult>[] = [];
  const deferredCopies: Array<{
    parsed: ParsedTargetConfig;
    sourceOutDir: string;
    afterTask: string;
  }> = [];

  // Size pool to actual compilation count (targets that need a worker).
  let compilationCount = 0;
  // Pre-scan to count compilations
  for (const parsed of parsedConfigs) {
    const typeCheckId = optionsSignature(parsed.parsedConfig.options, parsed.parsedConfig.fileNames);
    const emitId = programIdentity(
      parsed.parsedConfig.options,
      parsed.parsedConfig.fileNames,
      parsed.resolvedImports,
    );
    const canReuse = emittedPrograms.has(emitId);
    const needsTC = !typeCheckedIds.has(typeCheckId);
    if (!(canReuse && !needsTC)) compilationCount++;
    if (needsTC) typeCheckedIds.add(typeCheckId);
    if (!canReuse) emittedPrograms.set(emitId, { outDir: parsed.outDir, taskId: `compile:${parsed.target.name}` });
  }

  // Reset for the real pass
  emittedPrograms.clear();
  typeCheckedIds.clear();

  const poolCreating = pool ? undefined : createWorkerPool(compilationCount);
  const activePool = pool ?? (await poolCreating!);
  const ownsPool = !pool;

  for (const parsed of parsedConfigs) {
    const typeCheckId = optionsSignature(parsed.parsedConfig.options, parsed.parsedConfig.fileNames);
    const emitId = programIdentity(
      parsed.parsedConfig.options,
      parsed.parsedConfig.fileNames,
      parsed.resolvedImports,
    );

    const alreadyEmitted = emittedPrograms.get(emitId);
    const canReuseOutput = !!alreadyEmitted;
    const needsTypeCheck = !typeCheckedIds.has(typeCheckId);

    const taskId = `compile:${parsed.target.name}`;

    if (needsTypeCheck) typeCheckedIds.add(typeCheckId);
    if (!canReuseOutput) emittedPrograms.set(emitId, { outDir: parsed.outDir, taskId });

    if (canReuseOutput && !needsTypeCheck) {
      // Pure copy — no worker needed, just copyDir after emitter finishes.
      deferredCopies.push({
        parsed,
        sourceOutDir: alreadyEmitted!.outDir,
        afterTask: alreadyEmitted!.taskId,
      });
      continue;
    }

    const deps: string[] = canReuseOutput ? [alreadyEmitted!.taskId] : [];

    tasks.push({
      id: taskId,
      deps,
      execute: async (): Promise<CompileResult> => {
        const label: string[] = [];
        if (!needsTypeCheck) label.push("skip-typecheck");
        if (canReuseOutput) label.push("reuse-output");
        if (label.length > 0) {
          log.info(`[warp] [${parsed.target.name}] ${label.join(", ")}`);
        }

        const workerResult = await activePool.compile({
          type: "compile",
          packageRoot,
          target: parsed.target,
          typeCheck: needsTypeCheck,
          skipEmit: canReuseOutput,
        });

        if (workerResult.diagnosticText) {
          log.info(workerResult.diagnosticText);
        }

        const result: CompileResult = {
          target: parsed.target,
          diagnostics: [],
          diagnosticText: workerResult.diagnosticText || undefined,
          success: workerResult.success,
          outDir: parsed.outDir,
          rootDir: parsed.rootDir,
          compileTimeMs: workerResult.timeMs,
          deduped: false,
        };

        // If we reused output (type-check only), copy from the emitter.
        if (canReuseOutput && alreadyEmitted && result.success) {
          await copyDir(alreadyEmitted.outDir, parsed.outDir);
        }

        return result;
      },
    });
  }

  let taskResults: Map<string, CompileResult>;
  try {
    await activePool.waitReady();
    log.info(`[warp] Parallel: ${activePool.size} worker(s), ${tasks.length} compilation task(s)`);
    taskResults = await executeTaskGraph(tasks);
  } finally {
    if (ownsPool) {
      activePool.terminate();
    }
  }

  // Run deferred copies for pure-copy targets.
  const allSucceeded = [...taskResults.values()].every((r) => r.success);
  if (allSucceeded && deferredCopies.length > 0) {
    await Promise.all(
      deferredCopies.map(({ sourceOutDir, parsed: p }) => copyDir(sourceOutDir, p.outDir)),
    );
  }

  // Build result map and log progress.
  const total = parsedConfigs.length;
  let count = 0;
  const resultMap = new Map<string, CompileResult>();

  for (const r of taskResults.values()) {
    count++;
    const label = r.deduped ? "copied" : "done";
    log.info(`[warp] [${count}/${total}] ${r.target.name} ${label} (${r.compileTimeMs.toFixed(0)}ms)`);
    resultMap.set(r.target.name, r);
  }

  for (const { parsed: p } of deferredCopies) {
    count++;
    log.info(`[warp] [${count}/${total}] ${p.target.name} copied (deferred)`);
    resultMap.set(p.target.name, {
      target: p.target,
      diagnostics: [],
      success: allSucceeded,
      outDir: p.outDir,
      rootDir: p.rootDir,
      compileTimeMs: 0,
      deduped: true,
    });
  }

  // Return results in original target declaration order
  return parsedConfigs.map((pc) => resultMap.get(pc.target.name)!);
}
