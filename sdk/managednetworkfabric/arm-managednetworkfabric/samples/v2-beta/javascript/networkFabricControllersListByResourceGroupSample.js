// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the NetworkFabricControllers thats available in the resource group.
 *
 * @summary lists all the NetworkFabricControllers thats available in the resource group.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabricControllers_ListByResourceGroup.json
 */
async function networkFabricControllersListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkFabricControllers.listByResourceGroup("example-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkFabricControllersListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
