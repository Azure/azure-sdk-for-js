// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Global setup for browser integration tests.
 * Runs in Node.js context before the browser tests start.
 *
 * - Verifies the Cosmos emulator is reachable
 * - Cleans up all databases (uses Node APIs not available in browser)
 * - Provides endpoint, masterKey, and config to browser tests via inject()
 */
import type { TestProject } from "vitest/node";
import { CosmosClient, CosmosDbDiagnosticLevel } from "../../../src/index.js";

declare module "vitest" {
  interface ProvidedContext {
    cosmosEndpoint: string;
    cosmosMasterKey: string;
    skipTestForSignOff: boolean;
  }
}

export default async function ({ provide }: TestProject): Promise<void> {
  const endpoint = process.env.ACCOUNT_HOST || "https://localhost:8081";
  const masterKey =
    process.env.ACCOUNT_KEY ||
    "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
  const skipTestForSignOff = process.env.SKIP_COMPUTE_GATEWAY_TESTS === "true";

  // Disable TLS verification for the self-signed emulator certificate
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // Verify emulator is reachable and clean up databases
  const client = new CosmosClient({
    endpoint,
    key: masterKey,
    connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    diagnosticLevel: CosmosDbDiagnosticLevel.info,
  });

  try {
    const { resources: databases } = await client.databases.readAll().fetchAll();
    await Promise.all(databases.map((db) => client.database(db.id).delete()));
  } catch (err: any) {
    console.warn(
      `⚠️  Could not connect to Cosmos emulator at ${endpoint}. ` +
        `Make sure the emulator is running. Error: ${err.message}`,
    );
    throw err;
  }

  provide("cosmosEndpoint", endpoint);
  provide("cosmosMasterKey", masterKey);
  provide("skipTestForSignOff", skipTestForSignOff);
}
