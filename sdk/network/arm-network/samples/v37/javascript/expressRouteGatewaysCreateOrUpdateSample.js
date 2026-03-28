// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a ExpressRoute gateway in a specified resource group.
 *
 * @summary creates or updates a ExpressRoute gateway in a specified resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteGatewayCreate.json
 */
async function expressRouteGatewayCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.createOrUpdate(
    "resourceGroupName",
    "gateway-2",
    {
      location: "westus",
      allowNonVirtualWanTraffic: false,
      autoScaleConfiguration: { bounds: { min: 3 } },
      virtualHub: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroupId/providers/Microsoft.Network/virtualHubs/virtualHubName",
      },
    },
  );
  console.log(result);
}

async function main() {
  await expressRouteGatewayCreate();
}

main().catch(console.error);
