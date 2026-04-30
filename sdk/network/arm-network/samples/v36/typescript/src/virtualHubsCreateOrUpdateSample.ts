// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VirtualHub} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub.
 *
 * @summary Creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualHubPut.json
 */
async function virtualHubPut(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub2";
  const virtualHubParameters: VirtualHub = {
    addressPrefix: "10.168.0.0/24",
    location: "West US",
    sku: "Basic",
    tags: { key1: "value1" },
    virtualWan: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualWans/virtualWan1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubs.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualHubName,
    virtualHubParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualHubPut();
}

main().catch(console.error);
