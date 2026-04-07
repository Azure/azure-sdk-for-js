// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refreshes a hub database schema.
 *
 * @summary refreshes a hub database schema.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupRefreshHubSchema.json
 */
async function refreshAHubDatabaseSchema(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.syncGroups.refreshHubSchema(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
  );
}

async function main(): Promise<void> {
  await refreshAHubDatabaseSchema();
}

main().catch(console.error);
