// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to update certain properties of the Network Packet Broker resource.
 *
 * @summary aPI to update certain properties of the Network Packet Broker resource.
 * x-ms-original-file: 2025-07-15/NetworkPacketBrokers_Update.json
 */
async function networkPacketBrokersUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkPacketBrokers.update(
    "example-rg",
    "example-networkPacketBroker",
    {
      tags: { keyId: "keyValue" },
      identity: { type: "None", userAssignedIdentities: { key8793: {} } },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkPacketBrokersUpdateMaximumSetGen();
}

main().catch(console.error);
