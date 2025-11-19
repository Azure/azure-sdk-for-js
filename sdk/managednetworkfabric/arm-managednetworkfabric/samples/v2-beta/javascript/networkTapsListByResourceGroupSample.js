// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to displays Network Taps list by resource group GET method.
 *
 * @summary displays Network Taps list by resource group GET method.
 * x-ms-original-file: 2024-06-15-preview/NetworkTaps_ListByResourceGroup.json
 */
async function networkTapsListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkTaps.listByResourceGroup("example-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkTapsListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
