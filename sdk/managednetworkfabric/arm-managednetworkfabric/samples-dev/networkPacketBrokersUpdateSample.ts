// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to API to update certain properties of the Network Packet Broker resource.
 *
 * @summary API to update certain properties of the Network Packet Broker resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkPacketBrokers_Update_MaximumSet_Gen.json
 */

import type { NetworkPacketBrokerPatch } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkPacketBrokersUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkPacketBrokerName = "example-networkPacketBroker";
  const body: NetworkPacketBrokerPatch = { tags: { key8772: "1234" } };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkPacketBrokers.beginUpdateAndWait(
    resourceGroupName,
    networkPacketBrokerName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkPacketBrokersUpdateMaximumSetGen();
}

main().catch(console.error);
