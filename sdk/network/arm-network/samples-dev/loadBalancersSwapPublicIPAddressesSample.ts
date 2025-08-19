// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Swaps VIPs between two load balancers.
 *
 * @summary Swaps VIPs between two load balancers.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/LoadBalancersSwapPublicIpAddresses.json
 */

import type {
  LoadBalancerVipSwapRequest} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function swapViPsBetweenTwoLoadBalancers(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const location = "westus";
  const parameters: LoadBalancerVipSwapRequest = {
    frontendIPConfigurations: [
      {
        id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb1/frontendIPConfigurations/lbfe1",
        publicIPAddress: {
          id: "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Network/publicIPAddresses/pip2",
        },
      },
      {
        id: "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Network/loadBalancers/lb2/frontendIPConfigurations/lbfe2",
        publicIPAddress: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pip1",
        },
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.beginSwapPublicIpAddressesAndWait(
    location,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await swapViPsBetweenTwoLoadBalancers();
}

main().catch(console.error);
