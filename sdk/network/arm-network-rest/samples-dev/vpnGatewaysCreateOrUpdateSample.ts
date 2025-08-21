// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a virtual wan vpn gateway if it doesn't exist else updates the existing gateway.
 *
 * @summary Creates a virtual wan vpn gateway if it doesn't exist else updates the existing gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VpnGatewayPut.json
 */

import type { VpnGatewaysCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function vpnGatewayPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const gatewayName = "gateway1";
  const options: VpnGatewaysCreateOrUpdateParameters = {
    body: {
      location: "westcentralus",
      properties: {
        bgpSettings: {
          asn: 65515,
          bgpPeeringAddresses: [
            {
              customBgpIpAddresses: ["169.254.21.5"],
              ipconfigurationId: "Instance0",
            },
            {
              customBgpIpAddresses: ["169.254.21.10"],
              ipconfigurationId: "Instance1",
            },
          ],
          peerWeight: 0,
        },
        connections: [
          {
            name: "vpnConnection1",
            properties: {
              remoteVpnSite: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/vpnSites/vpnSite1",
              },
              vpnLinkConnections: [
                {
                  name: "Connection-Link1",
                  properties: {
                    connectionBandwidth: 200,
                    egressNatRules: [
                      {
                        id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/vpnGateways/gateway1/natRules/nat03",
                      },
                    ],
                    sharedKey: "key",
                    vpnConnectionProtocolType: "IKEv2",
                    vpnSiteLink: {
                      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/vpnSites/vpnSite1/vpnSiteLinks/siteLink1",
                    },
                  },
                },
              ],
            },
          },
        ],
        enableBgpRouteTranslationForNat: false,
        isRoutingPreferenceInternet: false,
        natRules: [
          {
            name: "nat03",
            properties: {
              type: "Static",
              externalMappings: [{ addressSpace: "192.168.0.0/26" }],
              internalMappings: [{ addressSpace: "0.0.0.0/26" }],
              ipConfigurationId: "",
              mode: "EgressSnat",
            },
          },
        ],
        virtualHub: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1",
        },
      },
      tags: { key1: "value1" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}",
      subscriptionId,
      resourceGroupName,
      gatewayName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

vpnGatewayPut().catch(console.error);
