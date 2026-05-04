// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Global setup for integration tests (both Node and browser).
 * Runs in Node.js context before tests start.
 *
 * Works in multiple environments:
 * - CI (Windows): emulator is started by pipeline steps before tests run
 * - Local: expects a pre-started emulator or live account; skips gracefully if unavailable
 */
import type { TestProject } from "vitest/node";
import { CosmosClient, CosmosDbDiagnosticLevel } from "../../../src/index.js";

declare module "vitest" {
  interface ProvidedContext {
    cosmosEndpoint: string;
    cosmosMasterKey: string;
    cosmosUserSasTokenKey: string;
    skipTestForSignOff: boolean;
    emulatorUnavailable: boolean;
  }
}

const DEFAULT_ENDPOINT = "https://localhost:8081";
const DEFAULT_KEY =
  "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

// Store original value to restore in teardown
let originalTlsRejectUnauthorized: string | undefined;

async function isEmulatorReady(endpoint: string, key: string): Promise<boolean> {
  const client = new CosmosClient({
    endpoint,
    key,
    connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    diagnosticLevel: CosmosDbDiagnosticLevel.info,
  });
  try {
    await client.databases.readAll().fetchAll();
    return true;
  } catch {
    return false;
  } finally {
    client.dispose();
  }
}

export default async function ({ provide }: TestProject): Promise<void> {
  const endpoint = process.env.ACCOUNT_HOST || DEFAULT_ENDPOINT;
  const masterKey = process.env.ACCOUNT_KEY || DEFAULT_KEY;
  const userSasTokenKey =
    "type=sas&ver=1.0&sig=pCgZFxV9JQN1i3vzYNTfQldW1No7I+MSgN628TZcJAI=;dXNlcjEKCi9kYnMvZGIxL2NvbGxzL2NvbGwxLwoKNUZFRTY2MDEKNjIxM0I3MDEKMAo2MAowCkZGRkZGRkZGCjAK";
  const skipTestForSignOff = process.env.SKIP_COMPUTE_GATEWAY_TESTS === "true";

  // Disable TLS verification only for the emulator's self-signed certificate.
  // The well-known default key indicates we're targeting an emulator, not a real service.
  if (masterKey === DEFAULT_KEY) {
    originalTlsRejectUnauthorized = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  // Always provide config values so inject() never returns undefined
  provide("cosmosEndpoint", endpoint);
  provide("cosmosMasterKey", masterKey);
  provide("cosmosUserSasTokenKey", userSasTokenKey);
  provide("skipTestForSignOff", skipTestForSignOff);

  // Check if the emulator/account is reachable
  if (await isEmulatorReady(endpoint, masterKey)) {
    console.log(`✅ Cosmos endpoint available at ${endpoint}`);
    await cleanupDatabases(endpoint, masterKey);
    provide("emulatorUnavailable", false);
  } else {
    console.warn(
      `⚠️  Cosmos endpoint at ${endpoint} is not reachable. Integration tests will be skipped.`,
    );
    provide("emulatorUnavailable", true);
  }
}

async function cleanupDatabases(endpoint: string, key: string): Promise<void> {
  const client = new CosmosClient({
    endpoint,
    key,
    connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    diagnosticLevel: CosmosDbDiagnosticLevel.info,
  });

  try {
    const { resources: databases } = await client.databases.readAll().fetchAll();
    if (databases.length > 0) {
      await Promise.all(databases.map((db) => client.database(db.id).delete()));
      console.log(`🗑️  Cleaned up ${databases.length} existing database(s)`);
    }
  } finally {
    client.dispose();
  }
}

/**
 * Global teardown - restores NODE_TLS_REJECT_UNAUTHORIZED to its original value.
 */
export function teardown(): void {
  if (originalTlsRejectUnauthorized !== undefined) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalTlsRejectUnauthorized;
  } else {
    delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  }
}
