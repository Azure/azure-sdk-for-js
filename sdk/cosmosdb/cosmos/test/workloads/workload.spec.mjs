// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync, mkdtempSync, writeFileSync, unlinkSync, rmdirSync } from "node:fs";
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
} from "./stats.mjs";
import { Reporter } from "./reporter.mjs";
import { validateResults } from "./report.mjs";
import { timedRead } from "./workload.mjs";
import { runChild, installSignalHandlers, withDeadline } from "./launch.mjs";

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

const identity = {
  run_id: "run",
  workload_id: "read-rust-r1-run",
  process_id: "process",
  partition_key: "process",
  config_backend: "rust",
  repetition: 1,
  configuration_sha256: "a".repeat(64),
  environment: { hostname: "offline-test", capacity: { workload: 1000, results: 400 } },
};

function snapshot() {
  const stats = new Stats(0);
  stats.success(1_000_000n, evidence());
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
    (data) => {
      data[0].configuration_sha256 = "b".repeat(64);
    },
    (data) => {
      data[0].environment.hostname = "another-host";
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
    fork: (filename, args) => {
      child.forked = true;
      child.arguments = args;
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
