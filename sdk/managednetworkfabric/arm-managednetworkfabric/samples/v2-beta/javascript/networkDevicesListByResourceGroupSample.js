// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the Network Device resources in a given resource group.
 *
 * @summary list all the Network Device resources in a given resource group.
 * x-ms-original-file: 2024-06-15-preview/NetworkDevices_ListByResourceGroup.json
 */
async function networkDevicesListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkDevices.listByResourceGroup("example-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkDevicesListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
