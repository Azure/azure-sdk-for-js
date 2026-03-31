// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to swaps VIPs between two load balancers.
 *
 * @summary swaps VIPs between two load balancers.
 * x-ms-original-file: 2025-05-01/LoadBalancersSwapPublicIpAddresses.json
 */
async function swapVIPsBetweenTwoLoadBalancers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.loadBalancers.swapPublicIpAddresses("westus", {
    frontendIPConfigurations: [
      {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb1/frontendIPConfigurations/lbfe1",
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Network/publicIPAddresses/pip2",
        },
      },
      {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Network/loadBalancers/lb2/frontendIPConfigurations/lbfe2",
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pip1",
        },
      },
    ],
  });
}

async function main() {
  await swapVIPsBetweenTwoLoadBalancers();
}

main().catch(console.error);
