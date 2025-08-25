// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a network interface.
 *
 * @summary Creates or updates a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkInterfaceCreate.json
 */

import type { NetworkInterfacesCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createNetworkInterface(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkInterfaceName = "test-nic";
  const options: NetworkInterfacesCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        disableTcpStateTracking: true,
        enableAcceleratedNetworking: true,
        ipConfigurations: [
          {
            name: "ipconfig1",
            properties: {
              publicIPAddress: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/test-ip",
              },
              subnet: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/rg1-vnet/subnets/default",
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
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}",
      subscriptionId,
      resourceGroupName,
      networkInterfaceName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createNetworkInterface().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a network interface.
 *
 * @summary Creates or updates a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkInterfaceCreateGatewayLoadBalancerConsumer.json
 */
async function createNetworkInterfaceWithGatewayLoadBalancerConsumerConfigured(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkInterfaceName = "test-nic";
  const options: NetworkInterfacesCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        enableAcceleratedNetworking: true,
        ipConfigurations: [
          {
            name: "ipconfig1",
            properties: {
              gatewayLoadBalancer: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb-provider",
              },
              publicIPAddress: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/test-ip",
              },
              subnet: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/rg1-vnet/subnets/default",
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
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}",
      subscriptionId,
      resourceGroupName,
      networkInterfaceName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createNetworkInterfaceWithGatewayLoadBalancerConsumerConfigured().catch(console.error);
