// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a virtual network gateway connection in the specified resource group.
 *
 * @summary Creates or updates a virtual network gateway connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayConnectionCreate.json
 */
async function createVirtualNetworkGatewayConnectionS2S() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayConnectionName = "connS2S";
  const parameters = {
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
      gatewayIpAddress: "x.x.x.x",
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/localNetworkGateways/localgw",
      localNetworkAddressSpace: { addressPrefixes: ["10.1.0.0/16"] },
      location: "centralus",
      tags: {},
    },
    location: "centralus",
    routingWeight: 0,
    sharedKey: "Abc123",
    trafficSelectorPolicies: [],
    tunnelProperties: [
      { bgpPeeringAddress: "10.78.1.17", tunnelIpAddress: "10.78.1.5" },
      { bgpPeeringAddress: "10.78.1.20", tunnelIpAddress: "10.78.1.7" },
    ],
    usePolicyBasedTrafficSelectors: false,
    virtualNetworkGateway1: {
      active: false,
      bgpSettings: {
        asn: 65514,
        bgpPeeringAddress: "10.0.1.30",
        peerWeight: 0,
      },
      enableBgp: false,
      gatewayType: "Vpn",
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw",
      ipConfigurations: [
        {
          name: "gwipconfig1",
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/ipConfigurations/gwipconfig1",
          privateIPAllocationMethod: "Dynamic",
          publicIPAddress: {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/gwpip",
          },
          subnet: {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/GatewaySubnet",
          },
        },
      ],
      location: "centralus",
      sku: { name: "VpnGw1", tier: "VpnGw1" },
      tags: {},
      vpnType: "RouteBased",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGatewayConnections.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkGatewayConnectionName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createVirtualNetworkGatewayConnectionS2S();
}

main().catch(console.error);
