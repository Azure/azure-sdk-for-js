// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a load balancer backend address pool.
 *
 * @summary creates or updates a load balancer backend address pool.
 * x-ms-original-file: 2025-05-01/LBBackendAddressPoolWithBackendAddressesPut.json
 */
async function updateLoadBalancerBackendPoolWithBackendAddressesContainingVirtualNetworkAndIPAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerBackendAddressPools.createOrUpdate(
    "testrg",
    "lb",
    "backend",
    {
      loadBalancerBackendAddresses: [
        {
          name: "address1",
          ipAddress: "10.0.0.4",
          virtualNetwork: {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb",
          },
        },
        {
          name: "address2",
          ipAddress: "10.0.0.5",
          virtualNetwork: {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb",
          },
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateLoadBalancerBackendPoolWithBackendAddressesContainingVirtualNetworkAndIPAddress();
}

main().catch(console.error);
