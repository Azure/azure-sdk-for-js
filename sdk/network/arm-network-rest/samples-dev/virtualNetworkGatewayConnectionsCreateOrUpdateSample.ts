// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a virtual network gateway connection in the specified resource group.
 *
 * @summary Creates or updates a virtual network gateway connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGatewayConnectionCreate.json
 */

import type { VirtualNetworkGatewayConnectionsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createVirtualNetworkGatewayConnectionS2S(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkGatewayConnectionName = "connS2S";
  const options: VirtualNetworkGatewayConnectionsCreateOrUpdateParameters = {
    body: {
      location: "centralus",
      properties: {
        connectionMode: "Default",
        connectionProtocol: "IKEv2",
        connectionType: "IPsec",
        dpdTimeoutSeconds: 30,
        egressNatRules: [
          {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/natRules/natRule2",
          },
        ],
        enableBgp: false,
        gatewayCustomBgpIpAddresses: [
          {
            customBgpIpAddress: "169.254.21.1",
            ipConfigurationId:
              "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/ipConfigurations/default",
          },
          {
            customBgpIpAddress: "169.254.21.3",
            ipConfigurationId:
              "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/ipConfigurations/ActiveActive",
          },
        ],
        ingressNatRules: [
          {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/natRules/natRule1",
          },
        ],
        ipsecPolicies: [],
        localNetworkGateway2: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/localNetworkGateways/localgw",
          location: "centralus",
          properties: {
            gatewayIpAddress: "x.x.x.x",
            localNetworkAddressSpace: { addressPrefixes: ["10.1.0.0/16"] },
          },
          tags: {},
        },
        routingWeight: 0,
        sharedKey: "Abc123",
        trafficSelectorPolicies: [],
        usePolicyBasedTrafficSelectors: false,
        virtualNetworkGateway1: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw",
          location: "centralus",
          properties: {
            activeActive: false,
            bgpSettings: {
              asn: 65514,
              bgpPeeringAddress: "10.0.1.30",
              peerWeight: 0,
            },
            enableBgp: false,
            gatewayType: "Vpn",
            ipConfigurations: [
              {
                name: "gwipconfig1",
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/ipConfigurations/gwipconfig1",
                properties: {
                  privateIPAllocationMethod: "Dynamic",
                  publicIPAddress: {
                    id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/gwpip",
                  },
                  subnet: {
                    id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/GatewaySubnet",
                  },
                },
              },
            ],
            sku: { name: "VpnGw1", tier: "VpnGw1" },
            vpnType: "RouteBased",
          },
          tags: {},
        },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualNetworkGatewayConnectionS2S().catch(console.error);
