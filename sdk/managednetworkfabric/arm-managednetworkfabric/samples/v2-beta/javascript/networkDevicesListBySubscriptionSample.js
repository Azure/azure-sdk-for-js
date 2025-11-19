// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the Network Device resources in a given subscription.
 *
 * @summary list all the Network Device resources in a given subscription.
 * x-ms-original-file: 2024-06-15-preview/NetworkDevices_ListBySubscription.json
 */
async function networkDevicesListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkDevices.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkDevicesListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
