// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers detection of changes performed on Azure File share connected to the specified Azure File Sync Cloud Endpoint.
 *
 * @summary triggers detection of changes performed on Azure File share connected to the specified Azure File Sync Cloud Endpoint.
 * x-ms-original-file: 2022-09-01/CloudEndpoints_TriggerChangeDetection.json
 */
async function cloudEndpointsTriggerChangeDetection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  await client.cloudEndpoints.triggerChangeDetection(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleCloudEndpoint_1",
    { changeDetectionMode: "Recursive", directoryPath: "NewDirectory" },
  );
}

async function main() {
  await cloudEndpointsTriggerChangeDetection();
}

main().catch(console.error);
