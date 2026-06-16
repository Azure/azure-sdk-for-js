// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a given ServerEndpoint.
 *
 * @summary delete a given ServerEndpoint.
 * x-ms-original-file: 2022-09-01/ServerEndpoints_Delete.json
 */
async function serverEndpointsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  await client.serverEndpoints.delete(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleServerEndpoint_1",
  );
}

async function main() {
  await serverEndpointsDelete();
}

main().catch(console.error);
