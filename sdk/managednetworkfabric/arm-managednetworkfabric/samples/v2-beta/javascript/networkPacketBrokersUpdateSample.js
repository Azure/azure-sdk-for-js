// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aPI to update certain properties of the Network Packet Broker resource.
 *
 * @summary aPI to update certain properties of the Network Packet Broker resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkPacketBrokers_Update.json
 */
async function networkPacketBrokersUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkPacketBrokers.update(
    "example-rg",
    "example-networkPacketBroker",
    { tags: { keyId: "keyValue" } },
  );
  console.log(result);
}

async function main() {
  await networkPacketBrokersUpdateMaximumSetGen();
}

main().catch(console.error);
