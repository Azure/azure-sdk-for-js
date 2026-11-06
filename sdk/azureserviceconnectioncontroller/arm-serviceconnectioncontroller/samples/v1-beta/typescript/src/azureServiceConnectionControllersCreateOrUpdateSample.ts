// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-serviceconnectioncontroller";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Azure Service Connection Controller.
 *
 * @summary creates or updates an Azure Service Connection Controller.
 * x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_CreateOrUpdate.json
 */
async function azureServiceConnectionControllersCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.azureServiceConnectionControllers.createOrUpdate("rg1", "pg1", {
    location: "eastus",
    properties: {
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      ipConfigurations: [{ privateIpV4Address: "10.0.0.10", ipAllocationMethod: "Static" }],
      providerConnections: [
        {
          name: "provider-connection",
          ipConfiguration: { privateIpV4Address: "10.0.0.11", ipAllocationMethod: "Static" },
          subnetId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet2",
          privateEndpointResourceGroup:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/pe-rg1",
        },
      ],
    },
    managedBy:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/probingGateways/pg1",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await azureServiceConnectionControllersCreateOrUpdate();
}

main().catch(console.error);
