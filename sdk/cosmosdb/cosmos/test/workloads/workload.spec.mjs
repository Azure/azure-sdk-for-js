// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { EventEmitter } from "node:events";
import { fileURLToPath } from "node:url";
import { validateConfig, seedItem, inspectRead, safeError } from "./common.mjs";
import { Stats, summarize, mergeHistograms, MAX_BUCKETS } from "./stats.mjs";
import { Reporter } from "./reporter.mjs";
import { validateResults } from "./report.mjs";
import { timedRead } from "./workload.mjs";
import { runChild } from "./launch.mjs";

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
  ];
  for (const mutate of mutations) {
    const value = config();
    mutate(value);
    assert.throws(() => validateConfig(value));
  }
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
  stats.success(1_234_567n, { requestCharge: 1, observed429: 0, transportVerified: true });
  stats.failure(2_000_000n, { status_code: 503 });
  const first = stats.drain(25);
  assert.deepEqual(first.histogram_us, [[1234, 1]]);
  assert.equal(first.interval_duration_seconds, 15);
  assert.equal(first.errors, 1);
  assert.equal(stats.drain(26), null);
  stats.success(5_000_000n, { requestCharge: 2, observed429: 0, transportVerified: true });
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
  const evidence = { requestCharge: 1, observed429: 0, transportVerified: false };
  for (let index = 1; index <= MAX_BUCKETS; index++) stats.success(BigInt(index) * 1000n, evidence);
  assert.throws(() => stats.success(BigInt(MAX_BUCKETS + 1) * 1000n, evidence), /capacity/);
});

const identity = {
  run_id: "run",
  workload_id: "read-rust-r1-run",
  process_id: "process",
  partition_key: "process",
  config_backend: "rust",
  repetition: 1,
};

function snapshot() {
  const stats = new Stats(0);
  stats.success(1_000_000n, { requestCharge: 1, observed429: 0, transportVerified: true });
  return stats.drain(15);
}

test("reporter saves interval data before completion, then integrity checks the stored rows", async () => {
  const rows = [];
  const reporter = new Reporter(
    {
      items: {
        async create(row) {
          rows.push(structuredClone(row));
          return { statusCode: 201 };
        },
      },
    },
    identity,
  );
  await reporter.interval(snapshot());
  assert.equal(await reporter.complete(true), true);
  assert.equal(rows[0].record_type, "measurement");
  assert.equal(rows[1].record_type, "completion");
  assert.equal(validateResults(rows, [identity])[0].count, 1);
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
  ]) {
    const changed = structuredClone(rows);
    mutate(changed);
    assert.throws(() => validateResults(changed, [identity]));
  }
});

test("failed reporting prevents a success-shaped completion", async () => {
  const reporter = new Reporter(
    {
      items: {
        async create() {
          throw new Error("write failed");
        },
      },
    },
    identity,
  );
  await assert.rejects(reporter.interval(snapshot()), /write failed/);
  await assert.rejects(reporter.complete(true), /prevents completion/);
});

test("recorded operation failures have interval IDs and invalidate the sequence", async () => {
  const rows = [];
  const reporter = new Reporter(
    {
      items: {
        async create(row) {
          rows.push(row);
          return { statusCode: 201 };
        },
      },
    },
    identity,
  );
  const stats = new Stats(0);
  stats.failure(1_000_000n, { status_code: 404 });
  await reporter.interval(stats.drain(1));
  assert.equal(await reporter.complete(true), false);
  assert.equal(rows[1].record_type, "error");
  assert.equal(rows[1].interval_id, rows[0].interval_id);
  assert.equal(rows[2].total_errors, 1);
});

test("error records omit raw SDK messages, stacks and request data", () => {
  const error = Object.assign(new Error("AccountKey=do-not-log"), { code: 429 });
  assert.deepEqual(safeError(error), { name: "Error", status_code: 429, code: null });
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
    fork: () => child,
    openSync: () => 1,
    closeSync() {},
    setTimeout(callback) {
      timers.push(callback);
      return callback;
    },
    clearTimeout() {},
  };
  return { child, timers, runChild: (...args) => runChild(...args, runtime) };
}

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
