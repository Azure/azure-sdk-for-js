// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a virtual wan p2s vpn gateway if it doesn't exist else updates the existing gateway.
 *
 * @summary Creates a virtual wan p2s vpn gateway if it doesn't exist else updates the existing gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/P2SVpnGatewayPut.json
 */

import type { P2SVpnGatewaysCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function p2SVpnGatewayPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const gatewayName = "p2sVpnGateway1";
  const options: P2SVpnGatewaysCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        customDnsServers: ["1.1.1.1", "2.2.2.2"],
        isRoutingPreferenceInternet: false,
        p2SConnectionConfigurations: [
          {
            name: "P2SConnectionConfig1",
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/p2sVpnGateways/p2sVpnGateway1/p2sConnectionConfigurations/P2SConnectionConfig1",
            properties: {
              routingConfiguration: {
                associatedRouteTable: {
                  id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
                },
                propagatedRouteTables: {
                  ids: [
                    {
                      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
                    },
                    {
                      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable2",
                    },
                    {
                      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable3",
                    },
                  ],
                  labels: ["label1", "label2"],
                },
                vnetRoutes: { staticRoutes: [] },
              },
              vpnClientAddressPool: { addressPrefixes: ["101.3.0.0/16"] },
            },
          },
        ],
        virtualHub: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1",
        },
        vpnGatewayScaleUnit: 1,
        vpnServerConfiguration: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/vpnServerConfigurations/vpnServerConfiguration1",
        },
      },
      tags: { key1: "value1" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}",
      subscriptionId,
      resourceGroupName,
      gatewayName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

p2SVpnGatewayPut().catch(console.error);
