// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves details of this Network Packet Broker.
 *
 * @summary retrieves details of this Network Packet Broker.
 * x-ms-original-file: 2024-06-15-preview/NetworkPacketBrokers_Get.json
 */
async function networkPacketBrokersGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkPacketBrokers.get("example-rg", "example-networkPacketBroker");
  console.log(result);
}

async function main(): Promise<void> {
  await networkPacketBrokersGetMaximumSetGen();
}

main().catch(console.error);
