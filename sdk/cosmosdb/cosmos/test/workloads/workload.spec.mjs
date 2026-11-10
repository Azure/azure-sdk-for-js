// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  readFileSync,
  mkdtempSync,
  writeFileSync,
  unlinkSync,
  rmdirSync,
  readdirSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { EventEmitter } from "node:events";
import { fileURLToPath } from "node:url";
import {
  validateConfig,
  readConfig,
  sha256,
  seedItem,
  inspectRead,
  safeError,
  captureCapacity,
  captureEnvironment,
} from "./common.mjs";
import {
  Stats,
  summarize,
  mergeHistograms,
  mergeAttemptEvidence,
  MAX_BUCKETS,
  MAX_ATTEMPT_GROUPS,
  IntervalBuffer,
  MAX_BUFFERED_INTERVALS,
  MAX_BUFFERED_BUCKETS,
  MAX_RESULT_BYTES,
  MAX_ARTIFACT_BYTES,
  aggregateIntervals,
} from "./stats.mjs";
import { Reporter } from "./reporter.mjs";
import { validateResults } from "./report.mjs";
import { timedRead, run } from "./workload.mjs";
import { createSequencePlan, runChild, installSignalHandlers, withDeadline } from "./launch.mjs";
import { MAX_PROFILE_READS, copyRustProfile, validateReadProfiles } from "./profiling.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function config() {
  const value = JSON.parse(readFileSync(path.join(__dirname, "read-latency.example.json"), "utf8"));
  value.nativeBuildManifest = path.resolve(__dirname, "unused-build-manifest.json");
  return value;
}

function response(backend = "rust") {
  return {
    resource: { ...seedItem(204), _etag: "version-1" },
    etag: "version-1",
    statusCode: 200,
    requestCharge: 1,
    diagnostics:
      backend === "rust"
        ? {
            experimentalRustRead: {
              coverage: "partial",
              requests: {
                requestCount: 1,
                retainedRequestCount: 1,
                requests: [{ pipeline: "data_plane", transport: "gateway_v2", statusCode: 200 }],
              },
            },
          }
        : { clientSideRequestStatistics: { retryDiagnostics: { failedAttempts: [] } } },
  };
}

function evidence(backend = "rust", requestCharge = 1) {
  return { ...inspectRead(response(backend), 204, backend), requestCharge };
}

test("configuration selects separate JS targets and explicit bounded budgets", () => {
  assert.equal(validateConfig(config()).itemCount, 1000);
  const mutations = [
    (value) => {
      value.results = value.workload;
    },
    (value) => {
      value.workload.partitionKey = "/id";
    },
    (value) => {
      value.workload.database = "js_rust_read_item_db";
    },
    (value) => {
      value.endpoint = "https://other.documents.azure.com/";
    },
    (value) => {
      value.endpoint = "https://user:password@rust-migration-eastus.documents.azure.com/";
    },
    (value) => {
      value.endpoint += "?key=secret";
    },
    (value) => {
      value.key = "must-not-be-saved";
    },
    (value) => {
      value.durationSeconds = 0;
    },
    (value) => {
      value.repetitions = 1.5;
    },
    (value) => {
      value.reportIntervalSeconds = 61;
    },
    (value) => {
      delete value.shutdownGraceSeconds;
    },
    (value) => {
      value.itemCount = 1;
    },
    (value) => {
      delete value.capacityRuPerSecond;
    },
    (value) => {
      value.capacityRuPerSecond.results = 0;
    },
    (value) => {
      value.capacityRuPerSecond.secret = "not-allowed";
    },
    (value) => {
      value.durationSeconds = MAX_BUFFERED_INTERVALS;
      value.reportIntervalSeconds = 1;
    },
  ];
  for (const mutate of mutations) {
    const value = config();
    mutate(value);
    assert.throws(() => validateConfig(value));
  }
});

test("execution order is optional, explicit and strictly validated", () => {
  assert.equal(validateConfig(config()).executionOrder, undefined);
  for (const executionOrder of ["javascript_first", "alternating"]) {
    assert.equal(validateConfig({ ...config(), executionOrder }).executionOrder, executionOrder);
  }
  for (const executionOrder of ["random", "", null, undefined, true, []]) {
    assert.throws(() => validateConfig({ ...config(), executionOrder }), /execution order/);
    assert.throws(() => createSequencePlan({ ...config(), executionOrder }), /execution order/);
  }
});

test("concurrency is opt-in, bounded and incompatible with concurrent per-read profiling", () => {
  assert.equal(validateConfig(config()).concurrency, undefined);
  for (const concurrency of [1, 32, 64]) {
    assert.equal(validateConfig({ ...config(), concurrency }).concurrency, concurrency);
  }
  for (const concurrency of [0, -1, 65, 1.5, "32", null, undefined, true]) {
    assert.throws(() => validateConfig({ ...config(), concurrency }), /Concurrency/);
  }
  assert.throws(
    () => validateConfig({ ...config(), concurrency: 32, profilingMode: "stages_v1" }),
    /profiling requires concurrency 1/,
  );
});

test("default and explicit JavaScript-first plans preserve existing repetition order", () => {
  const value = { ...config(), repetitions: 4 };
  const expected = [
    { backend: "javascript", repetition: 1 },
    { backend: "rust", repetition: 1 },
    { backend: "javascript", repetition: 2 },
    { backend: "rust", repetition: 2 },
    { backend: "javascript", repetition: 3 },
    { backend: "rust", repetition: 3 },
    { backend: "javascript", repetition: 4 },
    { backend: "rust", repetition: 4 },
  ];
  assert.deepEqual(createSequencePlan(value), expected);
  assert.deepEqual(createSequencePlan({ ...value, executionOrder: "javascript_first" }), expected);
  assert.equal(value.executionOrder, undefined);
});

test("Rust worker counts are optional, bounded and specified for every repetition", () => {
  assert.equal(validateConfig(config()).rustWorkerThreadsByRepetition, undefined);
  const value = { ...config(), repetitions: 4, rustWorkerThreadsByRepetition: [4, 1, 2, 4] };
  assert.deepEqual(validateConfig(value).rustWorkerThreadsByRepetition, [4, 1, 2, 4]);
  for (const workers of [
    null,
    undefined,
    1,
    [],
    [1],
    [1, 2, 4, 0],
    [1, 2, 4, 3],
    [1, 2, 4, 8],
    [1, 2, 4, "1"],
    [1, 2, 4, true],
    [1, 2, 4, 1.5],
    new Array(4),
  ]) {
    assert.throws(
      () => createSequencePlan({ ...value, rustWorkerThreadsByRepetition: workers }),
      /Rust worker threads/,
    );
  }
});

test("worker counts follow Rust repetition identities regardless of execution order", () => {
  for (const executionOrder of ["javascript_first", "alternating"]) {
    const value = {
      ...config(),
      repetitions: 4,
      executionOrder,
      rustWorkerThreadsByRepetition: [4, 1, 1, 4],
    };
    const original = structuredClone(value);
    const plan = createSequencePlan(value);
    assert.deepEqual(
      plan.filter((cell) => cell.backend === "rust").map((cell) => cell.rustWorkerThreads),
      [4, 1, 1, 4],
    );
    assert.ok(
      plan
        .filter((cell) => cell.backend === "javascript")
        .every((cell) => !Object.hasOwn(cell, "rustWorkerThreads")),
    );
    assert.deepEqual(value, original);
  }
});

test("alternating plan balances first position and preserves backend repetition identities", () => {
  const value = { ...config(), repetitions: 4, executionOrder: "alternating" };
  const original = structuredClone(value);
  const expected = [
    { backend: "javascript", repetition: 1 },
    { backend: "rust", repetition: 1 },
    { backend: "rust", repetition: 2 },
    { backend: "javascript", repetition: 2 },
    { backend: "javascript", repetition: 3 },
    { backend: "rust", repetition: 3 },
    { backend: "rust", repetition: 4 },
    { backend: "javascript", repetition: 4 },
  ];
  assert.deepEqual(createSequencePlan(value), expected);
  assert.deepEqual(value, original);
  assert.equal(
    new Set(expected.map(({ backend, repetition }) => `${backend}-${repetition}`)).size,
    8,
  );
  for (const repetitions of [1, 3]) {
    assert.deepEqual(
      createSequencePlan({ ...value, repetitions }),
      expected.slice(0, repetitions * 2),
    );
  }
  assert.throws(() => createSequencePlan({ ...value, repetitions: 0 }), /repetitions/);
});

test("public read checks validate bodies, ETags, successful status and actual V2 attempts", () => {
  assert.equal(inspectRead(response(), 204, "rust", "version-1").transportVerified, true);
  assert.equal(inspectRead(response("javascript"), 204, "javascript").transportVerified, false);
  const mutations = [
    (value) => {
      value.statusCode = 404;
    },
    (value) => {
      value.resource.quantity = 9;
    },
    (value) => {
      value.resource.extraField = true;
    },
    (value) => {
      value.etag = "version-2";
    },
    (value) => {
      value.requestCharge = Number.NaN;
    },
    (value) => {
      delete value.diagnostics.experimentalRustRead;
    },
    (value) => {
      value.diagnostics.experimentalRustRead.requests.requestCount = 2;
    },
    (value) => {
      value.diagnostics.experimentalRustRead.requests.requests[0].transport = "gateway";
    },
    (value) => {
      value.diagnostics.experimentalRustRead.requests.requests[0].pipeline = "metadata";
    },
  ];
  for (const mutate of mutations) {
    const value = response();
    mutate(value);
    assert.throws(() => inspectRead(value, 204, "rust", "version-1"));
  }
});

test("successful retries still expose observed 429 attempts", () => {
  const value = response();
  const evidence = value.diagnostics.experimentalRustRead.requests;
  evidence.requests.unshift({ pipeline: "data_plane", transport: "gateway_v2", statusCode: 429 });
  evidence.requestCount = evidence.retainedRequestCount = 2;
  assert.equal(inspectRead(value, 204, "rust").observed429, 1);
});

test("timing encloses only the public SDK call and includes rejected calls", async () => {
  let now = 100n;
  const clock = () => now;
  const result = await timedRead(async () => {
    now += 900n;
    return { statusCode: 404 };
  }, clock);
  assert.equal(result.durationNs, 900n);
  assert.equal(result.response.statusCode, 404);
  const error = new Error("failed");
  const failed = await timedRead(async () => {
    now += 300n;
    throw error;
  }, clock);
  assert.equal(failed.durationNs, 300n);
  assert.equal(failed.error, error);
});

test("interval drains reset counters but retain the first operation", () => {
  const stats = new Stats(10);
  stats.success(1_234_567n, evidence());
  stats.failure(2_000_000n, { status_code: 503 });
  const first = stats.drain(25);
  assert.deepEqual(first.histogram_us, [[1234, 1]]);
  assert.equal(first.interval_duration_seconds, 15);
  assert.equal(first.errors, 1);
  assert.equal(stats.drain(26), null);
  stats.success(5_000_000n, evidence("rust", 2));
  const second = stats.drain(30);
  assert.equal(second.interval_number, 2);
  assert.equal(second.interval_duration_seconds, 5);
  assert.equal(second.errors, 0);
  assert.equal(second.ru_sum, 2);
  assert.deepEqual(second.first_operation, first.first_operation);
});

test("histograms pool observations, not interval percentiles", () => {
  const merged = mergeHistograms([
    [
      [1000, 99],
      [100000, 1],
    ],
    [[10000, 1]],
  ]);
  const summary = summarize(merged);
  assert.equal(summary.count, 101);
  assert.equal(summary.p99_ms, 10);
  assert.equal(summarize([]).p99_ms, null);
  assert.throws(() =>
    summarize([
      [1000, 1],
      [1000, 2],
    ]),
  );
  assert.throws(() => summarize([[1000, -1]]));
  assert.throws(() =>
    summarize([
      [1000, Number.MAX_SAFE_INTEGER],
      [2000, 1],
    ]),
  );
});

test("histogram capacity fails visibly rather than dropping or clamping tails", () => {
  const stats = new Stats(0);
  const observed = evidence("javascript");
  for (let index = 1; index <= MAX_BUCKETS; index++) stats.success(BigInt(index) * 1000n, observed);
  assert.throws(() => stats.success(BigInt(MAX_BUCKETS + 1) * 1000n, observed), /capacity/);
});

test("deferred snapshots enforce interval and total histogram bounds without dropping data", () => {
  const buffer = new IntervalBuffer(2);
  const first = snapshot();
  const second = snapshot();
  buffer.add(null);
  buffer.add(first);
  buffer.add(second);
  assert.throws(() => buffer.add(snapshot()), /interval capacity/);
  const draining = buffer.drain();
  assert.equal(draining.next().value, first);
  assert.equal(buffer.snapshots[0], null);
  assert.equal(draining.next().value, second);
  assert.equal(draining.next().done, true);
  assert.equal(buffer.snapshots.length, 0);
  assert.equal(buffer.buckets, 0);
  assert.throws(() => new IntervalBuffer(MAX_BUFFERED_INTERVALS + 1), /interval capacity/);

  const bounded = new IntervalBuffer(MAX_BUFFERED_INTERVALS);
  const full = { histogram_us: Array.from({ length: MAX_BUCKETS }, (_, index) => [index + 1, 1]) };
  for (let index = 0; index < MAX_BUFFERED_BUCKETS / MAX_BUCKETS - 1; index++) bounded.add(full);
  assert.throws(
    () => bounded.add({ histogram_us: [...full.histogram_us, [MAX_BUCKETS + 1, 1]] }),
    /histogram capacity/,
  );
  assert.equal([...bounded.drain()].length, MAX_BUFFERED_BUCKETS / MAX_BUCKETS - 1);
});

async function withWorkload(options, check) {
  const directory = mkdtempSync(path.join(os.tmpdir(), "deferred-read-"));
  const fixture = path.join(directory, "fixture.json");
  const settings = { ...config(), reportIntervalSeconds: 1, ...options.config };
  writeFileSync(
    fixture,
    JSON.stringify({
      endpoint: settings.endpoint,
      target: settings.workload,
      etags: Array(settings.itemCount).fill("version-1"),
    }),
  );
  const controller = new AbortController();
  const channel = new EventEmitter();
  const messages = [];
  let now = 0;
  let reads = 0;
  let disposed = false;
  const backend = options.backend ?? "javascript";
  channel.send = (message, callback) => {
    messages.push(message);
    if (options.send) {
      options.send(message, callback, { channel, controller });
    } else {
      queueMicrotask(() => {
        callback();
        if (message.type === "interval") {
          channel.emit("message", { type: "ack", id: message.id, ok: true });
        }
      });
    }
  };
  const client = {
    database: () => ({
      container: () => ({
        item: (id, partitionKey) => ({
          async read() {
            assert.equal(messages.length, 0, "Reporting IPC overlapped reads");
            const item = seedItem(reads);
            assert.equal(id, item.id);
            assert.equal(partitionKey, item.customerId);
            reads++;
            const readNumber = reads;
            if (options.beforeResponse) {
              await options.beforeResponse({ readNumber, controller, channel });
            }
            now += options.readSeconds ?? 1;
            if (readNumber === (options.readCount ?? 3)) {
              controller.abort({ aborted: options.interrupted === true });
            }
            if (readNumber === options.disconnectAt) channel.emit("disconnect");
            if (readNumber === options.failureAt) {
              throw Object.assign(new Error("read failed"), { code: 503 });
            }
            const result = { ...response(backend), resource: item };
            return options.decorateResponse ? options.decorateResponse(result) : result;
          },
        }),
      }),
    }),
    dispose() {
      disposed = true;
    },
  };
  try {
    await check({
      channel,
      messages,
      controller,
      get reads() {
        return reads;
      },
      get disposed() {
        return disposed;
      },
      advanceClock(seconds) {
        now += seconds;
      },
      run: () =>
        run(settings, backend, fixture, controller.signal, {
          channel,
          createClient: async () => client,
          seconds: () => now,
        }),
    });
  } finally {
    assert.equal(channel.listenerCount("message"), 0);
    assert.equal(channel.listenerCount("disconnect"), 0);
    unlinkSync(fixture);
    rmdirSync(directory);
  }
}

test("a full concurrent run retains dense histograms without losing counts or precision", () => {
  const buffer = new IntervalBuffer(121);
  for (let interval = 0; interval < 120; interval++) {
    const row = snapshot();
    row.histogram_us = Array.from({ length: 3000 }, (_, index) => [2000 + index, 1]);
    buffer.add(row);
  }
  const aggregate = aggregateIntervals([...buffer.drain()], "rust");
  assert.equal(aggregate.count, 360000);
  assert.equal(aggregate.histogram_us.length, 3000);
  assert.equal(aggregate.p99_ms, 4.969);
});

test("both implementations defer all reporting until reads stop and retain raw intervals", async () => {
  for (const backend of ["javascript", "rust"]) {
    await withWorkload({ backend, readSeconds: 0.75 }, async (worker) => {
      await worker.run();
      assert.equal(worker.reads, 3);
      assert.equal(worker.disposed, true);
      assert.deepEqual(
        worker.messages.map((message) => message.type),
        ["interval", "interval", "complete"],
      );
      const intervals = worker.messages.slice(0, -1).map((message) => message.snapshot);
      assert.deepEqual(
        intervals.map((row) => row.interval_duration_seconds),
        [1.5, 0.75],
      );
      assert.deepEqual(
        intervals.map((row) => summarize(row.histogram_us).count),
        [2, 1],
      );
      assert.deepEqual(intervals[0].first_operation, intervals[1].first_operation);
      assert.equal(intervals[1].elapsed_seconds, 2.25);
      assert.equal(worker.messages.at(-1).valid, true);
    });
  }
});

test("concurrent reads refill only completed slots, preserve identities and drain before reporting", async () => {
  for (const backend of ["javascript", "rust"]) {
    const pending = new Map();
    await withWorkload(
      {
        backend,
        config: { concurrency: 32 },
        readCount: 34,
        readSeconds: 0.01,
        beforeResponse({ readNumber }) {
          return new Promise((resolve) => pending.set(readNumber, resolve));
        },
      },
      async (worker) => {
        const running = worker.run();
        const tick = () => new Promise((resolve) => setImmediate(resolve));
        const finish = (number) => {
          pending.get(number)();
          pending.delete(number);
        };
        await tick();
        assert.equal(worker.reads, 32);
        finish(17);
        await tick();
        assert.equal(worker.reads, 33);
        assert.equal(pending.size, 32);
        finish(1);
        await tick();
        assert.equal(worker.reads, 34);
        finish(34);
        await tick();
        assert.equal(worker.reads, 34);
        assert.equal(worker.messages.length, 0);
        assert.equal(worker.disposed, false);
        for (const number of [...pending.keys()].reverse()) finish(number);
        await running;
        const intervals = worker.messages.slice(0, -1).map((message) => message.snapshot);
        assert.equal(
          intervals.reduce((sum, row) => sum + summarize(row.histogram_us).count, 0),
          34,
        );
        assert.equal(
          intervals.reduce((sum, row) => sum + row.errors, 0),
          0,
        );
        assert.equal(worker.messages.at(-1).valid, true);
        assert.equal(worker.disposed, true);
      },
    );
  }
});

test("concurrent failure or throttling stops submissions but drains outstanding reads", async () => {
  for (const failure of ["read", "throttle", "disconnect"]) {
    const pending = [];
    await withWorkload(
      {
        config: { concurrency: 4 },
        readCount: 100,
        readSeconds: 0.1,
        failureAt: failure === "read" ? 1 : undefined,
        disconnectAt: failure === "disconnect" ? 1 : undefined,
        beforeResponse() {
          return new Promise((resolve) => pending.push(resolve));
        },
        decorateResponse(result) {
          if (failure === "throttle" && result.resource.id === "order-0") {
            result.diagnostics.clientSideRequestStatistics.retryDiagnostics.failedAttempts.push({
              statusCode: 429,
            });
          }
          return result;
        },
      },
      async (worker) => {
        const running = worker.run();
        const tick = () => new Promise((resolve) => setImmediate(resolve));
        await tick();
        pending.shift()();
        await tick();
        assert.equal(worker.reads, 4);
        assert.equal(worker.disposed, false);
        assert.equal(worker.messages.length, 0);
        for (const finish of pending) finish();
        if (failure === "disconnect") {
          await assert.rejects(running, /Reporter/);
        } else {
          await running;
          const intervals = worker.messages.slice(0, -1).map((message) => message.snapshot);
          assert.equal(
            intervals.reduce((sum, row) => sum + summarize(row.histogram_us).count + row.errors, 0),
            4,
          );
          assert.equal(worker.messages.at(-1).valid, false);
        }
        assert.equal(worker.disposed, true);
      },
    );
  }
});

function rustProfile() {
  return {
    nativeCallStartMs: 0,
    nativeCallEndMs: 0,
    decodedAtMs: 0,
    parsedAtMs: 0,
    responseReadyAtMs: 0,
    adapterEndMs: 0,
    native: {
      dispatchMs: 0,
      resolveContainerMs: 0,
      driverOperationMs: 0,
      responsePreparationMs: 0,
      completionMs: 0,
      elapsedMs: 0,
    },
  };
}

test("profiling requires an explicit validated mode", () => {
  assert.equal(
    validateConfig({ ...config(), profilingMode: "stages_v1" }).profilingMode,
    "stages_v1",
  );
  assert.equal(validateConfig({ ...config(), profilingMode: "none" }).profilingMode, "none");
  assert.throws(() => validateConfig({ ...config(), profilingMode: "typo" }), /profiling mode/);
});

test("both profiled backends retain correlated reads until after reads stop", async () => {
  for (const backend of ["javascript", "rust"]) {
    await withWorkload(
      {
        backend,
        config: { profilingMode: "stages_v1" },
        decorateResponse(result) {
          if (backend === "rust") result.diagnostics.experimentalRustRead.profile = rustProfile();
          return result;
        },
      },
      async (worker) => {
        await worker.run();
        const intervals = worker.messages.filter((message) => message.type === "interval");
        let operation = 0;
        for (const { snapshot } of intervals) {
          operation = validateReadProfiles(snapshot, backend, "stages_v1", operation);
        }
        assert.equal(operation, 3);
        const profiles = intervals.flatMap(({ snapshot }) => snapshot.read_profiles);
        assert.deepEqual(
          profiles.map((profile) => profile.operation),
          [1, 2, 3],
        );
        assert.equal(worker.messages.at(-1).valid, true);
      },
    );
  }
});

test("unprofiled snapshots have no per-read traces", async () => {
  await withWorkload({}, async (worker) => {
    await worker.run();
    for (const { snapshot } of worker.messages.filter((message) => message.type === "interval")) {
      assert.equal(snapshot.read_profiles, undefined);
      validateReadProfiles(snapshot, "javascript", "none");
    }
  });
});

test("profiled failure remains invalid and does not invent successful stages", async () => {
  await withWorkload(
    { backend: "rust", config: { profilingMode: "stages_v1" }, failureAt: 1 },
    async (worker) => {
      await worker.run();
      const snapshot = worker.messages.find((message) => message.type === "interval").snapshot;
      assert.equal(validateReadProfiles(snapshot, "rust", "stages_v1"), 1);
      assert.equal(snapshot.read_profiles[0].outcome, "failure");
      assert.equal(snapshot.read_profiles[0].rust, undefined);
      assert.equal(worker.messages.at(-1).valid, false);
    },
  );
});

function profiledSnapshot() {
  return {
    ...snapshot(),
    read_profiles: [
      {
        operation: 1,
        started_seconds: 0,
        public_ms: 1,
        duration_us: 1000,
        validation_ms: 0.1,
        statistics_ms: 0.1,
        outcome: "success",
        rust: rustProfile(),
      },
    ],
  };
}

test("profile validation rejects omissions, gaps, unbounded traces and inconsistent timings", () => {
  const mutations = [
    (row) => {
      delete row.read_profiles;
    },
    (row) => {
      row.read_profiles[0].operation = 2;
    },
    (row) => {
      row.read_profiles[0].public_ms = NaN;
    },
    (row) => {
      row.read_profiles[0].duration_us = 2000;
    },
    (row) => {
      row.read_profiles[0].rust = undefined;
    },
    (row) => {
      row.read_profiles[0].rust.native.elapsedMs = 1;
    },
    (row) => {
      row.read_profiles[0].rust.nativeCallStartMs = 1;
    },
    (row) => {
      row.read_profiles[0].secret = "not-allowed";
    },
  ];
  for (const mutate of mutations) {
    const row = profiledSnapshot();
    mutate(row);
    assert.throws(() => validateReadProfiles(row, "rust", "stages_v1"));
  }
  assert.throws(() => validateReadProfiles(profiledSnapshot(), "rust", "none"), /Unprofiled/);
  const row = profiledSnapshot();
  row.read_profiles[0].operation = MAX_PROFILE_READS + 1;
  assert.throws(
    () => validateReadProfiles(row, "rust", "stages_v1", MAX_PROFILE_READS),
    /capacity/,
  );
  const original = rustProfile();
  assert.deepEqual(copyRustProfile(original, true), original);
  assert.notEqual(copyRustProfile(original, true).native, original.native);
});

test("profiled results stay two documents and reconcile raw per-read traces on readback", async (t) => {
  const rows = [];
  const profiledIdentity = { ...identity, profiling_mode: "stages_v1" };
  const reporter = reporterFor(
    t,
    {
      items: {
        async create(row) {
          rows.push(structuredClone(row));
          return { statusCode: 201, requestCharge: 1 };
        },
      },
    },
    profiledIdentity,
  );
  await reporter.interval(profiledSnapshot());
  assert.equal(rows.length, 0);
  await reporter.complete(true);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].read_profiles, undefined);
  const report = validateResults(rows, [profiledIdentity], path.dirname(reporter.logfile))[0];
  assert.equal(report.profiling_mode, "stages_v1");
  assert.equal(JSON.parse(readFileSync(reporter.artifactFile, "utf8")).read_profiles.length, 1);
  assert.throws(() =>
    validateResults(
      rows,
      [{ ...identity, profiling_mode: "none" }],
      path.dirname(reporter.logfile),
    ),
  );
});

test("post-read persistence and completion finish before the launcher advances", async (t) => {
  const launcher = mockLauncher();
  const rows = [];
  await withWorkload(
    {
      backend: "rust",
      send(message, callback) {
        launcher.child.emit("message", message);
        queueMicrotask(callback);
      },
    },
    async (worker) => {
      launcher.child.send = (message, callback) => {
        worker.channel.emit("message", message);
        callback?.();
      };
      let releaseCompletion;
      const completionGate = new Promise((resolve) => {
        releaseCompletion = resolve;
      });
      const reporter = reporterFor(
        t,
        {
          items: {
            async create(row) {
              assert.equal(worker.reads, 3, "Persistence overlapped reads");
              worker.advanceClock(10);
              if (row.record_type === "completion") await completionGate;
              rows.push(structuredClone(row));
              return { statusCode: 201, requestCharge: 3 };
            },
          },
        },
        identity,
      );
      let advanced = false;
      const parent = launcher
        .runChild("config", "rust", "fixture", "log", 60, 30, reporter)
        .then(() => {
          advanced = true;
          return null;
        });
      await worker.run();
      launcher.child.emit("close", 0, null);
      await Promise.resolve();
      assert.equal(advanced, false);
      assert.equal(rows.length, 1);
      releaseCompletion();
      await parent;
      assert.equal(advanced, true);
      assert.equal(rows.length, 2);
      const result = validateResults(rows, [identity], path.dirname(reporter.logfile))[0];
      assert.equal(result.count, 3);
      assert.equal(result.interval_seconds, 3);
      assert.equal(result.reporting_mode, "after_reads");
      const raw = readFileSync(reporter.artifactFile, "utf8").trimEnd().split("\n").map(JSON.parse);
      const sent = worker.messages.filter((message) => message.type === "interval");
      assert.equal(raw.length, sent.length);
      for (const [index, row] of raw.entries()) {
        for (const [field, value] of Object.entries(sent[index].snapshot)) {
          assert.deepEqual(row[field], value, `Raw interval lost ${field}`);
        }
      }
    },
  );
});

test("post-read transfer waits for each persistence acknowledgement", async () => {
  let worker;
  const waiting = [];
  await withWorkload(
    {
      send(message, callback) {
        callback();
        if (message.type === "interval") waiting.push(message.id);
      },
    },
    async (value) => {
      worker = value;
      const running = worker.run();
      await new Promise((resolve) => setImmediate(resolve));
      assert.equal(worker.reads, 3);
      assert.equal(worker.messages.length, 1);
      for (let id = 1; id <= 3; id++) {
        assert.deepEqual(waiting, [id]);
        waiting.shift();
        worker.channel.emit("message", { type: "ack", id, ok: true });
        await new Promise((resolve) => setImmediate(resolve));
      }
      await running;
      assert.equal(worker.messages.at(-1).type, "complete");
    },
  );
});

test("read failures and interruptions retain buffered samples but cannot complete as valid", async () => {
  for (const options of [{ failureAt: 2 }, { interrupted: true }]) {
    await withWorkload(options, async (worker) => {
      await worker.run();
      assert.equal(worker.messages.at(-1).valid, false);
      assert.equal(worker.disposed, true);
      const intervals = worker.messages.slice(0, -1).map((message) => message.snapshot);
      assert.equal(
        intervals.reduce((sum, row) => sum + row.errors, 0),
        options.failureAt ? 1 : 0,
      );
      assert.equal(intervals.length, options.failureAt ? 2 : 3);
    });
  }
});

test("interruptions during deferred reporting still invalidate completion", async () => {
  await withWorkload(
    {
      send(message, callback, { channel, controller }) {
        queueMicrotask(() => {
          callback();
          if (message.type === "interval") {
            controller.signal.reason.aborted = true;
            channel.emit("message", { type: "ack", id: message.id, ok: true });
          }
        });
      },
    },
    async (worker) => {
      await worker.run();
      assert.equal(worker.messages.at(-1).valid, false);
    },
  );
});

test("deferred acknowledgement, send, and disconnect failures prevent completion", async () => {
  for (const failure of ["nack", "wrong-id", "duplicate-ack", "send", "throw", "disconnect"]) {
    await withWorkload(
      {
        send(message, callback, { channel }) {
          if (failure === "throw") throw new Error("IPC send failed");
          queueMicrotask(() => {
            if (failure === "send") return callback(new Error("IPC send failed"));
            callback();
            if (failure === "disconnect") return channel.emit("disconnect");
            channel.emit("message", {
              type: "ack",
              id: message.id + Number(failure === "wrong-id"),
              ok: failure !== "nack",
            });
            if (failure === "duplicate-ack") {
              channel.emit("message", { type: "ack", id: message.id, ok: true });
            }
          });
        },
      },
      async (worker) => {
        await assert.rejects(worker.run(), /Reporter|Reporting|IPC/);
        assert.equal(worker.messages.length, 1);
        assert.equal(worker.messages[0].type, "interval");
        assert.equal(worker.disposed, true);
      },
    );
  }
});

test("disconnects during reads and buffer overflow fail without emitting success records", async () => {
  for (const options of [
    { disconnectAt: 1 },
    { config: { durationSeconds: 1, reportIntervalSeconds: 1 } },
  ]) {
    await withWorkload(options, async (worker) => {
      await assert.rejects(worker.run(), /Reporter|capacity/);
      assert.equal(worker.messages.length, options.disconnectAt ? 0 : 2);
      assert.ok(worker.messages.every((message) => message.type === "interval"));
      assert.equal(worker.disposed, true);
    });
  }
});

test("completion IPC failures cannot leave the workload successful", async () => {
  await withWorkload(
    {
      send(message, callback, { channel }) {
        queueMicrotask(() => {
          if (message.type === "complete") return callback(new Error("Completion send failed"));
          callback();
          channel.emit("message", { type: "ack", id: message.id, ok: true });
        });
      },
    },
    async (worker) => {
      await assert.rejects(worker.run(), /Completion send failed/);
      assert.equal(worker.disposed, true);
    },
  );
});

const identity = {
  run_id: "run",
  workload_id: "read-rust-r1-run",
  process_id: "process",
  partition_key: "process",
  config_backend: "rust",
  reporting_mode: "after_reads",
  reporting_format: "aggregate_v1",
  repetition: 1,
  configuration_sha256: "a".repeat(64),
  environment: { hostname: "offline-test", capacity: { workload: 1000, results: 400 } },
};

function snapshot() {
  const stats = new Stats(0);
  stats.success(1_000_000n, evidence());
  return stats.drain(15);
}

function reporterFor(t, container, selectedIdentity = identity) {
  const directory = mkdtempSync(path.join(os.tmpdir(), "aggregate-read-"));
  t.after(() => {
    for (const name of readdirSync(directory)) unlinkSync(path.join(directory, name));
    rmdirSync(directory);
  });
  return new Reporter(
    container,
    selectedIdentity,
    path.join(directory, `${selectedIdentity.workload_id}.jsonl`),
  );
}

test("reporter saves raw intervals locally and only two Cosmos records, then verifies both", async (t) => {
  const rows = [];
  const reporter = reporterFor(
    t,
    {
      items: {
        async create(row) {
          rows.push(structuredClone(row));
          return { statusCode: 201, requestCharge: 3 };
        },
      },
    },
    identity,
  );
  await reporter.interval(snapshot());
  assert.equal(rows.length, 0);
  assert.equal(JSON.parse(readFileSync(reporter.artifactFile, "utf8")).interval_number, 1);
  assert.equal(await reporter.complete(true), true);
  assert.equal(rows[0].record_type, "measurement");
  assert.equal(rows[1].record_type, "completion");
  assert.equal(rows.length, 2);
  assert.equal(rows[1].summary_count, 1);
  assert.equal(rows[1].measurement_write_ru, 3);
  assert.deepEqual(
    reporter.writes.map((write) => write.request_charge),
    [3, 3],
  );
  assert.ok(reporter.writes.every((write) => write.utf8_bytes > 0));
  assert.equal(validateResults(rows, [identity], path.dirname(reporter.logfile))[0].count, 1);
  for (const mutate of [
    (data) => {
      data.pop();
    },
    (data) => {
      data.push(data[0]);
    },
    (data) => {
      data[0].interval_number = 2;
    },
    (data) => {
      data[0].count = 10;
    },
    (data) => {
      data[0].transport_verified_count = 0;
    },
    (data) => {
      data[0].observed_429 = 1;
    },
    (data) => {
      data[1].total_count = 2;
    },
    (data) => {
      data[1].valid = false;
    },
    (data) => {
      data[0].configuration_sha256 = "b".repeat(64);
    },
    (data) => {
      data[0].environment.hostname = "another-host";
    },
    (data) => {
      data[0].reporting_mode = "during_reads";
    },
    (data) => {
      data[0].reporting_format = undefined;
    },
    (data) => {
      data[1].summary_count = 2;
    },
    (data) => {
      data[0].interval_artifact.sha256 = "b".repeat(64);
    },
    (data) => {
      data[0].interval_artifact.filename = "../outside.jsonl";
      data[1].interval_artifact.filename = "../outside.jsonl";
    },
    (data) => {
      data[0].interval_started_at_utc = "not-a-date";
    },
    (data) => {
      data[0].interval_ended_at_utc = data[0].interval_started_at_utc;
    },
    (data) => {
      data[1].attempt_evidence.groups[0].count++;
    },
    (data) => {
      data[0].attempt_evidence.population = "javascript_failed_attempts";
    },
    (data) => {
      data[0].attempt_evidence.groups[0].status_code = 429;
    },
  ]) {
    const changed = structuredClone(rows);
    mutate(changed);
    assert.throws(() => validateResults(changed, [identity], path.dirname(reporter.logfile)));
  }
});

test("failed reporting prevents a success-shaped completion", async (t) => {
  const reporter = reporterFor(
    t,
    {
      items: {
        async create() {
          throw new Error("write failed");
        },
      },
    },
    identity,
  );
  await reporter.interval(snapshot());
  await assert.rejects(reporter.complete(true), /write failed/);
  await assert.rejects(reporter.complete(true), /prevents completion/);
});

test("requested Rust worker count is persisted and checked in results and raw intervals", async (t) => {
  const rows = [];
  const selectedIdentity = { ...identity, config_rust_worker_threads: 1 };
  const reporter = reporterFor(
    t,
    {
      items: {
        async create(row) {
          rows.push(structuredClone(row));
          return { statusCode: 201, requestCharge: 3 };
        },
      },
    },
    selectedIdentity,
  );
  await reporter.interval(snapshot());
  assert.equal(
    JSON.parse(readFileSync(reporter.artifactFile, "utf8")).config_rust_worker_threads,
    1,
  );
  assert.equal(await reporter.complete(true), true);
  assert.ok(rows.every((row) => row.config_rust_worker_threads === 1));
  assert.equal(
    validateResults(rows, [selectedIdentity], path.dirname(reporter.logfile))[0].count,
    1,
  );
  for (const index of [0, 1]) {
    const changed = structuredClone(rows);
    changed[index].config_rust_worker_threads = 4;
    assert.throws(
      () => validateResults(changed, [selectedIdentity], path.dirname(reporter.logfile)),
      /config_rust_worker_threads/,
    );
  }
});

test("recorded operation failures stay in raw data and the invalid aggregate", async (t) => {
  const rows = [];
  const reporter = reporterFor(
    t,
    {
      items: {
        async create(row) {
          rows.push(row);
          return { statusCode: 201, requestCharge: 3 };
        },
      },
    },
    identity,
  );
  const stats = new Stats(0);
  stats.failure(1_000_000n, { status_code: 404 });
  await reporter.interval(stats.drain(1));
  assert.equal(await reporter.complete(true), false);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].error_details[0].interval_number, 1);
  assert.equal(rows[0].error_details[0].status_code, 404);
  assert.equal(rows[1].total_errors, 1);
  assert.equal(rows[1].valid, false);
  assert.throws(
    () => validateResults(rows, [identity], path.dirname(reporter.logfile)),
    /usable comparison/,
  );
});

test("120 raw intervals produce exactly one aggregate and one completion without losing samples", async (t) => {
  const rows = [];
  const reporter = reporterFor(t, {
    items: {
      async create(row) {
        rows.push(structuredClone(row));
        return { statusCode: 201, requestCharge: row.record_type === "measurement" ? 7 : 2 };
      },
    },
  });
  const stats = new Stats(0);
  for (let interval = 1; interval <= 120; interval++) {
    stats.success(BigInt(interval) * 1000n, evidence());
    await reporter.interval(stats.drain(interval));
  }
  assert.equal(rows.length, 0);
  assert.equal(readFileSync(reporter.artifactFile, "utf8").trimEnd().split("\n").length, 120);
  assert.equal(await reporter.complete(true), true);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].interval_count, 120);
  assert.equal(rows[0].count, 120);
  assert.equal(rows[0].histogram_us.length, 120);
  assert.equal(rows[0].p99_ms, 0.119);
  assert.equal(rows[1].summary_count, 1);
  assert.equal(rows[1].measurement_write_ru, 7);
  assert.deepEqual(
    reporter.writes.map((write) => write.request_charge),
    [7, 2],
  );
  const report = validateResults(rows, [identity], path.dirname(reporter.logfile))[0];
  assert.equal(report.count, 120);
  assert.equal(report.interval_seconds, 120);
  assert.equal(report.interval_artifact.sha256, sha256(readFileSync(reporter.artifactFile)));
  await assert.rejects(reporter.complete(true), /duplicate completion/);
  await assert.rejects(reporter.interval(snapshot()), /already completing/);
  assert.equal(rows.length, 2);
});

test("aggregate percentiles use pooled histogram counts, not averages of percentiles", () => {
  const stats = new Stats(0);
  for (let i = 0; i < 99; i++) stats.success(1_000_000n, evidence());
  stats.success(100_000_000n, evidence());
  const first = stats.drain(10);
  stats.success(10_000_000n, evidence());
  const second = stats.drain(11);
  const aggregate = aggregateIntervals([first, second], "rust");
  assert.equal(aggregate.count, 101);
  assert.equal(aggregate.p99_ms, 10);
  assert.equal(aggregate.interval_duration_seconds, 11);
  assert.equal(aggregate.transport_verified_count, 101);
  assert.equal(aggregate.attempt_evidence.groups[0].count, 101);
  assert.deepEqual(aggregate.first_operation, first.first_operation);
});

test("raw artifact tampering or write failure prevents either Cosmos document", async (t) => {
  let creates = 0;
  const container = {
    items: {
      async create() {
        creates++;
        return { statusCode: 201, requestCharge: 1 };
      },
    },
  };
  const tampered = reporterFor(t, container);
  await tampered.interval(snapshot());
  const original = readFileSync(tampered.artifactFile, "utf8");
  const changed = original.replace("[[1000,1]]", "[[2000,1]]");
  assert.notEqual(changed, original);
  assert.equal(Buffer.byteLength(changed), Buffer.byteLength(original));
  writeFileSync(tampered.artifactFile, changed);
  await assert.rejects(tampered.complete(true), /artifact changed/);

  const collision = reporterFor(t, container);
  writeFileSync(collision.artifactFile, "preserve");
  await assert.rejects(collision.interval(snapshot()), { code: "EEXIST" });
  assert.equal(readFileSync(collision.artifactFile, "utf8"), "preserve");
  await assert.rejects(collision.complete(true), /prevents completion/);

  const bounded = reporterFor(t, container);
  bounded.artifactBytes = MAX_ARTIFACT_BYTES;
  await assert.rejects(bounded.interval(snapshot()), /artifact capacity/);
  const empty = reporterFor(t, container);
  await assert.rejects(empty.complete(true), /Missing interval artifact/);
  assert.equal(creates, 0);
});

test("UTF-8 aggregate size overflow fails without clipping or creating documents", async (t) => {
  let creates = 0;
  const reporter = reporterFor(
    t,
    {
      items: {
        async create() {
          creates++;
          return { statusCode: 201, requestCharge: 1 };
        },
      },
    },
    { ...identity, padding: "\u00e9".repeat(MAX_RESULT_BYTES / 2) },
  );
  await reporter.interval(snapshot());
  assert.ok(reporter.artifactBytes > MAX_RESULT_BYTES);
  await assert.rejects(reporter.complete(true), /UTF-8 size limit/);
  assert.equal(creates, 0);
});

test("readback rejects missing or altered local intervals and altered aggregate summaries", async (t) => {
  const rows = [];
  const reporter = reporterFor(t, {
    items: {
      async create(row) {
        rows.push(structuredClone(row));
        return { statusCode: 201, requestCharge: 1 };
      },
    },
  });
  await reporter.interval(snapshot());
  await reporter.complete(true);
  const directory = path.dirname(reporter.logfile);
  const original = readFileSync(reporter.artifactFile);
  assert.throws(
    () => validateResults(rows, [{ ...identity, reporting_format: "aggregate_v2" }], directory),
    /Unsupported reporting format/,
  );
  const legacyIdentity = { ...identity };
  delete legacyIdentity.reporting_format;
  assert.throws(() => validateResults(rows, [legacyIdentity]), /Mismatched reporting_format/);
  const changedRows = structuredClone(rows);
  changedRows[0].p99_ms++;
  assert.throws(() => validateResults(changedRows, [identity], directory), /Aggregate differs/);
  const changed = original.toString("utf8").replace("[[1000,1]]", "[[2000,1]]");
  writeFileSync(reporter.artifactFile, changed);
  assert.throws(() => validateResults(rows, [identity], directory), /artifact hash changed/);
  const corruptInterval = JSON.parse(original.toString("utf8"));
  corruptInterval.interval_number = 2;
  const corruptBytes = Buffer.from(`${JSON.stringify(corruptInterval)}\n`);
  writeFileSync(reporter.artifactFile, corruptBytes);
  const matchingHashRows = structuredClone(rows);
  for (const row of matchingHashRows) {
    row.interval_artifact.sha256 = sha256(corruptBytes);
    row.interval_artifact.bytes = corruptBytes.length;
  }
  assert.throws(() => validateResults(matchingHashRows, [identity], directory));
  writeFileSync(reporter.artifactFile, original);
  assert.throws(() => validateResults(rows, [identity]), /artifact directory/);
  unlinkSync(reporter.artifactFile);
  assert.throws(() => validateResults(rows, [identity], directory), { code: "ENOENT" });
});

test("completion write failure preserves raw evidence but cannot validate the lone aggregate", async (t) => {
  const rows = [];
  const reporter = reporterFor(t, {
    items: {
      async create(row) {
        if (row.record_type === "completion") throw new Error("completion write failed");
        rows.push(structuredClone(row));
        return { statusCode: 201, requestCharge: 5 };
      },
    },
  });
  await reporter.interval(snapshot());
  await assert.rejects(reporter.complete(true), /completion write failed/);
  assert.equal(rows.length, 1);
  assert.ok(readFileSync(reporter.artifactFile).length > 0);
  assert.throws(
    () => validateResults(rows, [identity], path.dirname(reporter.logfile)),
    /one aggregate/,
  );
});

test("deadline expiry after the aggregate request prevents a completion request", async (t) => {
  const rows = [];
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  const reporter = reporterFor(t, {
    items: {
      async create(row) {
        rows.push(row);
        await gate;
        return { statusCode: 201, requestCharge: 5 };
      },
    },
  });
  await reporter.interval(snapshot());
  const completing = reporter.complete(true);
  reporter.failed = true;
  release();
  await assert.rejects(completing, /deadline expired/);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].record_type, "measurement");
});

test("an abort between aggregate and completion writes marks completion invalid", async (t) => {
  const rows = [];
  const reporter = reporterFor(t, {
    items: {
      async create(row) {
        rows.push(structuredClone(row));
        if (row.record_type === "measurement") reporter.aborted = true;
        return { statusCode: 201, requestCharge: 5 };
      },
    },
  });
  await reporter.interval(snapshot());
  assert.equal(await reporter.complete(true), false);
  assert.equal(rows.length, 2);
  assert.equal(rows[1].valid, false);
});

test("missing write-charge evidence prevents a successful completion", async (t) => {
  let creates = 0;
  const reporter = reporterFor(t, {
    items: {
      async create() {
        creates++;
        return { statusCode: 201 };
      },
    },
  });
  await reporter.interval(snapshot());
  await assert.rejects(reporter.complete(true), /request charge/);
  assert.equal(creates, 1);
});

test("historical interval-format records remain readable without new artifact requirements", () => {
  const legacy = { ...identity };
  delete legacy.reporting_format;
  const interval = snapshot();
  const rows = [
    {
      ...legacy,
      ...interval,
      ...summarize(interval.histogram_us),
      operation: "ReadItem",
      record_type: "measurement",
      id: "process-1-measurement",
      interval_id: "process-1",
    },
    {
      ...legacy,
      record_type: "completion",
      id: "process-completion",
      interval_count: 1,
      summary_count: 1,
      total_count: 1,
      total_errors: 0,
      observed_429: 0,
      valid: true,
      completed_at_utc: new Date().toISOString(),
      attempt_evidence: interval.attempt_evidence,
    },
  ];
  assert.equal(validateResults(rows, [legacy])[0].count, 1);
  assert.throws(() => validateResults(rows, [identity]), /Mismatched reporting_format/);
});

test("error records omit raw SDK messages, stacks and request data", () => {
  const error = Object.assign(new Error("AccountKey=do-not-log"), { code: 429 });
  assert.deepEqual(safeError(error), { name: "Error", status_code: 429, code: null });
  const capacity = new assert.AssertionError({ message: "Deferred histogram capacity exceeded" });
  assert.deepEqual(safeError(capacity), {
    name: "AssertionError",
    status_code: null,
    code: "WORKLOAD_BUFFERED_HISTOGRAM_CAPACITY",
  });
  const unknown = new assert.AssertionError({ message: "AccountKey=do-not-log" });
  assert.equal(safeError(unknown).code, "ERR_ASSERTION");
  assert.ok(!JSON.stringify(safeError(unknown)).includes("do-not-log"));
});

function mockLauncher() {
  const child = new EventEmitter();
  child.connected = true;
  child.sent = [];
  child.send = (message) => child.sent.push(message);
  child.kill = () => {
    child.connected = false;
    child.emit("close", null, "SIGKILL");
  };
  const timers = [];
  const runtime = {
    fork: (filename, args, options) => {
      child.forked = true;
      child.arguments = args;
      child.options = options;
      return child;
    },
    openSync: () => 1,
    closeSync() {},
    setTimeout(callback, milliseconds) {
      timers.push(callback);
      callback.milliseconds = milliseconds;
      return callback;
    },
    clearTimeout() {},
  };
  return {
    child,
    timers,
    runChild: (...args) => runChild(...args.slice(0, 7), args[7] ?? {}, runtime),
  };
}

test("launcher sets worker count only for an explicitly selected measured Rust child", async () => {
  for (const rustWorkerThreads of [undefined, 1, 2, 4]) {
    const mock = mockLauncher();
    const running = mock.runChild("config", "rust", "fixture", "log", 60, 30, undefined, {
      rustWorkerThreads,
    });
    assert.equal(
      mock.child.options.env.TOKIO_WORKER_THREADS,
      rustWorkerThreads === undefined ? undefined : String(rustWorkerThreads),
    );
    assert.equal(process.env.TOKIO_WORKER_THREADS, undefined);
    mock.child.emit("close", 0, null);
    await running;
  }
  for (const mode of ["javascript", "qualify"]) {
    const mock = mockLauncher();
    const running = mock.runChild("config", mode, "fixture", "log", 60, 30, undefined);
    assert.equal(mock.child.options.env.TOKIO_WORKER_THREADS, undefined);
    mock.child.emit("close", 0, null);
    await running;
    const invalid = mockLauncher();
    await assert.rejects(
      invalid.runChild("config", mode, "fixture", "log", 60, 30, undefined, {
        rustWorkerThreads: 1,
      }),
      /only to measured Rust/,
    );
    assert.notEqual(invalid.child.forked, true);
  }
});

test("launcher rejects invalid or unrecorded inherited worker counts before forking", async () => {
  for (const rustWorkerThreads of [0, 3, 8, "1", null, true]) {
    const mock = mockLauncher();
    await assert.rejects(
      mock.runChild("config", "rust", "fixture", "log", 60, 30, undefined, { rustWorkerThreads }),
      /Rust worker threads/,
    );
    assert.notEqual(mock.child.forked, true);
  }
  const previous = process.env.TOKIO_WORKER_THREADS;
  try {
    for (const inherited of ["4", ""]) {
      process.env.TOKIO_WORKER_THREADS = inherited;
      const mock = mockLauncher();
      await assert.rejects(
        mock.runChild("config", "rust", "fixture", "log", 60, 30, undefined, {
          rustWorkerThreads: 1,
        }),
        /TOKIO_WORKER_THREADS must be unset/,
      );
      assert.notEqual(mock.child.forked, true);
    }
  } finally {
    if (previous === undefined) delete process.env.TOKIO_WORKER_THREADS;
    else process.env.TOKIO_WORKER_THREADS = previous;
  }
});

test("launcher waits for reporting completion and rejects missing completion", async () => {
  const mock = mockLauncher();
  const reporter = {
    async complete() {
      return true;
    },
  };
  const running = mock.runChild("config", "rust", "fixture", "log", 60, 30, reporter);
  mock.timers[0]();
  assert.equal(mock.child.sent[0].type, "stop");
  mock.child.emit("message", { type: "complete", valid: true });
  mock.child.emit("close", 0, null);
  await running;
  const missing = mockLauncher();
  const failed = missing.runChild("config", "rust", "fixture", "log", 60, 30, reporter);
  missing.child.emit("close", 0, null);
  await assert.rejects(failed, /without completion/);
});

test("shutdown deadline rejects a hung reporter even after the workload exits", async () => {
  const mock = mockLauncher();
  const reporter = {
    async complete() {
      return new Promise(() => {});
    },
  };
  const running = mock.runChild("config", "rust", "fixture", "log", 60, 30, reporter);
  mock.child.emit("message", { type: "complete", valid: true });
  await Promise.resolve();
  mock.child.emit("close", 0, null);
  mock.timers[1]();
  await assert.rejects(running, /shutdown deadline/);
  assert.equal(reporter.failed, true);
});

test("JavaScript baseline rejects a Rust-marked response even with standard diagnostics", () => {
  const value = response("javascript");
  value.diagnostics.experimentalRustRead = response().diagnostics.experimentalRustRead;
  assert.throws(() => inspectRead(value, 204, "javascript"), /baseline returned Rust/);
});

test("attempt evidence retains non-429 failures without mixing counter populations", () => {
  const value = response();
  const requests = value.diagnostics.experimentalRustRead.requests;
  requests.requests.unshift({ pipeline: "data_plane", transport: "gateway_v2", statusCode: 503 });
  requests.requests.push({ pipeline: "metadata", transport: "gateway", statusCode: 200 });
  requests.requestCount = requests.retainedRequestCount = 3;
  const observed = inspectRead(value, 204, "rust");
  const stats = new Stats(0);
  stats.success(1000n, observed);
  stats.success(2000n, observed);
  const first = stats.drain(1);
  assert.equal(first.observed_429, 0);
  assert.equal(first.attempt_evidence.population, "rust_retained_requests");
  assert.deepEqual(
    first.attempt_evidence.groups.map((group) => [
      group.pipeline,
      group.transport,
      group.status_code,
      group.count,
    ]),
    [
      ["data_plane", "gateway_v2", 200, 2],
      ["data_plane", "gateway_v2", 503, 2],
      ["metadata", "gateway", 200, 2],
    ],
  );
  stats.success(1000n, observed);
  const second = stats.drain(2);
  assert.equal(first.attempt_evidence.groups[0].count, 2);
  assert.equal(second.attempt_evidence.groups[0].count, 1);
  const javascript = evidence("javascript").attemptEvidence;
  assert.deepEqual(javascript.groups, []);
  assert.throws(() => mergeAttemptEvidence([javascript], "rust"), /populations/);
});

test("attempt evidence is bounded and counts cannot silently overflow", () => {
  const sample = evidence().attemptEvidence;
  sample.groups = Array.from({ length: MAX_ATTEMPT_GROUPS + 1 }, (_, index) => ({
    pipeline: "data_plane",
    transport: "gateway_v2",
    status_code: 200,
    sub_status_code: index,
    count: 1,
  }));
  assert.throws(() => mergeAttemptEvidence([sample], "rust"), /capacity/);
  sample.groups = [{ ...sample.groups[0], count: Number.MAX_SAFE_INTEGER }];
  assert.throws(() => mergeAttemptEvidence([sample, sample], "rust"), /overflow/);
});

test("UTC intervals share a monotonic origin and remain contiguous after drains", () => {
  const origin = Date.UTC(2026, 10, 7);
  const stats = new Stats(100, origin);
  stats.success(1000n, evidence());
  const first = stats.drain(115.125);
  stats.success(1000n, evidence());
  const second = stats.drain(130.5);
  assert.equal(first.measurement_started_at_utc, "2026-11-07T00:00:00.000Z");
  assert.equal(first.interval_started_at_utc, first.measurement_started_at_utc);
  assert.equal(first.interval_ended_at_utc, "2026-11-07T00:00:15.125Z");
  assert.equal(second.interval_started_at_utc, first.interval_ended_at_utc);
  assert.equal(second.interval_ended_at_utc, "2026-11-07T00:00:30.500Z");
});

test("configuration changes are rejected before launching another child", async () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "cosmos-read-config-"));
  const filename = path.join(directory, "config.json");
  try {
    const bytes = JSON.stringify(config());
    const digest = sha256(bytes);
    writeFileSync(filename, bytes);
    assert.equal(readConfig(filename, digest).reportIntervalSeconds, 15);
    const accepted = mockLauncher();
    const qualification = accepted.runChild(
      filename,
      "qualify",
      "fixture",
      "log",
      60,
      30,
      undefined,
      { configSha256: digest },
    );
    assert.equal(accepted.child.arguments[3], digest);
    accepted.child.emit("close", 0, null);
    await qualification;
    const changed = config();
    changed.reportIntervalSeconds = 5;
    writeFileSync(filename, JSON.stringify(changed));
    assert.throws(() => readConfig(filename, digest), /configuration changed/);
    const mock = mockLauncher();
    await assert.rejects(
      mock.runChild(filename, "rust", "fixture", "log", 60, 30, {}, { configSha256: digest }),
      /configuration changed/,
    );
    assert.notEqual(mock.child.forked, true);
  } finally {
    unlinkSync(filename);
    rmdirSync(directory);
  }
});

test("environment snapshot records selected host/runtime fields without copying secrets", () => {
  const snapshot = captureEnvironment();
  assert.equal(snapshot.node, process.version);
  assert.equal(snapshot.hostname, os.hostname());
  assert.ok(snapshot.cpu_count > 0 && snapshot.total_memory_bytes > 0);
  assert.ok(snapshot.sdk_version && snapshot.kernel && snapshot.captured_at_utc);
  assert.equal(Object.hasOwn(snapshot, "ACCOUNT_KEY"), false);
  assert.equal(Object.hasOwn(snapshot, "env"), false);
});

test("capacity snapshot reads dedicated offers and fails on drift or unsupported capacity", async () => {
  const settings = config();
  const offers = { workload: { offerThroughput: 1000 }, results: { offerThroughput: 400 } };
  const calls = [];
  let statusCode = 200;
  const client = {
    database(database) {
      const kind = database === settings.workload.database ? "workload" : "results";
      assert.equal(database, settings[kind].database);
      return {
        container(container) {
          assert.equal(container, settings[kind].container);
          return {
            async readOffer() {
              calls.push(kind);
              return {
                statusCode,
                resource: offers[kind] ? { content: offers[kind] } : undefined,
              };
            },
          };
        },
      };
    },
  };
  const snapshot = await captureCapacity(client, settings);
  assert.deepEqual(calls, ["workload", "results"]);
  assert.equal(snapshot.workload.ru_per_second, 1000);
  assert.equal(snapshot.results.mode, "manual");
  offers.workload.offerThroughput = 400;
  await assert.rejects(captureCapacity(client, settings), /Throughput changed/);
  offers.workload = { offerThroughput: 1000, offerAutopilotSettings: { maxThroughput: 1000 } };
  await assert.rejects(captureCapacity(client, settings), /manual throughput/);
  offers.workload = { offerThroughput: 1000, offerIsRUPerMinuteThroughputEnabled: true };
  await assert.rejects(captureCapacity(client, settings));
  statusCode = 500;
  await assert.rejects(captureCapacity(client, settings), /Cannot read container throughput/);
  statusCode = 200;
  offers.workload = null;
  await assert.rejects(captureCapacity(client, settings), /Dedicated container/);
});

test("signal handlers preserve the first interrupt and remove their listeners", () => {
  const target = new EventEmitter();
  const control = installSignalHandlers(target);
  target.emit("SIGINT");
  target.emit("SIGTERM");
  assert.equal(control.signal.reason.code, "WORKLOAD_ABORTED");
  assert.equal(control.signal.reason.signal, "SIGINT");
  control.dispose();
  assert.equal(target.listenerCount("SIGINT"), 0);
  assert.equal(target.listenerCount("SIGTERM"), 0);
  const second = installSignalHandlers(target);
  target.emit("SIGTERM");
  assert.equal(second.signal.reason.signal, "SIGTERM");
  second.dispose();
});

test("capacity inspection stops before another request after interruption", async () => {
  const controller = new AbortController();
  const reason = new Error("interrupted");
  let requests = 0;
  const client = {
    database: () => ({
      container: () => ({
        async readOffer() {
          requests++;
          controller.abort(reason);
          return { statusCode: 200, resource: { content: { offerThroughput: 1000 } } };
        },
      }),
    }),
  };
  await assert.rejects(
    captureCapacity(client, config(), controller.signal),
    (error) => error === reason,
  );
  assert.equal(requests, 1);
});

test("abort drains child reporting but rejects the run and marks completion unusable", async () => {
  const mock = mockLauncher();
  const controller = new AbortController();
  const calls = [];
  const reporter = {
    async interval() {
      calls.push("interval");
    },
    async complete(valid) {
      calls.push(valid);
      return valid;
    },
  };
  const running = mock.runChild("config", "rust", "fixture", "log", 60, 30, reporter, {
    signal: controller.signal,
  });
  const reason = Object.assign(new Error("stopped"), { code: "WORKLOAD_ABORTED" });
  controller.abort(reason);
  assert.deepEqual(mock.child.sent[0], { type: "stop", aborted: true });
  assert.equal(mock.timers[2].milliseconds, 30000);
  mock.child.emit("message", { type: "interval", id: 1, snapshot: {} });
  mock.child.emit("message", { type: "complete", valid: true });
  mock.child.emit("close", 0, null);
  await assert.rejects(running, (error) => error === reason);
  assert.deepEqual(calls, ["interval", false]);
});

test("abort deadline kills a hung child or reporter without waiting for the run budget", async () => {
  for (const mode of ["rust", "qualify"]) {
    const mock = mockLauncher();
    const controller = new AbortController();
    const reporter =
      mode === "rust"
        ? {
            async complete() {
              return new Promise(() => {});
            },
          }
        : undefined;
    const running = mock.runChild("config", mode, "fixture", "log", 3600, 30, reporter, {
      signal: controller.signal,
    });
    if (reporter) {
      mock.child.emit("message", { type: "complete", valid: true });
      await Promise.resolve();
    }
    const reason = new Error("interrupted");
    controller.abort(reason);
    mock.timers[2]();
    await assert.rejects(running, (error) => error === reason);
    assert.equal(mock.child.connected, false);
    if (reporter) assert.equal(reporter.failed, true);
  }
});

test("already-aborted work never launches and abort bounds setup/readback operations", async () => {
  const controller = new AbortController();
  const reason = new Error("interrupted");
  controller.abort(reason);
  const mock = mockLauncher();
  await assert.rejects(
    mock.runChild("config", "rust", "fixture", "log", 60, 30, {}, { signal: controller.signal }),
    (error) => error === reason,
  );
  assert.notEqual(mock.child.forked, true);
  const active = new AbortController();
  const operation = withDeadline(() => new Promise(() => {}), 30, active.signal);
  active.abort(reason);
  await assert.rejects(operation, (error) => error === reason);
});
