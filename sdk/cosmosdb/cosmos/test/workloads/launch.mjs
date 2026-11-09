// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { fork } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdirSync, openSync, closeSync, writeFileSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  readConfig,
  validateConfig,
  createClient,
  checkContainer,
  provenance,
  safeError,
  sha256,
  captureCapacity,
  captureEnvironment,
} from "./common.mjs";
import { Reporter } from "./reporter.mjs";
import { fetchReport } from "./report.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createSequencePlan(config) {
  validateConfig(config);
  const plan = [];
  for (let repetition = 1; repetition <= config.repetitions; repetition++) {
    const backends =
      config.executionOrder === "alternating" && repetition % 2 === 0
        ? ["rust", "javascript"]
        : ["javascript", "rust"];
    for (const backend of backends) plan.push({ backend, repetition });
  }
  return plan;
}

function installSignalHandlers(target = process) {
  const controller = new AbortController();
  const handlers = ["SIGINT", "SIGTERM"].map((name) => {
    const handler = () =>
      controller.abort(
        Object.assign(new Error("Run interrupted"), {
          code: "WORKLOAD_ABORTED",
          signal: name,
        }),
      );
    target.on(name, handler);
    return [name, handler];
  });
  return {
    signal: controller.signal,
    dispose() {
      for (const [name, handler] of handlers) target.off(name, handler);
    },
  };
}

async function withDeadline(operation, seconds, signal) {
  let timer;
  let onAbort;
  try {
    signal?.throwIfAborted();
    return await Promise.race([
      operation(),
      new Promise((resolve, reject) => {
        timer = setTimeout(
          () => reject(new Error("Results operation exceeded its deadline")),
          seconds * 1000,
        );
      }),
      new Promise((resolve, reject) => {
        onAbort = () => reject(signal.reason);
        signal?.addEventListener("abort", onAbort, { once: true });
        if (signal?.aborted) onAbort();
      }),
    ]);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

function runChild(
  configPath,
  mode,
  fixturePath,
  logPath,
  durationSeconds,
  graceSeconds,
  reporter,
  options = {},
  runtime = { fork, setTimeout, clearTimeout, openSync, closeSync },
) {
  return new Promise((resolve, reject) => {
    const { signal, configSha256, profilingMode = "none" } = options;
    assert.ok(["none", "stages_v1"].includes(profilingMode));
    signal?.throwIfAborted();
    if (configSha256 !== undefined) readConfig(configPath, configSha256);
    const fd = runtime.openSync(logPath, "wx");
    let child;
    try {
      child = runtime.fork(
        path.join(__dirname, "workload.mjs"),
        [configPath, mode, fixturePath, configSha256 ?? ""],
        {
          stdio: ["ignore", fd, fd, "ipc"],
          execArgv: [],
          env: {
            ...process.env,
            AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION: mode === "rust" ? "rust" : "javascript",
            AZURE_COSMOS_EXPERIMENTAL_READ_PROFILING: mode === "qualify" ? "none" : profilingMode,
          },
        },
      );
    } finally {
      runtime.closeSync(fd);
    }
    let chain = Promise.resolve();
    let failure;
    let complete = false;
    let timedOut = false;
    let interruption;
    let settled = false;
    let kill;
    function finish(error) {
      if (settled) return;
      settled = true;
      runtime.clearTimeout(stop);
      runtime.clearTimeout(kill);
      signal?.removeEventListener("abort", abort);
      if (error) reject(error);
      else resolve();
    }
    function send(message) {
      if (child.connected) {
        child.send(message, (error) => {
          failure ??= error;
        });
      }
    }
    function forceStop() {
      timedOut = true;
      if (reporter) reporter.failed = true;
      child.kill("SIGKILL");
      finish(interruption ?? new Error("Workload/reporting exceeded the shutdown deadline"));
    }
    function abort() {
      interruption ??= signal.reason;
      if (reporter) reporter.aborted = true;
      runtime.clearTimeout(stop);
      runtime.clearTimeout(kill);
      send({ type: "stop", aborted: true });
      kill = runtime.setTimeout(forceStop, graceSeconds * 1000);
    }
    const stop = runtime.setTimeout(() => {
      if (mode === "qualify") {
        timedOut = true;
        failure = new Error("Dataset qualification exceeded its budget");
      }
      send({ type: "stop" });
    }, durationSeconds * 1000);
    kill = runtime.setTimeout(forceStop, (durationSeconds + graceSeconds) * 1000);
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
    function acknowledge(message, ok) {
      send({ type: "ack", id: message.id, ok });
    }
    child.on("message", (message) => {
      chain = chain
        .then(async () => {
          if (settled) return null;
          assert.ok(!failure && !complete, "Unexpected message after failure/completion");
          assert.ok(reporter, "Qualification must not emit measurements");
          if (message.type === "interval") {
            await reporter.interval(message.snapshot);
            acknowledge(message, true);
          } else {
            assert.equal(message.type, "complete");
            complete = true;
            const usable = await reporter.complete(message.valid && !interruption);
            assert.ok(interruption || usable, "Sequence failed correctness/capacity checks");
          }
          return null;
        })
        .catch((error) => {
          failure ??= error;
          acknowledge(message, false);
          send({ type: "stop", aborted: Boolean(interruption) });
        });
    });
    child.once("error", (error) => {
      failure ??= error;
    });
    child.once("close", async (code, terminationSignal) => {
      runtime.clearTimeout(stop);
      await chain;
      if (interruption) {
        finish(interruption);
      } else if (failure) {
        finish(failure);
      } else if (timedOut || code !== 0 || terminationSignal) {
        finish(new Error("Workload did not shut down cleanly"));
      } else if (reporter && !complete) {
        finish(new Error("Workload exited without completion"));
      } else {
        finish();
      }
    });
  });
}

async function main() {
  const [configArgument, outputArgument, execute, ...extra] = process.argv.slice(2);
  assert.ok(
    configArgument && outputArgument && execute === "--execute" && extra.length === 0,
    "Usage: node test/workloads/launch.mjs <config.json> <new-output-directory> --execute",
  );
  assert.equal(process.platform, "linux", "This drill targets the Ubuntu VM");
  assert.equal(process.arch, "x64");
  for (const name of ["NODE_OPTIONS", "RUST_LOG", "RUST_BACKTRACE"]) {
    assert.ok(!process.env[name], `${name} must be unset for the unprofiled comparison`);
  }
  const configPath = path.resolve(configArgument);
  const config = readConfig(configPath);
  const source = provenance(config);
  const directory = path.resolve(outputArgument);
  mkdirSync(directory);
  const effectiveConfig = path.join(directory, "config.json");
  const configBytes = `${JSON.stringify(config, null, 2)}\n`;
  const configHash = sha256(configBytes);
  writeFileSync(effectiveConfig, configBytes, { flag: "wx" });
  const environment = captureEnvironment();
  const fixture = path.join(directory, "verified-orders.json");
  const runId = randomUUID();
  const expected = [];
  for (const { backend, repetition } of createSequencePlan(config)) {
    const processId = randomUUID();
    expected.push({
      run_id: runId,
      workload_id: `read-${backend}-r${repetition}-${runId}`,
      process_id: processId,
      partition_key: processId,
      config_backend: backend,
      repetition,
      provenance: source,
      config_duration_seconds: config.durationSeconds,
      config_report_interval_seconds: config.reportIntervalSeconds,
      config_concurrency: 1,
      config_client_count: 1,
      config_item_count: config.itemCount,
      config_target: config.workload,
      account_host: new URL(config.endpoint).hostname,
      warmup_exclusion: "none",
      reporting_mode: "after_reads",
      reporting_format: "aggregate_v1",
      profiling_mode: config.profilingMode ?? "none",
      diagnostics_coverage: "partial",
      configuration_sha256: configHash,
      environment,
    });
  }
  const manifest = {
    run_id: runId,
    config,
    configuration_sha256: configHash,
    environment,
    provenance: source,
    expected,
    state: "preparing",
    started_at_utc: new Date().toISOString(),
    ended_at_utc: null,
    phases: [],
  };
  const manifestPath = path.join(directory, "manifest.json");
  const save = () => writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  save();
  const control = installSignalHandlers();
  const { signal } = control;
  const operation = (fn) => withDeadline(fn, config.shutdownGraceSeconds, signal);
  async function phase(mode, seconds, log, reporter) {
    signal.throwIfAborted();
    readConfig(effectiveConfig, configHash);
    const record = {
      mode,
      workload_id: reporter?.identity.workload_id ?? null,
      started_at_utc: new Date().toISOString(),
      ended_at_utc: null,
      state: "running",
    };
    manifest.phases.push(record);
    save();
    try {
      await runChild(
        effectiveConfig,
        mode,
        fixture,
        log,
        seconds,
        config.shutdownGraceSeconds,
        reporter,
        { signal, configSha256: configHash, profilingMode: config.profilingMode ?? "none" },
      );
      signal.throwIfAborted();
      readConfig(effectiveConfig, configHash);
      record.state = "complete";
    } catch (error) {
      record.state = signal.aborted ? "aborted" : "failed";
      throw error;
    } finally {
      if (reporter) record.reporting_writes = reporter.writes;
      record.ended_at_utc = new Date().toISOString();
      save();
    }
  }
  let reportingClient;
  try {
    reportingClient = await createClient("javascript", config.endpoint);
    signal.throwIfAborted();
    const results = await operation(() => checkContainer(reportingClient, config.results));
    environment.capacity = await operation(() => captureCapacity(reportingClient, config, signal));
    environment.capacity_captured_at_utc = new Date().toISOString();
    save();
    await phase(
      "qualify",
      config.qualificationTimeoutSeconds,
      path.join(directory, "qualification.log"),
    );
    manifest.fixture_sha256 = sha256(readFileSync(fixture));
    for (const cell of expected) cell.fixture_sha256 = manifest.fixture_sha256;
    manifest.state = "running";
    save();
    for (const cell of expected) {
      console.log(`Starting ${cell.workload_id}`);
      const reporter = new Reporter(
        results,
        cell,
        path.join(directory, `${cell.workload_id}.jsonl`),
      );
      await phase(
        cell.config_backend,
        config.durationSeconds,
        path.join(directory, `${cell.workload_id}.log`),
        reporter,
      );
    }
    assert.deepEqual(provenance(config), source, "Build/workload changed during the comparison");
    manifest.capacity_after = await operation(() =>
      captureCapacity(reportingClient, config, signal),
    );
    manifest.capacity_checked_at_utc = new Date().toISOString();
    assert.deepEqual(manifest.capacity_after, environment.capacity);
    const report = await operation(() => fetchReport(results, runId, expected, directory));
    readConfig(effectiveConfig, configHash);
    signal.throwIfAborted();
    writeFileSync(
      path.join(directory, "latency-report.json"),
      `${JSON.stringify(report, null, 2)}\n`,
      { flag: "wx" },
    );
    manifest.state = "complete";
    manifest.ended_at_utc = new Date().toISOString();
    save();
    console.log(JSON.stringify({ run_id: runId, report }, null, 2));
  } catch (error) {
    manifest.state = signal.aborted ? "aborted" : "failed";
    manifest.ended_at_utc = new Date().toISOString();
    if (signal.aborted) manifest.abort_signal = signal.reason.signal;
    manifest.failure = safeError(error);
    save();
    throw signal.aborted ? signal.reason : error;
  } finally {
    try {
      reportingClient?.dispose();
    } finally {
      control.dispose();
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error("Read latency drill failed:", JSON.stringify(safeError(error)));
    process.exit(error.signal === "SIGINT" ? 130 : error.signal === "SIGTERM" ? 143 : 1);
  });
}

export { createSequencePlan, runChild, installSignalHandlers, withDeadline };
