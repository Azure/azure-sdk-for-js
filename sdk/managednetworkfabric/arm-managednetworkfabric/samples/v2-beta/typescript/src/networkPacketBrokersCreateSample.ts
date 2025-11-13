// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a Network Packet Broker.
 *
 * @summary creates a Network Packet Broker.
 * x-ms-original-file: 2024-06-15-preview/NetworkPacketBrokers_Create.json
 */
async function networkPacketBrokersCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkPacketBrokers.create(
    "example-rg",
    "example-networkPacketBroker",
    {
      properties: {
        networkFabricId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-networkFabric",
      },
      tags: { keyId: "keyValue" },
      location: "eastuseuap",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkPacketBrokersCreateMaximumSetGen();
}

main().catch(console.error);
