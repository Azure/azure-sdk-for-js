// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list StorageContainer resources by resource group
 *
 * @summary list StorageContainer resources by resource group
 * x-ms-original-file: 2026-02-01-preview/StorageContainers_ListByResourceGroup_MaximumSet_Gen.json
 */
async function storageContainersListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
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
