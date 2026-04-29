// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels a sync group synchronization.
 *
 * @summary cancels a sync group synchronization.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupCancelSync.json
 */
async function cancelASyncGroupSynchronization(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.syncGroups.cancelSync(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
  );
}

async function main(): Promise<void> {
  await cancelASyncGroupSynchronization();
}

main().catch(console.error);
