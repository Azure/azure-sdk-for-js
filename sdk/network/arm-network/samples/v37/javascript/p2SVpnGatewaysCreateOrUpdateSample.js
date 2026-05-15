// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a virtual wan p2s vpn gateway if it doesn't exist else updates the existing gateway.
 *
 * @summary creates a virtual wan p2s vpn gateway if it doesn't exist else updates the existing gateway.
 * x-ms-original-file: 2025-05-01/P2SVpnGatewayPut.json
 */
async function p2SVpnGatewayPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.p2SVpnGateways.createOrUpdate("rg1", "p2sVpnGateway1", {
    location: "West US",
    customDnsServers: ["1.1.1.1", "2.2.2.2"],
    isRoutingPreferenceInternet: false,
    p2SConnectionConfigurations: [
      {
        name: "P2SConnectionConfig1",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/p2sVpnGateways/p2sVpnGateway1/p2sConnectionConfigurations/P2SConnectionConfig1",
        routingConfiguration: {
          associatedRouteTable: {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
          },
          propagatedRouteTables: {
            ids: [
              {
                id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
              },
              {
                id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable2",
              },
              {
                id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable3",
              },
            ],
            labels: ["label1", "label2"],
          },
          vnetRoutes: { staticRoutes: [] },
        },
        vpnClientAddressPool: { addressPrefixes: ["101.3.0.0/16"] },
      },
    ],
    virtualHub: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1",
    },
    vpnGatewayScaleUnit: 1,
    vpnServerConfiguration: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/vpnServerConfigurations/vpnServerConfiguration1",
    },
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await p2SVpnGatewayPut();
}

main().catch(console.error);
