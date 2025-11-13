// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Network Rack resources in the given subscription
 *
 * @summary list all Network Rack resources in the given subscription
 * x-ms-original-file: 2024-06-15-preview/NetworkRacks_ListBySubscription.json
 */
async function networkRacksListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkRacks.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkRacksListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
