// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a nat rule to a scalable virtual network gateway if it doesn't exist else updates the existing nat rules.
 *
 * @summary Creates a nat rule to a scalable virtual network gateway if it doesn't exist else updates the existing nat rules.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayNatRulePut.json
 */
async function virtualNetworkGatewayNatRulePut() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "gateway1";
  const natRuleName = "natRule1";
  const natRuleParameters = {
    typePropertiesType: "Static",
    externalMappings: [{ addressSpace: "192.168.21.0/24", portRange: "300-400" }],
    internalMappings: [{ addressSpace: "10.4.0.0/24", portRange: "200-300" }],
    ipConfigurationId:
      "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/gateway1/ipConfigurations/default",
    mode: "EgressSnat",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGatewayNatRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkGatewayName,
    natRuleName,
    natRuleParameters,
  );
  console.log(result);
}

async function main() {
  await virtualNetworkGatewayNatRulePut();
}

main().catch(console.error);
