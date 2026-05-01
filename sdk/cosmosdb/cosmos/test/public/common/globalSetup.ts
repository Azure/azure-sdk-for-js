// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Global setup for integration tests (both Node and browser).
 * Runs in Node.js context before tests start.
 *
 * Works in multiple environments:
 * - CI (Windows): emulator is started by pipeline steps before tests run
 * - CI (Linux): ACCOUNT_HOST points to a live account or pre-started emulator
 * - Local (Docker): starts the emulator container automatically if Docker is available
 * - Local (no Docker): skips integration tests gracefully
 */
import { execSync } from "node:child_process";
import type { TestProject } from "vitest/node";
import { CosmosClient, CosmosDbDiagnosticLevel } from "../../../src/index.js";

declare module "vitest" {
  interface ProvidedContext {
    cosmosEndpoint: string;
    cosmosMasterKey: string;
    cosmosUserSasTokenKey: string;
    skipTestForSignOff: boolean;
    emulatorUnavailable: boolean;
    /**
     * True when running against the Linux Docker emulator which lacks
     * features like EnableSqlComputeEndpoint and certain preview capabilities.
     * Tests requiring these features should be skipped.
     */
    linuxEmulator: boolean;
  }
}

const EMULATOR_IMAGE = "mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:latest";
const EMULATOR_CONTAINER_NAME = "cosmos-emulator";
const EMULATOR_PORT = 8081;
const EMULATOR_STARTUP_TIMEOUT_MS = 120_000;
const HEALTH_CHECK_INTERVAL_MS = 3_000;
const DEFAULT_ENDPOINT = `https://localhost:${EMULATOR_PORT}`;
const DEFAULT_KEY =
  "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

function exec(cmd: string): string {
  try {
    return execSync(cmd, { encoding: "utf-8", stdio: "pipe" }).trim();
  } catch {
    return "";
  }
}

function isDockerAvailable(): boolean {
  return exec("docker info") !== "";
}

function isEmulatorContainerRunning(): boolean {
  const status = exec(
    `docker inspect --format='{{.State.Running}}' ${EMULATOR_CONTAINER_NAME} 2>/dev/null`,
  );
  return status.includes("true");
}

function startEmulatorContainer(): void {
  // Remove any stopped container with the same name
  exec(`docker rm -f ${EMULATOR_CONTAINER_NAME} 2>/dev/null`);

  // Use fewer partitions (20 vs CI's 50) — the Linux Docker emulator's HTTP
  // emulation layer (sqlpal → Http.sys) can crash under sustained load with
  // higher partition counts. CI uses the native Windows emulator which is more stable.
  const cmd = [
    "docker run -d --memory=4g --cpus=2",
    `--name ${EMULATOR_CONTAINER_NAME}`,
    `-p ${EMULATOR_PORT}:8081`,
    "-p 10250-10255:10250-10255",
    `-e AZURE_COSMOS_EMULATOR_PARTITION_COUNT=20`,
    `-e AZURE_COSMOS_EMULATOR_IP_ADDRESS_OVERRIDE=127.0.0.1`,
    `-e AZURE_COSMOS_EMULATOR_ENABLE_DATA_PERSISTENCE=false`,
    `-e AZURE_COSMOS_EMULATOR_ENABLE_PREVIEW=true`,
    `-e AZURE_COSMOS_EMULATOR_DISABLE_RATE_LIMITING=true`,
    `-e AZURE_COSMOS_EMULATOR_ENABLE_AAD_AUTHENTICATION=true`,
    EMULATOR_IMAGE,
  ].join(" ");

  const result = exec(cmd);
  if (!result) {
    throw new Error("Failed to start Cosmos emulator Docker container");
  }
  console.log(`🚀 Started Cosmos emulator container: ${result.slice(0, 12)}`);
}

async function isEmulatorReady(endpoint: string, key: string): Promise<boolean> {
  try {
    const client = new CosmosClient({
      endpoint,
      key,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
      diagnosticLevel: CosmosDbDiagnosticLevel.info,
    });
    await client.databases.readAll().fetchAll();
    return true;
  } catch {
    return false;
  }
}

async function waitForEmulator(endpoint: string, key: string): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < EMULATOR_STARTUP_TIMEOUT_MS) {
    if (await isEmulatorReady(endpoint, key)) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, HEALTH_CHECK_INTERVAL_MS));
  }
  return false;
}

export default async function ({ provide }: TestProject): Promise<void> {
  const endpoint = process.env.ACCOUNT_HOST || DEFAULT_ENDPOINT;
  const masterKey = process.env.ACCOUNT_KEY || DEFAULT_KEY;
  const userSasTokenKey =
    "type=sas&ver=1.0&sig=pCgZFxV9JQN1i3vzYNTfQldW1No7I+MSgN628TZcJAI=;dXNlcjEKCi9kYnMvZGIxL2NvbGxzL2NvbGwxLwoKNUZFRTY2MDEKNjIxM0I3MDEKMAo2MAowCkZGRkZGRkZGCjAK";
  const skipTestForSignOff = process.env.SKIP_COMPUTE_GATEWAY_TESTS === "true";

  // On non-Windows without an external account, we're using the Linux Docker emulator
  // which lacks EnableSqlComputeEndpoint and some preview features
  const isLinuxEmulator = process.platform !== "win32" && !process.env.ACCOUNT_HOST;

  // Disable TLS verification only for the emulator's self-signed certificate.
  // The well-known default key indicates we're targeting an emulator, not a real service.
  if (masterKey === DEFAULT_KEY) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  // Always provide config values so inject() never returns undefined
  provide("cosmosEndpoint", endpoint);
  provide("cosmosMasterKey", masterKey);
  provide("cosmosUserSasTokenKey", userSasTokenKey);
  provide("skipTestForSignOff", skipTestForSignOff);
  provide("linuxEmulator", isLinuxEmulator);

  // 1. Check if an emulator/account is already reachable (CI or pre-started local)
  if (await isEmulatorReady(endpoint, masterKey)) {
    console.log(`✅ Cosmos endpoint already available at ${endpoint}`);
    await cleanupDatabases(endpoint, masterKey);
    provide("emulatorUnavailable", false);
    return;
  }

  // 2. If using an external endpoint (ACCOUNT_HOST set), don't try Docker — just fail gracefully
  if (process.env.ACCOUNT_HOST) {
    console.warn(
      `⚠️  Configured endpoint ${endpoint} is not reachable. Integration tests will be skipped.`,
    );
    provide("emulatorUnavailable", true);
    return;
  }

  // 3. Try to start via Docker locally
  if (process.env.COSMOS_SKIP_DOCKER || !isDockerAvailable()) {
    console.warn(
      "⚠️  No emulator running and Docker not available. Integration tests will be skipped.",
    );
    provide("emulatorUnavailable", true);
    return;
  }

  if (!isEmulatorContainerRunning()) {
    console.log("🐳 Starting Cosmos DB emulator via Docker...");
    try {
      startEmulatorContainer();
    } catch (e: any) {
      console.warn(`⚠️  Failed to start emulator container: ${e.message}`);
      provide("emulatorUnavailable", true);
      return;
    }
  } else {
    console.log("🐳 Cosmos emulator container already running, waiting for it to be ready...");
  }

  // 4. Wait for the emulator to become ready
  console.log(
    `⏳ Waiting for Cosmos emulator at ${endpoint} (timeout: ${EMULATOR_STARTUP_TIMEOUT_MS / 1000}s)...`,
  );
  const ready = await waitForEmulator(endpoint, masterKey);
  if (!ready) {
    console.warn(
      `⚠️  Cosmos emulator not ready after ${EMULATOR_STARTUP_TIMEOUT_MS / 1000}s. Integration tests will be skipped.`,
    );
    provide("emulatorUnavailable", true);
    return;
  }

  console.log("✅ Cosmos emulator is ready");
  await cleanupDatabases(endpoint, masterKey);
  provide("emulatorUnavailable", false);
}

async function cleanupDatabases(endpoint: string, key: string): Promise<void> {
  const client = new CosmosClient({
    endpoint,
    key,
    connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    diagnosticLevel: CosmosDbDiagnosticLevel.info,
  });

  const { resources: databases } = await client.databases.readAll().fetchAll();
  if (databases.length > 0) {
    await Promise.all(databases.map((db) => client.database(db.id).delete()));
    console.log(`🗑️  Cleaned up ${databases.length} existing database(s)`);
  }
}
