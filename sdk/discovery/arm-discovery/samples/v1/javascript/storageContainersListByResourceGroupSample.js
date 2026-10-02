// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list StorageContainer resources by resource group
 *
 * @summary list StorageContainer resources by resource group
 * x-ms-original-file: 2026-06-01/StorageContainers_ListByResourceGroup_MaximumSet_Gen.json
 */
async function storageContainersListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageContainers.listByResourceGroup("rgdiscovery")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await storageContainersListByResourceGroupMaximumSet();
}

main().catch(console.error);
