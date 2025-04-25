// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a NeonDatabase
 *
 * @summary delete a NeonDatabase
 * x-ms-original-file: 2025-03-01/NeonDatabases_Delete_MaximumSet_Gen.json
 */
async function neonDatabasesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  await client.neonDatabases.delete(
    "rgneon",
    "test-org",
    "entity-name",
    "entity-name",
    "entity-name",
  );
}

async function main(): Promise<void> {
  await neonDatabasesDeleteMaximumSet();
}

main().catch(console.error);
