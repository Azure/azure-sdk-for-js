// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the specified Virtual Router.
 *
 * @summary creates or updates the specified Virtual Router.
 * x-ms-original-file: 2025-05-01/VirtualRouterPut.json
 */
async function createVirtualRouter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualRouters.createOrUpdate("rg1", "virtualRouter", {
    location: "West US",
    hostedGateway: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vnetGateway",
    },
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await createVirtualRouter();
}

main().catch(console.error);
