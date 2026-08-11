// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new SyncGroup.
 *
 * @summary create a new SyncGroup.
 * x-ms-original-file: 2022-09-01/SyncGroups_Create.json
 */
async function syncGroupsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.syncGroups.create(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    { properties: {} },
  );
  console.log(result);
}

async function main() {
  await syncGroupsCreate();
}

main().catch(console.error);
