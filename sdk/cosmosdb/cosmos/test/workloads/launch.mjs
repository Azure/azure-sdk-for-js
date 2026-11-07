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
  createClient,
  checkContainer,
  provenance,
  safeError,
  sha256,
} from "./common.mjs";
import { Reporter } from "./reporter.mjs";
import { fetchReport } from "./report.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function withDeadline(operation, seconds) {
  let timer;
  try {
    return await Promise.race([
      operation(),
      new Promise((resolve, reject) => {
        timer = setTimeout(
          () => reject(new Error("Results operation exceeded its deadline")),
          seconds * 1000,
        );
      }),
    ]);
  } finally {
    clearTimeout(timer);
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
  runtime = { fork, setTimeout, clearTimeout, openSync, closeSync },
) {
  return new Promise((resolve, reject) => {
    const fd = runtime.openSync(logPath, "wx");
    let child;
    try {
      child = runtime.fork(path.join(__dirname, "workload.mjs"), [configPath, mode, fixturePath], {
        stdio: ["ignore", fd, fd, "ipc"],
        execArgv: [],
        env: {
          ...process.env,
          AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION: mode === "rust" ? "rust" : "javascript",
        },
      });
    } finally {
      runtime.closeSync(fd);
    }
    let chain = Promise.resolve();
    let failure;
    let complete = false;
    let timedOut = false;
    const stop = runtime.setTimeout(() => {
      if (mode === "qualify") {
        timedOut = true;
        failure = new Error("Dataset qualification exceeded its budget");
      }
      if (child.connected) child.send({ type: "stop" });
    }, durationSeconds * 1000);
    const kill = runtime.setTimeout(
      () => {
        timedOut = true;
        if (reporter) reporter.failed = true;
        child.kill("SIGKILL");
        reject(new Error("Workload/reporting exceeded the shutdown deadline"));
      },
      (durationSeconds + graceSeconds) * 1000,
    );
    function acknowledge(message, ok) {
      if (child.connected) child.send({ type: "ack", id: message.id, ok });
    }
    child.on("message", (message) => {
      chain = chain
        .then(async () => {
          assert.ok(!failure && !complete, "Unexpected message after failure/completion");
          assert.ok(reporter, "Qualification must not emit measurements");
          if (message.type === "interval") {
            await reporter.interval(message.snapshot);
            acknowledge(message, true);
          } else {
            assert.equal(message.type, "complete");
            complete = true;
            assert.ok(
              await reporter.complete(message.valid),
              "Sequence failed correctness/capacity checks",
            );
          }
          return null;
        })
        .catch((error) => {
          failure ??= error;
          acknowledge(message, false);
          if (child.connected) child.send({ type: "stop" });
        });
    });
    child.once("error", (error) => {
      failure ??= error;
    });
    child.once("close", async (code, signal) => {
      runtime.clearTimeout(stop);
      await chain;
      runtime.clearTimeout(kill);
      if (failure) {
        reject(failure);
      } else if (timedOut || code !== 0 || signal) {
        reject(new Error("Workload did not shut down cleanly"));
      } else if (reporter && !complete) {
        reject(new Error("Workload exited without completion"));
      } else {
        resolve();
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
  writeFileSync(effectiveConfig, `${JSON.stringify(config, null, 2)}\n`, { flag: "wx" });
  const fixture = path.join(directory, "verified-orders.json");
  const runId = randomUUID();
  const expected = [];
  for (let repetition = 1; repetition <= config.repetitions; repetition++) {
    for (const backend of ["javascript", "rust"]) {
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
        diagnostics_coverage: "partial",
      });
    }
  }
  const manifest = { run_id: runId, config, provenance: source, expected, state: "preparing" };
  const manifestPath = path.join(directory, "manifest.json");
  const save = () => writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  save();
  let reportingClient;
  try {
    reportingClient = await createClient("javascript", config.endpoint);
    const results = await withDeadline(
      () => checkContainer(reportingClient, config.results),
      config.shutdownGraceSeconds,
    );
    await runChild(
      effectiveConfig,
      "qualify",
      fixture,
      path.join(directory, "qualification.log"),
      config.qualificationTimeoutSeconds,
      config.shutdownGraceSeconds,
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
      await runChild(
        effectiveConfig,
        cell.config_backend,
        fixture,
        path.join(directory, `${cell.workload_id}.log`),
        config.durationSeconds,
        config.shutdownGraceSeconds,
        reporter,
      );
    }
    assert.deepEqual(provenance(config), source, "Build/workload changed during the comparison");
    const report = await withDeadline(
      () => fetchReport(results, runId, expected),
      config.shutdownGraceSeconds,
    );
    writeFileSync(
      path.join(directory, "latency-report.json"),
      `${JSON.stringify(report, null, 2)}\n`,
      { flag: "wx" },
    );
    manifest.state = "complete";
    save();
    console.log(JSON.stringify({ run_id: runId, report }, null, 2));
  } catch (error) {
    manifest.state = "failed";
    manifest.failure = safeError(error);
    save();
    throw error;
  } finally {
    reportingClient?.dispose();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error("Read latency drill failed:", JSON.stringify(safeError(error)));
    process.exit(1);
  });
}

export { runChild };
