// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mergeAttemptGroups, MAX_BUFFERED_INTERVALS } from "./stats.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "../..");
const sdkPath = path.join(packageRoot, "dist/commonjs/index.js");
const bindingPath = path.join(packageRoot, "rust-prototype/cosmos_js_rust_prototype.node");
const targets = {
  workload: {
    database: "js_rust_read_latency_workload_db",
    container: "js_rust_read_latency_workload_container",
    partitionKey: "/customerId",
  },
  results: {
    database: "js_rust_read_latency_results_db",
    container: "js_rust_read_latency_results_container",
    partitionKey: "/partition_key",
  },
};

function readConfig(filename, expectedHash) {
  const bytes = readFileSync(filename);
  if (expectedHash !== undefined) {
    assert.equal(sha256(bytes), expectedHash, "Effective configuration changed");
  }
  return validateConfig(JSON.parse(bytes.toString("utf8")));
}

function validateRustWorkerThreads(value) {
  assert.ok([1, 2, 4].includes(value), "Rust worker threads must be 1, 2 or 4");
}

function validateConfig(config) {
  const keys = [
    "endpoint",
    "workload",
    "results",
    "itemCount",
    "durationSeconds",
    "reportIntervalSeconds",
    "repetitions",
    "shutdownGraceSeconds",
    "qualificationTimeoutSeconds",
    "nativeBuildManifest",
    "capacityRuPerSecond",
  ];
  if (Object.hasOwn(config, "profilingMode")) {
    keys.push("profilingMode");
    assert.ok(["none", "stages_v1"].includes(config.profilingMode), "Unknown profiling mode");
  }
  if (Object.hasOwn(config, "executionOrder")) {
    keys.push("executionOrder");
    assert.ok(
      ["javascript_first", "alternating"].includes(config.executionOrder),
      "Unknown execution order",
    );
  }
  if (Object.hasOwn(config, "concurrency")) {
    keys.push("concurrency");
    assert.ok(
      Number.isSafeInteger(config.concurrency) &&
        config.concurrency >= 1 &&
        config.concurrency <= 64,
      "Concurrency must be an integer from 1 to 64",
    );
    assert.ok(
      config.concurrency === 1 || config.profilingMode !== "stages_v1",
      "Per-read profiling requires concurrency 1",
    );
  }
  if (Object.hasOwn(config, "rustWorkerThreadsByRepetition")) {
    keys.push("rustWorkerThreadsByRepetition");
    assert.ok(
      Array.isArray(config.rustWorkerThreadsByRepetition) &&
        config.rustWorkerThreadsByRepetition.length === config.repetitions,
      "Rust worker threads require one value per repetition",
    );
    for (const value of config.rustWorkerThreadsByRepetition) validateRustWorkerThreads(value);
  }
  assert.deepEqual(
    Object.keys(config).sort(),
    keys.sort(),
    "Unexpected or missing configuration fields",
  );
  const endpoint = new URL(config.endpoint);
  assert.equal(endpoint.protocol, "https:");
  assert.equal(endpoint.hostname, "rust-migration-eastus.documents.azure.com");
  assert.equal(endpoint.username + endpoint.password + endpoint.search + endpoint.hash, "");
  assert.equal(endpoint.pathname, "/");
  assert.ok(endpoint.port === "" || endpoint.port === "443");
  for (const kind of ["workload", "results"]) assert.deepEqual(config[kind], targets[kind]);
  assert.deepEqual(Object.keys(config.capacityRuPerSecond).sort(), ["results", "workload"]);
  for (const value of Object.values(config.capacityRuPerSecond)) {
    assert.ok(Number.isSafeInteger(value) && value > 0, "Expected capacity must be positive RU/s");
  }
  assert.equal(config.itemCount, 1000, "This drill requires exactly 1,000 prepared orders");
  for (const name of [
    "durationSeconds",
    "reportIntervalSeconds",
    "repetitions",
    "shutdownGraceSeconds",
    "qualificationTimeoutSeconds",
  ]) {
    assert.ok(
      Number.isSafeInteger(config[name]) && config[name] > 0,
      `${name} must be a positive integer`,
    );
  }
  assert.ok(config.reportIntervalSeconds <= config.durationSeconds);
  assert.ok(
    config.durationSeconds <= 3600 && config.repetitions <= 20,
    "Run budget exceeds this short-drill limit",
  );
  assert.ok(config.shutdownGraceSeconds <= 120 && config.qualificationTimeoutSeconds <= 600);
  assert.ok(
    Math.ceil(config.durationSeconds / config.reportIntervalSeconds) + 1 <= MAX_BUFFERED_INTERVALS,
    "Deferred interval capacity exceeded; increase the snapshot interval or shorten the sequence",
  );
  assert.ok(
    typeof config.nativeBuildManifest === "string" && path.isAbsolute(config.nativeBuildManifest),
  );
  return config;
}

function seedItem(index) {
  assert.ok(Number.isInteger(index) && index >= 0 && index < 1000);
  return {
    id: `order-${index}`,
    customerId: `customer-${index}`,
    countryCode: "US",
    quantity: 2,
    status: "Pending",
  };
}

function applicationBody(body) {
  const serviceFields = new Set(["_rid", "_self", "_etag", "_attachments", "_ts"]);
  return Object.fromEntries(Object.entries(body).filter(([key]) => !serviceFields.has(key)));
}

function inspectRead(response, index, backend, etag) {
  assert.equal(response.statusCode, 200, "ReadItem must return 200");
  assert.deepEqual(
    applicationBody(response.resource),
    seedItem(index),
    "Prepared order contents changed",
  );
  assert.ok(typeof response.etag === "string" && response.etag.length > 0);
  if (etag !== undefined) assert.equal(response.etag, etag, "Prepared order version changed");
  assert.ok(Number.isFinite(response.requestCharge) && response.requestCharge >= 0);
  let attempts;
  if (backend === "rust") {
    const native = response.diagnostics?.experimentalRustRead;
    assert.equal(native?.coverage, "partial");
    const evidence = native.requests;
    assert.ok(evidence && Array.isArray(evidence.requests), "Missing native request evidence");
    assert.equal(
      evidence.requestCount,
      evidence.retainedRequestCount,
      "Native attempts were compacted",
    );
    assert.equal(evidence.retainedRequestCount, evidence.requests.length);
    attempts = evidence.requests;
    const data = attempts.filter((request) => request.pipeline === "data_plane");
    assert.ok(
      data.some((request) => request.transport === "gateway_v2" && request.statusCode === 200),
    );
    assert.ok(
      data.every((request) => request.transport === "gateway_v2"),
      "Gateway V1 fallback",
    );
  } else {
    assert.equal(backend, "javascript");
    assert.equal(
      response.diagnostics?.experimentalRustRead,
      undefined,
      "JavaScript baseline returned Rust diagnostics",
    );
    const diagnostics = response.diagnostics?.clientSideRequestStatistics;
    assert.ok(
      Array.isArray(diagnostics?.retryDiagnostics?.failedAttempts),
      "Missing JS retry evidence",
    );
    attempts = diagnostics.retryDiagnostics.failedAttempts;
  }
  return {
    requestCharge: response.requestCharge,
    observed429: attempts.filter((request) => request.statusCode === 429).length,
    observedAttempts: attempts.length,
    transportVerified: backend === "rust",
    attemptEvidence: {
      population: backend === "rust" ? "rust_retained_requests" : "javascript_failed_attempts",
      coverage: "partial",
      groups: mergeAttemptGroups([
        attempts.map((attempt) => ({
          pipeline: backend === "rust" ? attempt.pipeline : "unknown",
          transport: backend === "rust" ? attempt.transport : "unknown",
          status_code: attempt.statusCode ?? null,
          sub_status_code: attempt.subStatusCode ?? attempt.substatusCode ?? null,
          count: 1,
        })),
      ]),
    },
  };
}

async function createClient(backend, endpoint, profilingMode = "none") {
  assert.ok(["javascript", "rust"].includes(backend));
  assert.ok(["none", "stages_v1"].includes(profilingMode), "Unknown profiling mode");
  assert.ok(process.env.ACCOUNT_KEY?.trim(), "ACCOUNT_KEY is required in process memory");
  process.env.AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION = backend;
  process.env.AZURE_COSMOS_EXPERIMENTAL_NATIVE_BINDING_PATH = bindingPath;
  process.env.AZURE_COSMOS_EXPERIMENTAL_READ_PROFILING = profilingMode;
  const { CosmosClient } = await import(pathToFileURL(sdkPath).href);
  return new CosmosClient({
    endpoint,
    key: process.env.ACCOUNT_KEY,
    connectionPolicy: { enableBackgroundEndpointRefreshing: false },
  });
}

async function checkContainer(client, target) {
  const container = client.database(target.database).container(target.container);
  const response = await container.read();
  assert.equal(response.statusCode, 200, "Required container must already exist");
  assert.deepEqual(response.resource.partitionKey.paths, [target.partitionKey]);
  return container;
}

async function captureCapacity(client, config, signal) {
  const capacities = {};
  for (const kind of ["workload", "results"]) {
    signal?.throwIfAborted();
    const target = config[kind];
    const response = await client.database(target.database).container(target.container).readOffer();
    signal?.throwIfAborted();
    assert.equal(response.statusCode, 200, "Cannot read container throughput");
    const content = response.resource?.content;
    assert.ok(content, "Dedicated container throughput is required");
    assert.ok(!content.offerAutopilotSettings, "This drill requires manual throughput");
    assert.notEqual(content.offerIsRUPerMinuteThroughputEnabled, true);
    assert.equal(content.offerThroughput, config.capacityRuPerSecond[kind], "Throughput changed");
    capacities[kind] = {
      mode: "manual",
      ru_per_second: content.offerThroughput,
      source: "container_offer",
    };
  }
  return capacities;
}

function captureEnvironment() {
  const cpus = os.cpus();
  assert.ok(cpus.length > 0, "CPU inventory is unavailable");
  return {
    captured_at_utc: new Date().toISOString(),
    hostname: os.hostname(),
    platform: process.platform,
    arch: process.arch,
    kernel: os.release(),
    cpu_count: cpus.length,
    available_parallelism: os.availableParallelism(),
    cpu_model: cpus[0].model,
    total_memory_bytes: os.totalmem(),
    node: process.version,
    sdk_version: JSON.parse(readFileSync(path.join(packageRoot, "package.json"), "utf8")).version,
  };
}

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

function treeHash(directory) {
  const hash = createHash("sha256");
  function visit(current) {
    for (const entry of readdirSync(current, { withFileTypes: true }).sort((a, b) =>
      a.name.localeCompare(b.name),
    )) {
      const filename = path.join(current, entry.name);
      assert.ok(!entry.isSymbolicLink(), "Build tree must not contain symlinks");
      if (entry.isDirectory()) visit(filename);
      else if (/\.(js|mjs|json)$/.test(entry.name)) {
        hash.update(path.relative(directory, filename).replaceAll("\\", "/"));
        hash.update("\0");
        hash.update(sha256(readFileSync(filename)));
      }
    }
  }
  visit(directory);
  return hash.digest("hex");
}

function provenance(config) {
  const build = JSON.parse(readFileSync(config.nativeBuildManifest, "utf8"));
  assert.equal(build.profile, "release");
  assert.equal(build.platform, "linux-x64");
  assert.match(build.driverCommit, /^[a-f0-9]{40}$/);
  const addonHash = sha256(readFileSync(bindingPath));
  const lockHash = sha256(readFileSync(path.join(packageRoot, "rust-prototype/Cargo.lock")));
  assert.equal(addonHash, build.addonSha256, "Native binary differs from build evidence");
  assert.equal(lockHash, build.lockfileSha256, "Lockfile differs from native build");
  return {
    baseJsCommit: build.baseJsCommit,
    driverCommit: build.driverCommit,
    overlaySha256: build.overlaySha256,
    addonSha256: addonHash,
    lockfileSha256: lockHash,
    sdkTreeSha256: treeHash(path.dirname(sdkPath)),
    workloadTreeSha256: treeHash(__dirname),
    sdkPath,
    bindingPath,
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    profile: build.profile,
    rustc: build.rustc,
  };
}

const harnessFailureCodes = new Map([
  ["Deferred histogram capacity exceeded", "WORKLOAD_BUFFERED_HISTOGRAM_CAPACITY"],
  ["Deferred interval capacity exceeded", "WORKLOAD_INTERVAL_CAPACITY"],
  ["Latency histogram capacity exceeded", "WORKLOAD_HISTOGRAM_CAPACITY"],
  ["Interval artifact capacity exceeded", "WORKLOAD_ARTIFACT_CAPACITY"],
  ["Result document exceeds the UTF-8 size limit", "WORKLOAD_RESULT_CAPACITY"],
]);

function safeError(error) {
  const code =
    error?.statusCode ??
    (error?.code === "ERR_ASSERTION" ? harnessFailureCodes.get(error.message) : undefined) ??
    error?.code;
  return {
    name: String(error?.name || "Error").slice(0, 64),
    status_code: Number.isInteger(code) ? code : null,
    // SDK messages and stacks can contain request data; retain structured fields only.
    code: typeof code === "string" && /^[A-Z0-9_]{1,64}$/i.test(code) ? code : null,
  };
}

export {
  targets,
  readConfig,
  validateConfig,
  validateRustWorkerThreads,
  seedItem,
  inspectRead,
  createClient,
  checkContainer,
  captureCapacity,
  captureEnvironment,
  provenance,
  safeError,
  sha256,
};
