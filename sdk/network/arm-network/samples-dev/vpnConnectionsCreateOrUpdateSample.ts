// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing connection.
 *
 * @summary creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing connection.
 * x-ms-original-file: 2025-05-01/VpnConnectionPut.json
 */
async function vpnConnectionPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnConnections.createOrUpdate("rg1", "gateway1", "vpnConnection1", {
    remoteVpnSite: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/vpnSites/vpnSite1",
    },
    routingConfiguration: {
      associatedRouteTable: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable1",
      },
      inboundRouteMap: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap1",
      },
      outboundRouteMap: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap2",
      },
      propagatedRouteTables: {
        ids: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable1",
          },
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable2",
          },
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable3",
          },
        ],
        labels: ["label1", "label2"],
      },
    },
    trafficSelectorPolicies: [],
    vpnLinkConnections: [
      {
        connectionBandwidth: 200,
        sharedKey: "key",
        usePolicyBasedTrafficSelectors: false,
        vpnConnectionProtocolType: "IKEv2",
        vpnLinkConnectionMode: "Default",
        vpnSiteLink: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/vpnSites/vpnSite1/vpnSiteLinks/siteLink1",
        },
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await vpnConnectionPut();
}

main().catch(console.error);
