// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing connection.
 *
 * @summary Creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing connection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VpnConnectionPut.json
 */
async function vpnConnectionPut() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "gateway1";
  const connectionName = "vpnConnection1";
  const vpnConnectionParameters = {
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
        connectionBandwidth: 200,
        sharedKey: "key",
        usePolicyBasedTrafficSelectors: false,
        vpnConnectionProtocolType: "IKEv2",
        vpnLinkConnectionMode: "Default",
        vpnSiteLink: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/vpnSites/vpnSite1/vpnSiteLinks/siteLink1",
        },
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnConnections.beginCreateOrUpdateAndWait(
    resourceGroupName,
    gatewayName,
    connectionName,
    vpnConnectionParameters,
  );
  console.log(result);
}

async function main() {
  await vpnConnectionPut();
}

main().catch(console.error);
