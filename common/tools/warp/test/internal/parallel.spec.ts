// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Internal unit tests for WorkerPool — exercises the pool directly with mock
 * worker scripts (good, crash, selective-crash, slow, etc.).  These tests do
 * NOT go through the public build() API.
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { WorkerPool, executeTaskGraph, compileAllTargetsParallel } from "../../src/parallel.ts";
import type { ScheduledTask } from "../../src/parallel.ts";
import { parseTargetTsConfig } from "../../src/compiler.ts";
import { WarpError } from "../../src/types.ts";
import type { CompileMessage } from "../../src/workerEntry.ts";
import { withTimeout } from "../helpers.ts";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";

// ---------------------------------------------------------------------------
// Test worker scripts (written to temp files in beforeAll)
// ---------------------------------------------------------------------------

let fixtureDir: string;
let goodWorkerPath: string;
let crashBeforeReadyPath: string;
let crashOnTaskPath: string;
let selectiveCrashPath: string;
let exitBeforeReadyPath: string;
let exitOnTaskPath: string;
let slowWorkerPath: string;
let partialCrashPath: string;

beforeAll(async () => {
  fixtureDir = await fs.mkdtemp(path.join(os.tmpdir(), "warp-parallel-test-"));

  // Good worker: sends ready, processes all tasks successfully.
  goodWorkerPath = path.join(fixtureDir, "good-worker.mjs");
  await fs.writeFile(
    goodWorkerPath,
    [
      'import { parentPort } from "node:worker_threads";',
      'parentPort.postMessage({ type: "ready" });',
      'parentPort.on("message", (msg) => {',
      "  parentPort.postMessage({",
      '    type: "result",',
      '    targetName: msg.target?.name ?? "unknown",',
      "    success: true,",
      '    diagnosticText: "",',
      "    errorCount: 0,",
      "    timeMs: 1,",
      '    outDir: "/tmp/out",',
      "  });",
      "});",
    ].join("\n"),
  );

  // Crashes immediately (before sending ready).
  crashBeforeReadyPath = path.join(fixtureDir, "crash-before-ready.mjs");
  await fs.writeFile(crashBeforeReadyPath, 'throw new Error("deliberate crash before ready");');

  // Sends ready, then throws on every task.
  crashOnTaskPath = path.join(fixtureDir, "crash-on-task.mjs");
  await fs.writeFile(
    crashOnTaskPath,
    [
      'import { parentPort } from "node:worker_threads";',
      'parentPort.postMessage({ type: "ready" });',
      'parentPort.on("message", () => {',
      '  throw new Error("deliberate crash during compilation");',
      "});",
    ].join("\n"),
  );

  // Sends ready, crashes only when target.name === "crash-target".
  selectiveCrashPath = path.join(fixtureDir, "selective-crash.mjs");
  await fs.writeFile(
    selectiveCrashPath,
    [
      'import { parentPort } from "node:worker_threads";',
      'parentPort.postMessage({ type: "ready" });',
      'parentPort.on("message", (msg) => {',
      '  if (msg.target?.name === "crash-target") {',
      '    throw new Error("selective crash on crash-target");',
      "  }",
      "  parentPort.postMessage({",
      '    type: "result",',
      '    targetName: msg.target?.name ?? "unknown",',
      "    success: true,",
      '    diagnosticText: "",',
      "    errorCount: 0,",
      "    timeMs: 1,",
      '    outDir: "/tmp/out",',
      "  });",
      "});",
    ].join("\n"),
  );

  // Exits via process.exit(1) immediately (no error event, only exit event).
  exitBeforeReadyPath = path.join(fixtureDir, "exit-before-ready.mjs");
  await fs.writeFile(exitBeforeReadyPath, "process.exit(1);");

  // Sends ready, then calls process.exit(1) on task (exit without error event).
  exitOnTaskPath = path.join(fixtureDir, "exit-on-task.mjs");
  await fs.writeFile(
    exitOnTaskPath,
    [
      'import { parentPort } from "node:worker_threads";',
      'parentPort.postMessage({ type: "ready" });',
      'parentPort.on("message", () => {',
      "  process.exit(1);",
      "});",
    ].join("\n"),
  );

  // Good worker with a small delay (simulates real compilation).
  slowWorkerPath = path.join(fixtureDir, "slow-worker.mjs");
  await fs.writeFile(
    slowWorkerPath,
    [
      'import { parentPort } from "node:worker_threads";',
      'parentPort.postMessage({ type: "ready" });',
      'parentPort.on("message", (msg) => {',
      "  setTimeout(() => {",
      "    parentPort.postMessage({",
      '      type: "result",',
      '      targetName: msg.target?.name ?? "unknown",',
      "      success: true,",
      '      diagnosticText: "",',
      "      errorCount: 0,",
      "      timeMs: 50,",
      '      outDir: "/tmp/out",',
      "    });",
      "  }, 50);",
      "});",
    ].join("\n"),
  );

  // Partial crash: uses an atomic lock file so exactly one worker crashes
  // before sending ready while the others proceed normally.
  partialCrashPath = path.join(fixtureDir, "partial-crash.mjs");
  await fs.writeFile(
    partialCrashPath,
    [
      'import { parentPort } from "node:worker_threads";',
      'import { writeFileSync } from "node:fs";',
      "",
      "const lockFile = process.env.WARP_TEST_PARTIAL_CRASH_LOCK;",
      "let shouldCrash = false;",
      "if (lockFile) {",
      "  try {",
      '    writeFileSync(lockFile, "", { flag: "wx" });',
      "    shouldCrash = true;",
      "  } catch {",
      "    // Another worker already claimed the crash role",
      "  }",
      "}",
      "",
      'if (shouldCrash) throw new Error("partial crash: designated crasher");',
      "",
      'parentPort.postMessage({ type: "ready" });',
      'parentPort.on("message", (msg) => {',
      "  parentPort.postMessage({",
      '    type: "result",',
      '    targetName: msg.target?.name ?? "unknown",',
      "    success: true,",
      '    diagnosticText: "",',
      "    errorCount: 0,",
      "    timeMs: 1,",
      '    outDir: "/tmp/out",',
      "  });",
      "});",
    ].join("\n"),
  );
});

afterAll(async () => {
  await fs.rm(fixtureDir, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

function makeCompileMsg(name = "test-target"): CompileMessage {
  return {
    type: "compile",
    packageRoot: "/tmp",
    target: { name, condition: "import", tsconfig: "./tsconfig.json" },
    typeCheck: false,
    skipDeclarations: false,
  };
}

// ---------------------------------------------------------------------------
// WorkerPool unit tests
// ---------------------------------------------------------------------------

describe("WorkerPool", () => {
  const pools: WorkerPool[] = [];

  afterEach(() => {
    for (const pool of pools) {
      pool.terminate();
    }
    pools.length = 0;
  });

  function createPool(workerPath: string, size: number): WorkerPool {
    const pool = new WorkerPool(workerPath, size);
    pools.push(pool);
    return pool;
  }

  // -----------------------------------------------------------------------
  // Startup (waitReady)
  // -----------------------------------------------------------------------

  describe("startup (waitReady)", () => {
    it("resolves when all workers send ready", async () => {
      const pool = createPool(goodWorkerPath, 3);
      await withTimeout(pool.waitReady(), 5000, "waitReady");
      expect(pool.size).toBe(3);
    });

    it("rejects when all workers crash before ready", async () => {
      const pool = createPool(crashBeforeReadyPath, 2);
      await expect(withTimeout(pool.waitReady(), 5000, "waitReady (all crash)")).rejects.toThrow(
        /worker/i,
      );
    });

    it("rejects when a single-worker pool crashes before ready", async () => {
      const pool = createPool(crashBeforeReadyPath, 1);
      await expect(withTimeout(pool.waitReady(), 5000, "waitReady (single crash)")).rejects.toThrow(
        /worker/i,
      );
    });

    it("does not hang when some workers crash before ready (partial death)", async () => {
      const lockFile = path.join(fixtureDir, `partial-lock-${Date.now()}`);
      process.env.WARP_TEST_PARTIAL_CRASH_LOCK = lockFile;
      try {
        const pool = createPool(partialCrashPath, 3);
        const start = performance.now();
        await expect(
          withTimeout(pool.waitReady(), 5000, "waitReady (partial crash)"),
        ).rejects.toThrow(/worker/i);
        const elapsed = performance.now() - start;
        expect(elapsed).toBeLessThan(5000);
      } finally {
        delete process.env.WARP_TEST_PARTIAL_CRASH_LOCK;
        await fs.unlink(lockFile).catch(() => {});
      }
    });

    it("rejects when worker exits via process.exit before ready", async () => {
      const pool = createPool(exitBeforeReadyPath, 1);
      await expect(
        withTimeout(pool.waitReady(), 5000, "waitReady (process.exit)"),
      ).rejects.toThrow();
    });

    it("rejects promptly, not after test timeout", async () => {
      const pool = createPool(crashBeforeReadyPath, 1);
      const start = performance.now();
      await expect(pool.waitReady()).rejects.toThrow();
      const elapsed = performance.now() - start;
      expect(elapsed).toBeLessThan(2000);
    });
  });

  // -----------------------------------------------------------------------
  // Task execution
  // -----------------------------------------------------------------------

  describe("task execution", () => {
    it("dispatches compile tasks and returns results", async () => {
      const pool = createPool(goodWorkerPath, 2);
      await pool.waitReady();

      const result = await pool.compile(makeCompileMsg("my-target"));
      expect(result.type).toBe("result");
      expect(result.success).toBe(true);
      expect(result.targetName).toBe("my-target");
    });

    it("queues tasks when all workers are busy", async () => {
      const pool = createPool(slowWorkerPath, 1);
      await pool.waitReady();

      const results = await Promise.all([
        pool.compile(makeCompileMsg("task-1")),
        pool.compile(makeCompileMsg("task-2")),
        pool.compile(makeCompileMsg("task-3")),
      ]);

      expect(results).toHaveLength(3);
      for (const r of results) {
        expect(r.success).toBe(true);
      }
    });

    it("rejects compile() with WarpError when worker crashes mid-task", async () => {
      const pool = createPool(crashOnTaskPath, 1);
      await pool.waitReady();

      const err: unknown = await pool.compile(makeCompileMsg("esm")).catch((e: unknown) => e);
      expect(err).toBeInstanceOf(WarpError);
      expect((err as WarpError).code).toBe("COMPILE_ERROR");
      expect((err as WarpError).message).toContain("--parallel");
    });

    it("includes target name in crash error message", async () => {
      const pool = createPool(crashOnTaskPath, 1);
      await pool.waitReady();

      const err: unknown = await pool
        .compile(makeCompileMsg("my-esm-target"))
        .catch((e: unknown) => e);
      expect((err as Error).message).toContain("my-esm-target");
    });

    it("rejects compile() when worker exits via process.exit mid-task", async () => {
      const pool = createPool(exitOnTaskPath, 1);
      await pool.waitReady();

      await expect(
        withTimeout(pool.compile(makeCompileMsg("exit-target")), 5000, "compile (process.exit)"),
      ).rejects.toThrow();
    });

    it("surviving workers continue processing after one crash", async () => {
      const pool = createPool(selectiveCrashPath, 2);
      await pool.waitReady();
      expect(pool.size).toBe(2);

      await expect(pool.compile(makeCompileMsg("crash-target"))).rejects.toThrow();
      expect(pool.size).toBe(1);

      const result = await pool.compile(makeCompileMsg("ok-target"));
      expect(result.success).toBe(true);
      expect(result.targetName).toBe("ok-target");
    });

    it("pool.size reflects actual alive worker count", async () => {
      const pool = createPool(selectiveCrashPath, 3);
      await pool.waitReady();
      expect(pool.size).toBe(3);

      await expect(pool.compile(makeCompileMsg("crash-target"))).rejects.toThrow();
      expect(pool.size).toBe(2);
    });
  });

  // -----------------------------------------------------------------------
  // Catastrophic failures
  // -----------------------------------------------------------------------

  describe("catastrophic failures", () => {
    it("rejects all active tasks when all workers crash simultaneously", async () => {
      const pool = createPool(crashOnTaskPath, 3);
      await pool.waitReady();

      const results = await Promise.allSettled([
        pool.compile(makeCompileMsg("t1")),
        pool.compile(makeCompileMsg("t2")),
        pool.compile(makeCompileMsg("t3")),
      ]);

      for (const r of results) {
        expect(r.status).toBe("rejected");
      }
      expect(pool.size).toBe(0);
    });

    it("rejects queued tasks when all workers die", async () => {
      const pool = createPool(crashOnTaskPath, 1);
      await pool.waitReady();

      const results = await withTimeout(
        Promise.allSettled([
          pool.compile(makeCompileMsg("active")),
          pool.compile(makeCompileMsg("queued-1")),
          pool.compile(makeCompileMsg("queued-2")),
        ]),
        5000,
        "all tasks settle after catastrophic failure",
      );

      for (const r of results) {
        expect(r.status).toBe("rejected");
      }
    });

    it("terminate() cleans up without errors or hanging", async () => {
      const pool = createPool(goodWorkerPath, 3);
      await pool.waitReady();

      pool.compile(makeCompileMsg("inflight")).catch(() => {});

      expect(() => pool.terminate()).not.toThrow();
      expect(pool.size).toBe(0);
    });
  });

  // -----------------------------------------------------------------------
  // Stress
  // -----------------------------------------------------------------------

  describe("stress", () => {
    it("handles many tasks through a small pool", async () => {
      const pool = createPool(goodWorkerPath, 2);
      await pool.waitReady();

      const taskCount = 50;
      const promises = Array.from({ length: taskCount }, (_, i) =>
        pool.compile(makeCompileMsg(`target-${i}`)),
      );

      const results = await Promise.all(promises);
      expect(results).toHaveLength(taskCount);
      for (let i = 0; i < taskCount; i++) {
        expect(results[i].success).toBe(true);
        expect(results[i].targetName).toBe(`target-${i}`);
      }
    });

    it("handles rapid sequential submissions", async () => {
      const pool = createPool(goodWorkerPath, 1);
      await pool.waitReady();

      for (let i = 0; i < 20; i++) {
        const result = await pool.compile(makeCompileMsg(`seq-${i}`));
        expect(result.success).toBe(true);
      }
    });

    it("mixed success and failure across many tasks", async () => {
      const pool = createPool(selectiveCrashPath, 2);
      await pool.waitReady();

      const okResults = await Promise.all(
        Array.from({ length: 5 }, (_, i) => pool.compile(makeCompileMsg(`ok-${i}`))),
      );
      for (const r of okResults) {
        expect(r.success).toBe(true);
      }

      await expect(pool.compile(makeCompileMsg("crash-target"))).rejects.toThrow();
      expect(pool.size).toBe(1);

      const moreResults = await Promise.all(
        Array.from({ length: 5 }, (_, i) => pool.compile(makeCompileMsg(`after-crash-${i}`))),
      );
      for (const r of moreResults) {
        expect(r.success).toBe(true);
      }
    });
  });
});

// ---------------------------------------------------------------------------
// Fault injection: worker-level chaos via mock worker scripts
// ---------------------------------------------------------------------------

describe("fault injection: worker-level chaos", () => {
  let chaosDir: string;
  const pools: WorkerPool[] = [];

  beforeAll(async () => {
    chaosDir = await fs.mkdtemp(path.join(os.tmpdir(), "warp-chaos-workers-"));
  });

  afterAll(async () => {
    await fs.rm(chaosDir, { recursive: true, force: true });
  });

  afterEach(() => {
    for (const pool of pools) {
      pool.terminate();
    }
    pools.length = 0;
  });

  function createPool(workerPath: string, size: number): WorkerPool {
    const pool = new WorkerPool(workerPath, size);
    pools.push(pool);
    return pool;
  }

  it("worker OOM (simulated via SIGABRT exit) is handled cleanly", async () => {
    const oomWorkerPath = path.join(chaosDir, "oom-worker.mjs");
    await fs.writeFile(
      oomWorkerPath,
      [
        'import { parentPort } from "node:worker_threads";',
        'parentPort.postMessage({ type: "ready" });',
        'parentPort.on("message", () => {',
        "  process.exit(134);",
        "});",
      ].join("\n"),
    );

    const pool = createPool(oomWorkerPath, 1);
    await pool.waitReady();

    await expect(
      withTimeout(pool.compile(makeCompileMsg("oom-target")), 5000, "OOM worker"),
    ).rejects.toThrow();
    expect(pool.size).toBe(0);
  });

  it("worker unhandled async rejection (simulated I/O error) is caught", async () => {
    const asyncFailWorkerPath = path.join(chaosDir, "async-fail-worker.mjs");
    await fs.writeFile(
      asyncFailWorkerPath,
      [
        'import { parentPort } from "node:worker_threads";',
        'import { readFile } from "node:fs/promises";',
        'parentPort.postMessage({ type: "ready" });',
        'parentPort.on("message", async () => {',
        '  await readFile("/nonexistent/path/that/does/not/exist/anywhere");',
        "});",
      ].join("\n"),
    );

    const pool = createPool(asyncFailWorkerPath, 1);
    await pool.waitReady();

    await expect(
      withTimeout(pool.compile(makeCompileMsg("io-error")), 5000, "async I/O failure"),
    ).rejects.toThrow();
    expect(pool.size).toBe(0);
  });

  it("worker stack overflow is handled cleanly", async () => {
    const stackOverflowPath = path.join(chaosDir, "stack-overflow-worker.mjs");
    await fs.writeFile(
      stackOverflowPath,
      [
        'import { parentPort } from "node:worker_threads";',
        'parentPort.postMessage({ type: "ready" });',
        'parentPort.on("message", () => {',
        "  function recurse() { return recurse(); }",
        "  recurse();",
        "});",
      ].join("\n"),
    );

    const pool = createPool(stackOverflowPath, 1);
    await pool.waitReady();

    await expect(
      withTimeout(pool.compile(makeCompileMsg("stack-overflow")), 5000, "stack overflow"),
    ).rejects.toThrow();
    expect(pool.size).toBe(0);
  });

  it("worker sends malformed message — compile rejects after terminate", async () => {
    const malformedPath = path.join(chaosDir, "malformed-worker.mjs");
    await fs.writeFile(
      malformedPath,
      [
        'import { parentPort } from "node:worker_threads";',
        'parentPort.postMessage({ type: "ready" });',
        'parentPort.on("message", () => {',
        '  parentPort.postMessage({ type: "not_a_result", garbage: true });',
        "});",
      ].join("\n"),
    );

    const pool = createPool(malformedPath, 1);
    await pool.waitReady();

    const compilePromise = pool.compile(makeCompileMsg("malformed"));
    await new Promise((r) => setTimeout(r, 200));
    pool.terminate();
    await expect(compilePromise).rejects.toThrow(/terminated/i);
    expect(pool.size).toBe(0);
  });

  it("worker double-posts result — pool stays stable", async () => {
    const doublePath = path.join(chaosDir, "double-result-worker.mjs");
    await fs.writeFile(
      doublePath,
      [
        'import { parentPort } from "node:worker_threads";',
        'parentPort.postMessage({ type: "ready" });',
        'parentPort.on("message", (msg) => {',
        "  const result = {",
        '    type: "result",',
        '    targetName: msg.target?.name ?? "unknown",',
        "    success: true,",
        '    diagnosticText: "",',
        "    errorCount: 0,",
        "    timeMs: 1,",
        '    outDir: "/tmp/out",',
        "  };",
        "  parentPort.postMessage(result);",
        "  parentPort.postMessage(result);",
        "});",
      ].join("\n"),
    );

    const pool = createPool(doublePath, 1);
    await pool.waitReady();

    const r1 = await pool.compile(makeCompileMsg("double-1"));
    expect(r1.success).toBe(true);

    const r2 = await pool.compile(makeCompileMsg("double-2"));
    expect(r2.success).toBe(true);
  });

  it("worker slow-then-crash: processes first task, crashes on second", async () => {
    const slowCrashPath = path.join(chaosDir, "slow-crash-worker.mjs");
    await fs.writeFile(
      slowCrashPath,
      [
        'import { parentPort } from "node:worker_threads";',
        "let taskCount = 0;",
        'parentPort.postMessage({ type: "ready" });',
        'parentPort.on("message", (msg) => {',
        "  taskCount++;",
        "  if (taskCount > 1) {",
        '    throw new Error("crash on second task");',
        "  }",
        "  parentPort.postMessage({",
        '    type: "result",',
        '    targetName: msg.target?.name ?? "unknown",',
        "    success: true,",
        '    diagnosticText: "",',
        "    errorCount: 0,",
        "    timeMs: 1,",
        '    outDir: "/tmp/out",',
        "  });",
        "});",
      ].join("\n"),
    );

    const pool = createPool(slowCrashPath, 1);
    await pool.waitReady();

    const r1 = await pool.compile(makeCompileMsg("task-1"));
    expect(r1.success).toBe(true);

    await expect(pool.compile(makeCompileMsg("task-2"))).rejects.toThrow();
    expect(pool.size).toBe(0);
  });

  it("worker crashes with non-Error throw (string, number, object)", async () => {
    const weirdThrowPath = path.join(chaosDir, "weird-throw-worker.mjs");
    await fs.writeFile(
      weirdThrowPath,
      [
        'import { parentPort } from "node:worker_threads";',
        'parentPort.postMessage({ type: "ready" });',
        'parentPort.on("message", () => {',
        '  throw "I am a string, not an Error";',
        "});",
      ].join("\n"),
    );

    const pool = createPool(weirdThrowPath, 1);
    await pool.waitReady();

    await expect(
      withTimeout(pool.compile(makeCompileMsg("weird-throw")), 5000, "non-Error throw"),
    ).rejects.toThrow();
    expect(pool.size).toBe(0);
  });

  it("all workers crash in staggered fashion — no task left hanging", async () => {
    const counterFile = path.join(chaosDir, `counter-${Date.now()}`);
    await fs.writeFile(counterFile, "0");

    const staggerPath = path.join(chaosDir, "stagger-crash-worker.mjs");
    await fs.writeFile(
      staggerPath,
      [
        'import { parentPort } from "node:worker_threads";',
        'import { readFileSync, writeFileSync } from "node:fs";',
        "",
        `const counterFile = ${JSON.stringify(counterFile)};`,
        "let count = 0;",
        "let crashAfter;",
        "try {",
        '  const val = parseInt(readFileSync(counterFile, "utf-8"), 10);',
        "  crashAfter = val + 1;",
        "  writeFileSync(counterFile, String(val + 1));",
        "} catch { crashAfter = 1; }",
        "",
        'parentPort.postMessage({ type: "ready" });',
        'parentPort.on("message", (msg) => {',
        "  count++;",
        "  if (count >= crashAfter) {",
        "    throw new Error(`staggered crash after ${count} task(s)`);",
        "  }",
        "  parentPort.postMessage({",
        '    type: "result",',
        '    targetName: msg.target?.name ?? "unknown",',
        "    success: true,",
        '    diagnosticText: "",',
        "    errorCount: 0,",
        "    timeMs: 1,",
        '    outDir: "/tmp/out",',
        "  });",
        "});",
      ].join("\n"),
    );

    const pool = createPool(staggerPath, 3);
    await pool.waitReady();

    const promises = Array.from({ length: 6 }, (_, i) =>
      pool.compile(makeCompileMsg(`stagger-${i}`)),
    );

    const results = await withTimeout(Promise.allSettled(promises), 10000, "staggered crash tasks");

    expect(results).toHaveLength(6);
    for (const r of results) {
      expect(["fulfilled", "rejected"]).toContain(r.status);
    }
    const fulfilled = results.filter((r) => r.status === "fulfilled");
    expect(fulfilled.length).toBeGreaterThan(0);
    const rejected = results.filter((r) => r.status === "rejected");
    expect(rejected.length).toBeGreaterThan(0);

    await fs.unlink(counterFile).catch(() => {});
  });
});

// ---------------------------------------------------------------------------
// executeTaskGraph unit tests
// ---------------------------------------------------------------------------

describe("executeTaskGraph", () => {
  it("empty graph returns empty results", async () => {
    const results = await executeTaskGraph([]);
    expect(results.size).toBe(0);
  });

  it("single task with no deps executes immediately", async () => {
    const results = await executeTaskGraph([
      { id: "a", deps: [], execute: () => Promise.resolve("result-a") },
    ]);
    expect(results.get("a")).toBe("result-a");
  });

  it("linear chain (A→B→C) respects dependency order", async () => {
    const order: string[] = [];
    const results = await executeTaskGraph([
      {
        id: "a",
        deps: [],
        execute: () => {
          order.push("a");
          return Promise.resolve(1);
        },
      },
      {
        id: "b",
        deps: ["a"],
        execute: () => {
          order.push("b");
          return Promise.resolve(2);
        },
      },
      {
        id: "c",
        deps: ["b"],
        execute: () => {
          order.push("c");
          return Promise.resolve(3);
        },
      },
    ]);
    expect(order).toEqual(["a", "b", "c"]);
    expect(results.get("a")).toBe(1);
    expect(results.get("b")).toBe(2);
    expect(results.get("c")).toBe(3);
  });

  it("diamond graph (A→B,C ; B,C→D) runs B and C concurrently", async () => {
    const order: string[] = [];
    const results = await executeTaskGraph([
      {
        id: "a",
        deps: [],
        execute: () => {
          order.push("a");
          return Promise.resolve("a");
        },
      },
      {
        id: "b",
        deps: ["a"],
        execute: () => {
          order.push("b");
          return Promise.resolve("b");
        },
      },
      {
        id: "c",
        deps: ["a"],
        execute: () => {
          order.push("c");
          return Promise.resolve("c");
        },
      },
      {
        id: "d",
        deps: ["b", "c"],
        execute: () => {
          order.push("d");
          return Promise.resolve("d");
        },
      },
    ]);
    expect(order[0]).toBe("a");
    expect(order[3]).toBe("d");
    expect(new Set(order.slice(1, 3))).toEqual(new Set(["b", "c"]));
    expect(results.size).toBe(4);
  });

  it("cycle detection throws WarpError", async () => {
    await expect(
      executeTaskGraph([
        { id: "a", deps: ["b"], execute: () => Promise.resolve(1) },
        { id: "b", deps: ["a"], execute: () => Promise.resolve(2) },
      ]),
    ).rejects.toThrow(/cycle/i);

    try {
      await executeTaskGraph([
        { id: "a", deps: ["b"], execute: () => Promise.resolve(1) },
        { id: "b", deps: ["a"], execute: () => Promise.resolve(2) },
      ]);
    } catch (e) {
      expect(e).toBeInstanceOf(WarpError);
      expect((e as WarpError).code).toBe("COMPILE_ERROR");
    }
  });

  it("self-cycle is detected", async () => {
    await expect(
      executeTaskGraph([{ id: "a", deps: ["a"], execute: () => Promise.resolve(1) }]),
    ).rejects.toThrow(/cycle/i);
  });

  it("non-existent dep IDs are silently ignored", async () => {
    const results = await executeTaskGraph([
      { id: "a", deps: ["nonexistent"], execute: () => Promise.resolve("ok") },
    ]);
    expect(results.get("a")).toBe("ok");
  });

  it("task failure rejects the entire graph", async () => {
    await expect(
      executeTaskGraph([
        { id: "a", deps: [], execute: () => Promise.resolve("ok") },
        {
          id: "b",
          deps: [],
          execute: () => Promise.reject(new Error("boom")),
        },
        { id: "c", deps: ["a"], execute: () => Promise.resolve("ok") },
      ]),
    ).rejects.toThrow("boom");
  });

  it("dependents of a failed task are never executed", async () => {
    const executed: string[] = [];
    await executeTaskGraph<string>([
      {
        id: "a",
        deps: [],
        execute: () => {
          executed.push("a");
          return Promise.reject(new Error("a failed"));
        },
      },
      {
        id: "b",
        deps: ["a"],
        execute: () => {
          executed.push("b");
          return Promise.resolve("b");
        },
      },
      {
        id: "c",
        deps: ["a"],
        execute: () => {
          executed.push("c");
          return Promise.resolve("c");
        },
      },
    ]).catch(() => {});
    // Allow microtasks to flush
    await new Promise((r) => setTimeout(r, 50));
    expect(executed).toEqual(["a"]);
    expect(executed).not.toContain("b");
    expect(executed).not.toContain("c");
  });

  it("many independent tasks all execute", async () => {
    const tasks: ScheduledTask<number>[] = Array.from({ length: 20 }, (_, i) => ({
      id: `task-${i}`,
      deps: [],
      execute: () => Promise.resolve(i),
    }));
    const results = await executeTaskGraph(tasks);
    expect(results.size).toBe(20);
    for (let i = 0; i < 20; i++) {
      expect(results.get(`task-${i}`)).toBe(i);
    }
  });
});

// ---------------------------------------------------------------------------
// Additional WorkerPool edge-case tests
// ---------------------------------------------------------------------------

describe("WorkerPool edge cases", () => {
  let fixtureDir2: string;
  let goodWorker2: string;
  const pools: WorkerPool[] = [];

  beforeAll(async () => {
    fixtureDir2 = await fs.mkdtemp(path.join(os.tmpdir(), "warp-edge-test-"));
    goodWorker2 = path.join(fixtureDir2, "good-worker.mjs");
    await fs.writeFile(
      goodWorker2,
      [
        'import { parentPort } from "node:worker_threads";',
        'parentPort.postMessage({ type: "ready" });',
        'parentPort.on("message", (msg) => {',
        "  parentPort.postMessage({",
        '    type: "result",',
        '    targetName: msg.target?.name ?? "unknown",',
        "    success: true,",
        '    diagnosticText: "",',
        "    errorCount: 0,",
        "    timeMs: 1,",
        '    outDir: "/tmp/out",',
        "  });",
        "});",
      ].join("\n"),
    );
  });

  afterAll(async () => {
    await fs.rm(fixtureDir2, { recursive: true, force: true });
  });

  afterEach(() => {
    for (const pool of pools) {
      pool.terminate();
    }
    pools.length = 0;
  });

  function createPool(workerPath: string, size: number): WorkerPool {
    const pool = new WorkerPool(workerPath, size);
    pools.push(pool);
    return pool;
  }

  it("compile() after terminate() rejects immediately with WarpError", async () => {
    const pool = createPool(goodWorker2, 2);
    await pool.waitReady();
    pool.terminate();

    const err: unknown = await pool
      .compile(makeCompileMsg("post-terminate"))
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(WarpError);
    expect((err as WarpError).code).toBe("COMPILE_ERROR");
    expect((err as WarpError).message).toContain("terminated");
  });

  it("terminate() rejects pending tasks", async () => {
    const slowWorker = path.join(fixtureDir2, "slow-worker.mjs");
    await fs.writeFile(
      slowWorker,
      [
        'import { parentPort } from "node:worker_threads";',
        'parentPort.postMessage({ type: "ready" });',
        'parentPort.on("message", (msg) => {',
        "  setTimeout(() => {",
        "    parentPort.postMessage({",
        '      type: "result",',
        '      targetName: msg.target?.name ?? "unknown",',
        "      success: true,",
        '      diagnosticText: "",',
        "      errorCount: 0,",
        "      timeMs: 500,",
        '      outDir: "/tmp/out",',
        "    });",
        "  }, 500);",
        "});",
      ].join("\n"),
    );

    const pool = createPool(slowWorker, 1);
    await pool.waitReady();

    // Submit 3 tasks — only 1 worker, so 2 are queued
    const p1 = pool.compile(makeCompileMsg("active")).catch((e: unknown) => e);
    const p2 = pool.compile(makeCompileMsg("queued-1")).catch((e: unknown) => e);
    const p3 = pool.compile(makeCompileMsg("queued-2")).catch((e: unknown) => e);

    // Terminate immediately — all tasks should reject
    pool.terminate();

    const [r1, r2, r3] = await Promise.all([p1, p2, p3]);
    // Active task rejected via in-flight rejection
    expect(r1).toBeInstanceOf(WarpError);
    expect((r1 as WarpError).message).toContain("terminated");
    // Queued tasks rejected via pending rejection
    expect(r2).toBeInstanceOf(WarpError);
    expect((r2 as WarpError).message).toContain("pending");
    expect(r3).toBeInstanceOf(WarpError);
  });

  it("waitReady() is idempotent — multiple calls return the same result", async () => {
    const pool = createPool(goodWorker2, 2);
    const [r1, r2, r3] = await Promise.all([pool.waitReady(), pool.waitReady(), pool.waitReady()]);
    expect(r1).toBeUndefined();
    expect(r2).toBeUndefined();
    expect(r3).toBeUndefined();

    // Calling again after already ready still resolves
    await expect(pool.waitReady()).resolves.toBeUndefined();
  });

  it("pool.size matches constructor argument after startup", async () => {
    for (const size of [1, 2, 4]) {
      const pool = createPool(goodWorker2, size);
      await pool.waitReady();
      expect(pool.size).toBe(size);
    }
  });
});

// ---------------------------------------------------------------------------
// External pool reuse (compileAllTargetsParallel with pre-existing pool)
// ---------------------------------------------------------------------------

describe("compileAllTargetsParallel with external pool", () => {
  let tmpDir: string;

  beforeAll(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "warp-extpool-"));
    await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "src/index.ts"), "export const x = 42;\n");

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
  });

  afterAll(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("external pool is NOT terminated after compileAllTargetsParallel", async () => {
    const target = {
      name: "esm",
      condition: "import",
      tsconfig: "./tsconfig.esm.json",
    };
    const parsed = parseTargetTsConfig(target, tmpDir);
    const { createWorkerPool } = await import("../../src/parallel.ts");
    const pool = await createWorkerPool(1);
    await pool.waitReady();

    const results = await compileAllTargetsParallel([parsed], { packageRoot: tmpDir }, pool);
    expect(results).toHaveLength(1);
    expect(results[0].success).toBe(true);

    // The pool should NOT have been terminated since we passed it externally
    expect(pool.size).toBeGreaterThan(0);

    // Verify the pool is still usable by submitting another compilation
    const results2 = await compileAllTargetsParallel([parsed], { packageRoot: tmpDir }, pool);
    expect(results2[0].success).toBe(true);

    pool.terminate();
    expect(pool.size).toBe(0);
  });
});
