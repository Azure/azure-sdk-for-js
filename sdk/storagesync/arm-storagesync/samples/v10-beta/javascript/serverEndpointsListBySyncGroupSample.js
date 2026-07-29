// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ServerEndpoint list.
 *
 * @summary get a ServerEndpoint list.
 * x-ms-original-file: 2022-09-01/ServerEndpoints_ListBySyncGroup.json
 */
async function serverEndpointsListBySyncGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverEndpoints.listBySyncGroup(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await serverEndpointsListBySyncGroup();
}

main().catch(console.error);
