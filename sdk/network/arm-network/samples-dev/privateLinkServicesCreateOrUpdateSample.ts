// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an private link service in the specified resource group.
 *
 * @summary creates or updates an private link service in the specified resource group.
 * x-ms-original-file: 2025-05-01/PrivateLinkServiceCreate.json
 */
async function createPrivateLinkService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateLinkServices.createOrUpdate("rg1", "testPls", {
    location: "eastus",
    autoApproval: { subscriptions: ["subscription1", "subscription2"] },
    fqdns: ["fqdn1", "fqdn2", "fqdn3"],
    ipConfigurations: [
      {
        name: "fe-lb",
        privateIPAddress: "10.0.1.4",
        privateIPAddressVersion: "IPv4",
        privateIPAllocationMethod: "Static",
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
        },
      },
    ],
    loadBalancerFrontendIpConfigurations: [
      {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
      },
    ],
    visibility: { subscriptions: ["subscription1", "subscription2", "subscription3"] },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createPrivateLinkService();
}

main().catch(console.error);
