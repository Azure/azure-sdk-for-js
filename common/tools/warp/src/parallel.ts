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
  cleanOutDir,
  copyDir,
  copyDtsFiles,
} from "./compiler.ts";
import { getLogger } from "./logger.ts";
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

async function resolveWorkerPath(): Promise<string> {
  for (const p of [siblingWorker, bootWorker, distWorker]) {
    try {
      await fsp.access(p);
      return p;
    } catch {
      // not found — try next
    }
  }
  throw new Error(
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
          this.idle.push(pw);
          this.dispatch();
        }
      });

      w.on("error", (err) => {
        // Reject the current task if any (#8)
        if (pw.reject) {
          pw.reject(err);
          pw.resolve = undefined;
          pw.reject = undefined;
        }
        // Remove the dead worker from the pool — it won't accept new tasks
        this.workers = this.workers.filter((p) => p !== pw);
        this.idle = this.idle.filter((p) => p !== pw);
        // If all workers are gone before the pool is ready, reject the promise
        // so waitReady() doesn't hang forever.
        if (this.workers.length === 0 && this.readyCount < this.expectedSize) {
          this.readyReject?.(
            new Error(`[warp] All ${this.expectedSize} worker(s) failed to start: ${err.message}`),
          );
        }
      });
    }
  }

  /** Wait for all workers to finish loading TypeScript and signal ready. */
  async waitReady(): Promise<void> {
    return this._readyPromise;
  }

  /** Submit a compilation task to the pool. */
  compile(message: CompileMessage): Promise<ResultMessage> {
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
      pw.worker.postMessage(task.message);
    }
  }

  /** Terminate all workers. */
  terminate(): void {
    for (const pw of this.workers) {
      pw.worker.terminate();
    }
    this.workers = [];
    this.idle = [];
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

interface ScheduledTask<T> {
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
async function executeTaskGraph<T>(tasks: ScheduledTask<T>[]): Promise<Map<string, T>> {
  const results = new Map<string, T>();
  const remaining = new Map(tasks.map((t) => [t.id, t]));

  if (remaining.size === 0) return results;

  // Cycle detection via Kahn's algorithm (#9)
  const inDegree = new Map<string, number>();
  const taskIds = new Set(tasks.map((t) => t.id));
  for (const t of tasks) {
    inDegree.set(t.id, t.deps.filter((d) => taskIds.has(d)).length);
  }
  const queue: string[] = [];
  for (const [id, deg] of inDegree) {
    if (deg === 0) queue.push(id);
  }
  let visited = 0;
  while (queue.length > 0) {
    const id = queue.shift()!;
    visited++;
    for (const t of tasks) {
      if (t.deps.includes(id)) {
        const newDeg = inDegree.get(t.id)! - 1;
        inDegree.set(t.id, newDeg);
        if (newDeg === 0) queue.push(t.id);
      }
    }
  }
  if (visited !== tasks.length) {
    const stuck = tasks.filter((t) => inDegree.get(t.id)! > 0).map((t) => t.id);
    throw new Error(`[warp] Task graph cycle detected among: ${stuck.join(", ")}`);
  }

  return new Promise<Map<string, T>>((resolve, reject) => {
    let running = 0;
    let settled = false;

    function trySchedule(): void {
      if (settled) return;
      if (remaining.size === 0 && running === 0) {
        settled = true;
        resolve(results);
        return;
      }

      for (const [id, task] of remaining) {
        if (task.deps.every((d) => results.has(d))) {
          remaining.delete(id);
          running++;
          task
            .execute()
            .then((result) => {
              results.set(id, result);
              running--;
              trySchedule();
            })
            .catch((err) => {
              if (!settled) {
                settled = true;
                reject(err);
              }
            });
        }
      }
    }

    trySchedule();
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
  options: { clean?: boolean; incremental?: boolean; packageRoot: string },
  pool: WorkerPool,
): Promise<CompileResult[]> {
  const { clean = true, incremental = false, packageRoot } = options;

  validateOutDirs(parsedConfigs);
  const groups = groupBySignature(parsedConfigs);

  const log = getLogger();

  const dedupCount = parsedConfigs.length - groups.length;
  if (dedupCount > 0) {
    log.info(`[warp] Dedup: ${groups.length} unique compilation(s), ${dedupCount} copied`);
  }

  if (clean) {
    await Promise.all(parsedConfigs.map((pc) => cleanOutDir(pc.outDir)));
  }

  // Track which source group has been type-checked and by which task.
  const typeCheckedSources = new Map<string, { outDir: string; taskId: string }>();

  const tasks: ScheduledTask<CompileResult[]>[] = [];

  for (const group of groups) {
    const suffix = group.primary.target.polyfillSuffix;
    const srcId = sourceIdentity(group.primary.parsedConfig.fileNames, suffix);
    const alreadyChecked = typeCheckedSources.get(srcId);
    const needsTypeCheck = !alreadyChecked;
    const canSkipDeclarations = !!alreadyChecked;
    const primaryTaskId = `compile:${group.primary.target.name}`;

    if (needsTypeCheck) {
      typeCheckedSources.set(srcId, {
        outDir: group.primary.outDir,
        taskId: primaryTaskId,
      });
    }

    // Dependency: if this group reuses type-checking from another group,
    // it must wait for that group's primary to finish (needs its .d.ts files).
    const deps: string[] = [];
    if (canSkipDeclarations && alreadyChecked) {
      deps.push(alreadyChecked.taskId);
    }

    // Capture for closure
    const primaryConfig = group.primary;
    const copies = group.copies;
    const dtsSourceOutDir = alreadyChecked?.outDir;

    tasks.push({
      id: primaryTaskId,
      deps,
      execute: async (): Promise<CompileResult[]> => {
        const label: string[] = [];
        if (!needsTypeCheck) label.push("skip-typecheck");
        if (canSkipDeclarations) label.push("skip-dts");
        if (suffix) {
          // Discover polyfills in the main thread for logging only;
          // the worker rediscovers them independently.
          const { discoverPolyfills } = await import("./compiler.js");
          const polyfillMap = await discoverPolyfills(primaryConfig.parsedConfig.fileNames, suffix);
          if (polyfillMap.size > 0) {
            label.push(`${polyfillMap.size} polyfill(s) via "${suffix}"`);
          }
        }
        if (label.length > 0) {
          log.info(`[warp] [${primaryConfig.target.name}] ${label.join(", ")}`);
        }

        // Dispatch compilation to worker
        const workerResult = await pool.compile({
          type: "compile",
          packageRoot,
          target: primaryConfig.target,
          typeCheck: needsTypeCheck,
          skipDeclarations: canSkipDeclarations,
          incremental: incremental && !suffix,
        });

        // Print diagnostics immediately
        if (workerResult.diagnosticText) {
          log.info(workerResult.diagnosticText);
        }

        // Copy .d.ts from the source group's first-checked target
        if (canSkipDeclarations && dtsSourceOutDir && workerResult.success) {
          await copyDtsFiles(dtsSourceOutDir, primaryConfig.outDir);
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

        // Handle dedup copies on the main thread (fast I/O)
        const results: CompileResult[] = [primaryResult];
        for (const copy of copies) {
          const t0 = performance.now();
          if (primaryResult.success) {
            await copyDir(primaryConfig.outDir, copy.outDir);
          }
          results.push({
            target: copy.target,
            diagnostics: [],
            success: primaryResult.success,
            outDir: copy.outDir,
            rootDir: copy.rootDir,
            compileTimeMs: performance.now() - t0,
            deduped: true,
          });
        }

        return results;
      },
    });
  }

  // Wait for workers to finish loading TypeScript
  await pool.waitReady();
  log.info(`[warp] Parallel: ${pool.size} worker(s), ${tasks.length} compilation task(s)`);

  // Execute the task graph
  const taskResults = await executeTaskGraph(tasks);

  // Flatten and collect all results
  const resultMap = new Map<string, CompileResult>();
  for (const batch of taskResults.values()) {
    for (const r of batch) {
      resultMap.set(r.target.name, r);
    }
  }

  // Return in original declaration order
  return parsedConfigs.map((pc) => resultMap.get(pc.target.name)!);
}
