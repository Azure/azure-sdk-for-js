// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a virtual network gateway connection in the specified resource group.
 *
 * @summary creates or updates a virtual network gateway connection in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayConnectionCreate.json
 */
async function createVirtualNetworkGatewayConnectionS2S(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGatewayConnections.createOrUpdate("rg1", "connS2S", {
    location: "centralus",
    authenticationType: "Certificate",
    certificateAuthentication: {
      inboundAuthCertificateChain: [
        "MIIC+TCCAeGgAwIBAgIQFOJUqDaxV5xJcKpTKO...",
        "MIIC+TCCAeGgAwIBAgIQPJerInitNblK7yBgkqh...",
      ],
      inboundAuthCertificateSubjectName: "CN=rootCert.com",
      outboundAuthCertificate:
        "https://customerKv.vault.azure.net/Certificates/outBoundcert/Version",
    },
    connectionMode: "Default",
    connectionProtocol: "IKEv2",
    connectionType: "IPsec",
    dpdTimeoutSeconds: 30,
    egressNatRules: [
      {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/natRules/natRule2",
      },
    ],
    enableBgp: false,
    gatewayCustomBgpIpAddresses: [
      {
        customBgpIpAddress: "169.254.21.1",
        ipConfigurationId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/ipConfigurations/default",
      },
      {
        customBgpIpAddress: "169.254.21.3",
        ipConfigurationId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/ipConfigurations/ActiveActive",
      },
    ],
    ingressNatRules: [
      {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/natRules/natRule1",
      },
    ],
    ipsecPolicies: [],
    localNetworkGateway2: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/localNetworkGateways/localgw",
      location: "centralus",
      gatewayIpAddress: "x.x.x.x",
      localNetworkAddressSpace: { addressPrefixes: ["10.1.0.0/16"] },
      tags: {},
    },
    routingWeight: 0,
    sharedKey: "Abc123",
    trafficSelectorPolicies: [],
    tunnelProperties: [
      { bgpPeeringAddress: "10.78.1.17", tunnelIpAddress: "10.78.1.5" },
      { bgpPeeringAddress: "10.78.1.20", tunnelIpAddress: "10.78.1.7" },
    ],
    usePolicyBasedTrafficSelectors: false,
    virtualNetworkGateway1: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw",
      location: "centralus",
      active: false,
      bgpSettings: { asn: 65514, bgpPeeringAddress: "10.0.1.30", peerWeight: 0 },
      enableBgp: false,
      gatewayType: "Vpn",
      ipConfigurations: [
        {
          name: "gwipconfig1",
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/ipConfigurations/gwipconfig1",
          privateIPAllocationMethod: "Dynamic",
          publicIPAddress: {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/gwpip",
          },
          subnet: {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/GatewaySubnet",
          },
        },
      ],
      sku: { name: "VpnGw1", tier: "VpnGw1" },
      vpnType: "RouteBased",
      tags: {},
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createVirtualNetworkGatewayConnectionS2S();
}

main().catch(console.error);
