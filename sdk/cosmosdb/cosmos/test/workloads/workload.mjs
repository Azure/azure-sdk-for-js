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
import { Stats } from "./stats.mjs";

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

async function qualify(config, filename) {
  let javascript;
  let rust;
  const etags = [];
  try {
    javascript = await createClient("javascript", config.endpoint);
    rust = await createClient("rust", config.endpoint);
    await checkContainer(javascript, config.workload);
    for (let index = 0; index < config.itemCount; index++) {
      const item = seedItem(index);
      let expected;
      for (const [backend, client] of [
        ["javascript", javascript],
        ["rust", rust],
      ]) {
        const response = await client
          .database(config.workload.database)
          .container(config.workload.container)
          .item(item.id, item.customerId)
          .read();
        const evidence = inspectRead(response, index, backend, expected);
        assert.equal(evidence.observed429, 0, "Qualification encountered throttling");
        expected = response.etag;
      }
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

async function run(config, backend, fixturePath) {
  assert.ok(process.send, "Launch the workload through launch.mjs");
  let stopping = false;
  let reportingError = false;
  let nextMessage = 0;
  const pending = new Map();
  const acknowledged = [];
  process.on("message", (message) => {
    if (message.type === "stop") stopping = true;
    if (message.type === "ack") {
      const entry = pending.get(message.id);
      if (!entry) {
        reportingError = true;
        stopping = true;
        return;
      }
      if (!message.ok) {
        reportingError = true;
        stopping = true;
      }
      entry();
      pending.delete(message.id);
    }
  });
  process.on("disconnect", () => {
    if (pending.size) process.exitCode = 1;
    stopping = true;
    reportingError = true;
    for (const resolve of pending.values()) resolve();
    pending.clear();
  });
  function publish(snapshot) {
    if (!snapshot) return;
    assert.ok(!reportingError && pending.size < 8, "Reporter failed or cannot keep up");
    const id = ++nextMessage;
    acknowledged.push(new Promise((resolve) => pending.set(id, resolve)));
    process.send({ type: "interval", id, snapshot });
  }

  const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
  assert.equal(fixture.endpoint, config.endpoint);
  assert.deepEqual(fixture.target, config.workload);
  assert.equal(fixture.etags.length, config.itemCount);
  const started = seconds();
  const stats = new Stats(started);
  const constructionStart = seconds();
  const client = await createClient(backend, config.endpoint);
  const constructionMs = (seconds() - constructionStart) * 1000;
  const container = client.database(config.workload.database).container(config.workload.container);
  let valid = true;
  let index = 0;
  let firstCompletionSeconds;
  let cpu = process.cpuUsage();
  function flush() {
    const snapshot = stats.drain(seconds());
    if (snapshot) {
      const usage = process.cpuUsage(cpu);
      cpu = process.cpuUsage();
      publish({
        ...snapshot,
        client_setup_ms: constructionMs,
        first_completion_process_seconds: firstCompletionSeconds,
        cpu_user_ms: usage.user / 1000,
        cpu_system_ms: usage.system / 1000,
        rss_bytes: process.memoryUsage().rss,
      });
    }
  }
  try {
    while (!stopping) {
      const item = seedItem(index);
      const reference = container.item(item.id, item.customerId);
      const result = await timedRead(() => reference.read());
      firstCompletionSeconds ??= process.uptime();
      try {
        if (result.error) throw result.error;
        const evidence = inspectRead(result.response, index, backend, fixture.etags[index]);
        stats.success(result.durationNs, evidence);
        if (evidence.observed429) {
          valid = false;
          break;
        }
      } catch (error) {
        stats.failure(result.durationNs, {
          ...safeError(error),
          status_code: result.response?.statusCode ?? safeError(error).status_code,
        });
        valid = false;
        break;
      }
      if (seconds() - stats.last >= config.reportIntervalSeconds) flush();
      index = (index + 1) % config.itemCount;
    }
    flush();
    await Promise.all(acknowledged);
    assert.ok(!reportingError, "Reporting did not finish successfully");
    process.send({ type: "complete", valid });
  } finally {
    client.dispose();
  }
}

async function main() {
  const [configPath, mode, fixturePath] = process.argv.slice(2);
  const config = readConfig(configPath);
  if (mode === "qualify") await qualify(config, fixturePath);
  else {
    assert.ok(["javascript", "rust"].includes(mode));
    await run(config, mode, fixturePath);
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

export { timedRead };
