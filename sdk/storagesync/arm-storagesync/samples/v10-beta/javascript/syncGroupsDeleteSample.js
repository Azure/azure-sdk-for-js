// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a given SyncGroup.
 *
 * @summary delete a given SyncGroup.
 * x-ms-original-file: 2022-09-01/SyncGroups_Delete.json
 */
async function syncGroupsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  await client.syncGroups.delete(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
  );
}

async function main() {
  await syncGroupsDelete();
}

main().catch(console.error);
