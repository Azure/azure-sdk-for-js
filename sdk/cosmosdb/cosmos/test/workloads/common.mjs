// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

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

function readConfig(filename) {
  return validateConfig(JSON.parse(readFileSync(filename, "utf8")));
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
  ];
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
  };
}

async function createClient(backend, endpoint) {
  assert.ok(["javascript", "rust"].includes(backend));
  assert.ok(process.env.ACCOUNT_KEY?.trim(), "ACCOUNT_KEY is required in process memory");
  process.env.AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION = backend;
  process.env.AZURE_COSMOS_EXPERIMENTAL_NATIVE_BINDING_PATH = bindingPath;
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

function safeError(error) {
  const code = error?.statusCode ?? error?.code;
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
  seedItem,
  inspectRead,
  createClient,
  checkContainer,
  provenance,
  safeError,
  sha256,
};
