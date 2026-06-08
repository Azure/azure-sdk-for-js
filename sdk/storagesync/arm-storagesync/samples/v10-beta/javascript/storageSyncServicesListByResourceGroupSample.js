// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a StorageSyncService list by Resource group name.
 *
 * @summary get a StorageSyncService list by Resource group name.
 * x-ms-original-file: 2022-09-01/StorageSyncServices_ListByResourceGroup.json
 */
async function storageSyncServicesListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageSyncServices.listByResourceGroup(
    "SampleResourceGroup_1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await storageSyncServicesListByResourceGroup();
}

main().catch(console.error);
