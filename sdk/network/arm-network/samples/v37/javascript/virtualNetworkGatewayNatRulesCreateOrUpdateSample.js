// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a nat rule to a scalable virtual network gateway if it doesn't exist else updates the existing nat rules.
 *
 * @summary creates a nat rule to a scalable virtual network gateway if it doesn't exist else updates the existing nat rules.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayNatRulePut.json
 */
async function virtualNetworkGatewayNatRulePut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGatewayNatRules.createOrUpdate(
    "rg1",
    "gateway1",
    "natRule1",
    {
      typePropertiesType: "Static",
      externalMappings: [{ addressSpace: "192.168.21.0/24", portRange: "300-400" }],
      internalMappings: [{ addressSpace: "10.4.0.0/24", portRange: "200-300" }],
      ipConfigurationId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/gateway1/ipConfigurations/default",
      mode: "EgressSnat",
    },
  );
  console.log(result);
}

async function main() {
  await virtualNetworkGatewayNatRulePut();
}

main().catch(console.error);
