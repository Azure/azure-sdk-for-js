// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a virtual wan vpn gateway if it doesn't exist else updates the existing gateway.
 *
 * @summary creates a virtual wan vpn gateway if it doesn't exist else updates the existing gateway.
 * x-ms-original-file: 2025-05-01/VpnGatewayPut.json
 */
async function vpnGatewayPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnGateways.createOrUpdate("rg1", "gateway1", {
    location: "westcentralus",
    bgpSettings: {
      asn: 65515,
      bgpPeeringAddresses: [
        { customBgpIpAddresses: ["169.254.21.5"], ipconfigurationId: "Instance0" },
        { customBgpIpAddresses: ["169.254.21.10"], ipconfigurationId: "Instance1" },
      ],
      peerWeight: 0,
    },
    connections: [
      {
        name: "vpnConnection1",
        remoteVpnSite: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/vpnSites/vpnSite1",
        },
        vpnLinkConnections: [
          {
            connectionBandwidth: 200,
            egressNatRules: [
              {
                id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/vpnGateways/gateway1/natRules/nat03",
              },
            ],
            sharedKey: "key",
            vpnConnectionProtocolType: "IKEv2",
            vpnSiteLink: {
              id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/vpnSites/vpnSite1/vpnSiteLinks/siteLink1",
            },
          },
        ],
      },
    ],
    enableBgpRouteTranslationForNat: false,
    isRoutingPreferenceInternet: false,
    natRules: [
      {
        typePropertiesType: "Static",
        externalMappings: [{ addressSpace: "192.168.0.0/26" }],
        internalMappings: [{ addressSpace: "0.0.0.0/26" }],
        ipConfigurationId: "",
        mode: "EgressSnat",
      },
    ],
    virtualHub: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1",
    },
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await vpnGatewayPut();
}

main().catch(console.error);
