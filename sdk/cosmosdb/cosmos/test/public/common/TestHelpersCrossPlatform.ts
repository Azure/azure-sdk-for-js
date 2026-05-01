// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Cross-platform test helpers for browser integration tests.
 * Uses vitest's inject() to receive values from the globalSetup script
 * which runs in Node.js and provides endpoint/masterKey via provide().
 * Falls back to environment variables for Node test runs without globalSetup.
 */
import type { DatabaseDefinition, Response } from "../../../src/index.js";
import { CosmosClient, CosmosDbDiagnosticLevel } from "../../../src/index.js";
import { assert, inject } from "vitest";

declare module "vitest" {
  interface ProvidedContext {
    cosmosEndpoint: string;
    cosmosMasterKey: string;
    skipTestForSignOff: boolean;
  }
}

function getEndpoint(): string {
  return (
    inject("cosmosEndpoint") || process.env.ACCOUNT_HOST || "https://localhost:8081"
  );
}

function getMasterKey(): string {
  return (
    inject("cosmosMasterKey") ||
    process.env.ACCOUNT_KEY ||
    "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="
  );
}

export function getDefaultClient(): CosmosClient {
  return new CosmosClient({
    endpoint: getEndpoint(),
    key: getMasterKey(),
    connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    diagnosticLevel: CosmosDbDiagnosticLevel.info,
  });
}

export async function removeAllDatabases(client?: CosmosClient): Promise<void> {
  try {
    if (!client) {
      client = getDefaultClient();
    }
    const { resources: databases } = await client.databases.readAll().fetchAll();
    const length = databases.length;

    if (length === 0) {
      return;
    }

    await Promise.all(
      databases.map<Promise<Response<DatabaseDefinition>>>(async (database: DatabaseDefinition) =>
        client.database(database.id).delete(),
      ),
    );
  } catch (err: any) {
    console.log("An error occured", err);
    assert.fail(err);
    throw err;
  }
}
