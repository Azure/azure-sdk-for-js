// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to displays Network Packet Brokers list by subscription GET method.
 *
 * @summary displays Network Packet Brokers list by subscription GET method.
 * x-ms-original-file: 2024-06-15-preview/NetworkPacketBrokers_ListBySubscription.json
 */
async function networkPacketBrokersListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkPacketBrokers.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkPacketBrokersListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
