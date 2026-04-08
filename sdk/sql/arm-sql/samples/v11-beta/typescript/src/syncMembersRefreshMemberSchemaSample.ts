// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refreshes a sync member database schema.
 *
 * @summary refreshes a sync member database schema.
 * x-ms-original-file: 2025-02-01-preview/SyncMemberRefreshSchema.json
 */
async function refreshASyncMemberDatabaseSchema(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.syncMembers.refreshMemberSchema(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    "syncgroupcrud-4879",
  );
}

async function main(): Promise<void> {
  await refreshASyncMemberDatabaseSchema();
}

main().catch(console.error);
