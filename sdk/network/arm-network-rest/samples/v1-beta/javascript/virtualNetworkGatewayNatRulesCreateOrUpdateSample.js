// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { getLongRunningPoller } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Creates a nat rule to a scalable virtual network gateway if it doesn't exist else updates the existing nat rules.
 *
 * @summary Creates a nat rule to a scalable virtual network gateway if it doesn't exist else updates the existing nat rules.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGatewayNatRulePut.json
 */
async function virtualNetworkGatewayNatRulePut() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkGatewayName = "gateway1";
  const natRuleName = "natRule1";
  const options = {
    body: {
      properties: {
        type: "Static",
        externalMappings: [{ addressSpace: "192.168.21.0/24", portRange: "300-400" }],
        internalMappings: [{ addressSpace: "10.4.0.0/24", portRange: "200-300" }],
        ipConfigurationId:
          "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/gateway1/ipConfigurations/default",
        mode: "EgressSnat",
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/natRules/{natRuleName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkGatewayName,
      natRuleName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualNetworkGatewayNatRulePut().catch(console.error);
