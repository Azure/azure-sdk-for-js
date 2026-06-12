// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a storage sync service.
 *
 * @summary gets the private link resources that need to be created for a storage sync service.
 * x-ms-original-file: 2022-09-01/PrivateLinkResources_List.json
 */
async function privateLinkResourcesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.privateLinkResources.listByStorageSyncService("res6977", "sss2527");
  console.log(result);
}

async function main() {
  await privateLinkResourcesList();
}

main().catch(console.error);
