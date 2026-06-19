// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a given SyncGroup.
 *
 * @summary delete a given SyncGroup.
 * x-ms-original-file: 2022-09-01/SyncGroups_Delete.json
 */
async function syncGroupsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  await client.syncGroups.delete(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
  );
}

async function main(): Promise<void> {
  await syncGroupsDelete();
}

main().catch(console.error);
