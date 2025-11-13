// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes Network Packet Broker.
 *
 * @summary deletes Network Packet Broker.
 * x-ms-original-file: 2024-06-15-preview/NetworkPacketBrokers_Delete.json
 */
async function networkPacketBrokersDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.networkPacketBrokers.delete("example-rg", "example-networkPacketBroker");
}

async function main() {
  await networkPacketBrokersDeleteMaximumSetGen();
}

main().catch(console.error);
