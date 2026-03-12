// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing connection.
 *
 * @summary Creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing connection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VpnConnectionPut.json
 */

import type { VpnConnectionsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function vpnConnectionPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const gatewayName = "gateway1";
  const connectionName = "vpnConnection1";
  const options: VpnConnectionsCreateOrUpdateParameters = {
    body: {
      properties: {
        remoteVpnSite: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/vpnSites/vpnSite1",
        },
        routingConfiguration: {
          associatedRouteTable: {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable1",
          },
          inboundRouteMap: {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap1",
          },
          outboundRouteMap: {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap2",
          },
          propagatedRouteTables: {
            ids: [
              {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable1",
              },
              {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable2",
              },
              {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable3",
              },
            ],
            labels: ["label1", "label2"],
          },
        },
        trafficSelectorPolicies: [],
        vpnLinkConnections: [
          {
            name: "Connection-Link1",
            properties: {
              connectionBandwidth: 200,
              sharedKey: "key",
              usePolicyBasedTrafficSelectors: false,
              vpnConnectionProtocolType: "IKEv2",
              vpnLinkConnectionMode: "Default",
              vpnSiteLink: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/vpnSites/vpnSite1/vpnSiteLinks/siteLink1",
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
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}",
      subscriptionId,
      resourceGroupName,
      gatewayName,
      connectionName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

vpnConnectionPut().catch(console.error);
