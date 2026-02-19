// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualNetworkAppliance} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a virtual network appliance.
 *
 * @summary Creates or updates a virtual network appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkAppliances_CreateOrUpdate.json
 */
async function createVirtualNetworkAppliance(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkApplianceName = "test-vna";
  const parameters: VirtualNetworkAppliance = {
    bandwidthInGbps: "100",
    location: "eastus",
    subnet: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/rg1-vnet/subnets/default",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkAppliances.beginCreateOrUpdateAndWait(
      resourceGroupName,
      virtualNetworkApplianceName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createVirtualNetworkAppliance();
}

main().catch(console.error);
