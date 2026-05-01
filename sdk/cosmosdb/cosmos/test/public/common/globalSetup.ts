// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Global setup for integration tests (both Node and browser).
 * Runs in Node.js context before tests start.
 *
 * - Attempts to connect to the Cosmos emulator
 * - If reachable, cleans up all databases and provides config via inject()
 * - If unreachable, logs a warning (unit tests still run, integration tests skip)
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

export default async function ({ provide }: TestProject): Promise<void> {
  const endpoint = process.env.ACCOUNT_HOST || "https://localhost:8081";
  const masterKey =
    process.env.ACCOUNT_KEY ||
    "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
  const userSasTokenKey =
    "type=sas&ver=1.0&sig=pCgZFxV9JQN1i3vzYNTfQldW1No7I+MSgN628TZcJAI=;dXNlcjEKCi9kYnMvZGIxL2NvbGxzL2NvbGwxLwoKNUZFRTY2MDEKNjIxM0I3MDEKMAo2MAowCkZGRkZGRkZGCjAK";
  const skipTestForSignOff = process.env.SKIP_COMPUTE_GATEWAY_TESTS === "true";

  // Disable TLS verification for the self-signed emulator certificate
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // Always provide config values so inject() never returns undefined
  provide("cosmosEndpoint", endpoint);
  provide("cosmosMasterKey", masterKey);
  provide("cosmosUserSasTokenKey", userSasTokenKey);
  provide("skipTestForSignOff", skipTestForSignOff);

  const client = new CosmosClient({
    endpoint,
    key: masterKey,
    connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    diagnosticLevel: CosmosDbDiagnosticLevel.info,
  });

  try {
    const { resources: databases } = await client.databases.readAll().fetchAll();
    await Promise.all(databases.map((db) => client.database(db.id).delete()));
    provide("emulatorUnavailable", false);
  } catch {
    console.warn(
      `⚠️  Cosmos emulator not available at ${endpoint}. Integration tests will be skipped.`,
    );
    provide("emulatorUnavailable", true);
  }
}
