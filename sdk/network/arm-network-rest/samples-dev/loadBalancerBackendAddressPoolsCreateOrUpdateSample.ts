// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a load balancer backend address pool.
 *
 * @summary Creates or updates a load balancer backend address pool.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LBBackendAddressPoolWithBackendAddressesPut.json
 */

import type { LoadBalancerBackendAddressPoolsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateLoadBalancerBackendPoolWithBackendAddressesContainingVirtualNetworkAndIPAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "testrg";
  const loadBalancerName = "lb";
  const backendAddressPoolName = "backend";
  const options: LoadBalancerBackendAddressPoolsCreateOrUpdateParameters = {
    body: {
      properties: {
        loadBalancerBackendAddresses: [
          {
            name: "address1",
            properties: {
              ipAddress: "10.0.0.4",
              virtualNetwork: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb",
              },
            },
          },
          {
            name: "address2",
            properties: {
              ipAddress: "10.0.0.5",
              virtualNetwork: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb",
              },
            },
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendAddressPoolName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
      backendAddressPoolName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateLoadBalancerBackendPoolWithBackendAddressesContainingVirtualNetworkAndIPAddress().catch(
  console.error,
);
