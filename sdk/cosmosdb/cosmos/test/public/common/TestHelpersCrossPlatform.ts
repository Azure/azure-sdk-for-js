// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Cross-platform test helpers for integration tests.
 * Uses vitest's inject() to receive values from globalSetup.ts
 * which runs in Node.js and provides endpoint/masterKey via provide().
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

export function getDefaultClient(): CosmosClient {
  return new CosmosClient({
    endpoint: inject("cosmosEndpoint"),
    key: inject("cosmosMasterKey"),
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
