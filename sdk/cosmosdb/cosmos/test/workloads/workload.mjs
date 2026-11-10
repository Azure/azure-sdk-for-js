// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";
import {
  readConfig,
  seedItem,
  inspectRead,
  createClient,
  checkContainer,
  safeError,
} from "./common.mjs";
import { Stats, IntervalBuffer } from "./stats.mjs";
import { MAX_PROFILE_READS, copyRustProfile } from "./profiling.mjs";

const seconds = () => Number(process.hrtime.bigint()) / 1e9;

async function timedRead(read, clock = process.hrtime.bigint) {
  const start = clock();
  try {
    const response = await read();
    const durationNs = clock() - start;
    return { response, durationNs };
  } catch (error) {
    const durationNs = clock() - start;
    return { error, durationNs };
  }
}

async function qualify(config, filename, signal) {
  let javascript;
  let rust;
  const etags = [];
  try {
    javascript = await createClient("javascript", config.endpoint);
    rust = await createClient("rust", config.endpoint);
    await checkContainer(javascript, config.workload);
    for (let index = 0; index < config.itemCount; index++) {
      signal.throwIfAborted();
      const item = seedItem(index);
      let expected;
      for (const [backend, client] of [
        ["javascript", javascript],
        ["rust", rust],
      ]) {
        signal.throwIfAborted();
        const response = await client
          .database(config.workload.database)
          .container(config.workload.container)
          .item(item.id, item.customerId)
          .read();
        const evidence = inspectRead(response, index, backend, expected);
        assert.equal(evidence.observed429, 0, "Qualification encountered throttling");
        expected = response.etag;
      }
      signal.throwIfAborted();
      etags.push(expected);
      await delay(10);
    }
    writeFileSync(
      filename,
      `${JSON.stringify({ endpoint: config.endpoint, target: config.workload, etags })}\n`,
      { flag: "wx" },
    );
  } finally {
    javascript?.dispose();
    rust?.dispose();
  }
}

async function run(
  config,
  backend,
  fixturePath,
  signal,
  runtime = { channel: process, createClient, seconds },
) {
  const { channel, createClient: makeClient, seconds: clock } = runtime;
  const profiling = config.profilingMode === "stages_v1";
  let operation = 0;
  let profiles = profiling ? [] : undefined;
  assert.ok(channel.send, "Launch the workload through launch.mjs");
  let reportingError = false;
  let nextMessage = 0;
  let pending;
  function failReporting(error) {
    reportingError = true;
    pending?.reject(error);
    pending = undefined;
  }
  const acknowledge = (message) => {
    if (message.type === "ack") {
      if (!pending || pending.id !== message.id || message.ok !== true) {
        failReporting(
          new Error("Reporter rejected an interval or sent an invalid acknowledgement"),
        );
        return;
      }
      const entry = pending;
      pending = undefined;
      entry.resolve();
    }
  };
  const disconnected = () => {
    channel.exitCode = 1;
    failReporting(new Error("Reporter disconnected before reporting completed"));
  };
  async function publish(snapshot) {
    assert.ok(!reportingError && !pending, "Reporter failed or cannot keep up");
    const id = ++nextMessage;
    await new Promise((resolve, reject) => {
      pending = { id, resolve, reject };
      channel.send({ type: "interval", id, snapshot }, (error) => {
        if (error) failReporting(error);
      });
    });
    assert.ok(!reportingError, "Reporting did not finish successfully");
  }

  const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
  assert.equal(fixture.endpoint, config.endpoint);
  assert.deepEqual(fixture.target, config.workload);
  assert.equal(fixture.etags.length, config.itemCount);
  const started = clock();
  const stats = new Stats(started);
  const buffered = new IntervalBuffer(
    Math.ceil(config.durationSeconds / config.reportIntervalSeconds) + 1,
  );
  const constructionStart = clock();
  let client;
  try {
    channel.on("message", acknowledge);
    channel.on("disconnect", disconnected);
    client = await makeClient(backend, config.endpoint, config.profilingMode ?? "none");
    const constructionMs = (clock() - constructionStart) * 1000;
    const container = client
      .database(config.workload.database)
      .container(config.workload.container);
    let valid = true;
    let index = 0;
    let firstCompletionSeconds;
    let cpu = process.cpuUsage();
    function flush() {
      const snapshot = stats.drain(clock());
      if (snapshot) {
        const currentCpu = process.cpuUsage();
        const usage = { user: currentCpu.user - cpu.user, system: currentCpu.system - cpu.system };
        cpu = currentCpu;
        buffered.add({
          ...snapshot,
          client_setup_ms: constructionMs,
          first_completion_process_seconds: firstCompletionSeconds,
          cpu_user_ms: usage.user / 1000,
          cpu_system_ms: usage.system / 1000,
          rss_bytes: process.memoryUsage().rss,
          ...(profiling ? { read_profiles: profiles } : {}),
        });
        if (profiling) profiles = [];
      }
    }
    async function readLoop() {
      while (!signal.aborted && !reportingError && valid) {
        const readIndex = index;
        index = (index + 1) % config.itemCount;
        const item = seedItem(readIndex);
        const reference = container.item(item.id, item.customerId);
        if (profiling) assert.ok(operation < MAX_PROFILE_READS, "Read profiling capacity exceeded");
        const readStart = profiling ? clock() - started : 0;
        const result = await timedRead(() => reference.read());
        firstCompletionSeconds ??= process.uptime();
        const validationStart = profiling ? performance.now() : 0;
        let validationMs;
        let statisticsMs;
        let rustProfile;
        let outcome = "failure";
        try {
          if (result.error) throw result.error;
          const evidence = inspectRead(
            result.response,
            readIndex,
            backend,
            fixture.etags[readIndex],
          );
          if (profiling) validationMs = performance.now() - validationStart;
          if (profiling && backend === "rust") {
            rustProfile = copyRustProfile(
              result.response.diagnostics.experimentalRustRead.profile,
              true,
            );
          }
          const statisticsStart = profiling ? performance.now() : 0;
          stats.success(result.durationNs, evidence);
          if (profiling) statisticsMs = performance.now() - statisticsStart;
          outcome = "success";
          if (evidence.observed429) {
            valid = false;
          }
        } catch (error) {
          if (profiling && backend === "rust") {
            rustProfile = copyRustProfile(error.diagnostics?.experimentalRustRead?.profile, false);
          }
          if (profiling) validationMs ??= performance.now() - validationStart;
          const statisticsStart = profiling ? performance.now() : 0;
          stats.failure(result.durationNs, {
            ...safeError(error),
            status_code: result.response?.statusCode ?? safeError(error).status_code,
          });
          if (profiling) statisticsMs = performance.now() - statisticsStart;
          valid = false;
        }
        if (profiling) {
          profiles.push({
            operation: ++operation,
            started_seconds: readStart,
            public_ms: Number(result.durationNs) / 1e6,
            duration_us: Math.max(1, Number(result.durationNs / 1000n)),
            validation_ms: validationMs,
            statistics_ms: statisticsMs,
            outcome,
            ...(rustProfile ? { rust: rustProfile } : {}),
          });
        }
        if (clock() - stats.last >= config.reportIntervalSeconds) flush();
      }
    }
    // Drain every submitted read before reporting or disposing the shared client.
    const workers = Array.from({ length: config.concurrency ?? 1 }, () =>
      readLoop().catch((error) => {
        valid = false;
        throw error;
      }),
    );
    const outcomes = await Promise.allSettled(workers);
    const failure = outcomes.find((outcome) => outcome.status === "rejected");
    if (!failure) flush();
    // No reporting IPC or persistence overlaps the read loop.
    for (const snapshot of buffered.drain()) await publish(snapshot);
    if (failure) throw failure.reason;
    assert.ok(!reportingError, "Reporting did not finish successfully");
    await new Promise((resolve, reject) => {
      channel.send({ type: "complete", valid: valid && !signal.reason?.aborted }, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    assert.ok(!reportingError, "Reporting did not finish successfully");
  } finally {
    channel.off("message", acknowledge);
    channel.off("disconnect", disconnected);
    client?.dispose();
  }
}

async function main() {
  const [configPath, mode, fixturePath, configHash] = process.argv.slice(2);
  assert.match(configHash, /^[a-f0-9]{64}$/, "Expected configuration fingerprint is required");
  const config = readConfig(configPath, configHash);
  const controller = new AbortController();
  const stop = (aborted) => {
    if (controller.signal.aborted) {
      controller.signal.reason.aborted ||= aborted;
    } else {
      controller.abort(
        Object.assign(new Error("Workload stopped"), {
          code: "WORKLOAD_STOPPED",
          aborted,
        }),
      );
    }
  };
  const onMessage = (message) => {
    if (message.type === "stop") stop(message.aborted === true);
  };
  const onSignal = () => stop(true);
  process.on("message", onMessage);
  process.on("disconnect", onSignal);
  process.on("SIGINT", onSignal);
  process.on("SIGTERM", onSignal);
  try {
    if (mode === "qualify") await qualify(config, fixturePath, controller.signal);
    else {
      assert.ok(["javascript", "rust"].includes(mode));
      await run(config, mode, fixturePath, controller.signal);
    }
  } finally {
    process.off("message", onMessage);
    process.off("disconnect", onSignal);
    process.off("SIGINT", onSignal);
    process.off("SIGTERM", onSignal);
  }
  if (process.connected) process.disconnect();
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error("Workload failed:", JSON.stringify(safeError(error)));
    process.exitCode = 1;
    if (process.connected) process.disconnect();
  });
}

export { timedRead, run };
