// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a given registered server list.
 *
 * @summary get a given registered server list.
 * x-ms-original-file: 2022-09-01/RegisteredServers_ListByStorageSyncService.json
 */
async function registeredServersListByStorageSyncService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registeredServers.listByStorageSyncService(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await registeredServersListByStorageSyncService();
}

main().catch(console.error);
