// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates the specified Virtual Router.
 *
 * @summary Creates or updates the specified Virtual Router.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualRouterPut.json
 */
async function createVirtualRouter() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualRouterName = "virtualRouter";
  const parameters = {
    hostedGateway: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vnetGateway",
    },
    location: "West US",
    tags: { key1: "value1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualRouters.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualRouterName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createVirtualRouter();
}

main().catch(console.error);
