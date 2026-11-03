// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a StorageContainer
 *
 * @summary get a StorageContainer
 * x-ms-original-file: 2026-06-01/StorageContainers_Get_MaximumSet_Gen.json
 */
async function storageContainersGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageContainers.get("rgdiscovery", "60fa9761e5831e6b1e");
  console.log(result);
}

async function main() {
  await storageContainersGetMaximumSet();
}

main().catch(console.error);
