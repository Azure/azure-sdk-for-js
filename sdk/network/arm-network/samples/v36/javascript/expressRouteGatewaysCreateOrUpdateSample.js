// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a ExpressRoute gateway in a specified resource group.
 *
 * @summary Creates or updates a ExpressRoute gateway in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteGatewayCreate.json
 */
async function expressRouteGatewayCreate() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "resourceGroupName";
  const expressRouteGatewayName = "gateway-2";
  const putExpressRouteGatewayParameters = {
    allowNonVirtualWanTraffic: false,
    autoScaleConfiguration: { bounds: { min: 3 } },
    location: "westus",
    virtualHub: {
      id: "/subscriptions/subid/resourceGroups/resourceGroupId/providers/Microsoft.Network/virtualHubs/virtualHubName",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.beginCreateOrUpdateAndWait(
    resourceGroupName,
    expressRouteGatewayName,
    putExpressRouteGatewayParameters,
  );
  console.log(result);
}

async function main() {
  await expressRouteGatewayCreate();
}

main().catch(console.error);
