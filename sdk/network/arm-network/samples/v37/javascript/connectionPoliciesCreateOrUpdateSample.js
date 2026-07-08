// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a ConnectionPolicy if it doesn't exist else updates the existing one.
 *
 * @summary creates a ConnectionPolicy if it doesn't exist else updates the existing one.
 * x-ms-original-file: 2025-07-01/ConnectionPolicyPut.json
 */
async function connectionPolicyPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.connectionPolicies.createOrUpdate("rg1", "TestHub", "testpolicy2", {
    properties: {
      routingConfiguration: {
        associatedRouteTable: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/TestHub/hubRouteTables/defaultRouteTable",
        },
        inboundRouteMap: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/TestHub/routeMaps/TestRouteMap",
        },
        outboundRouteMap: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/TestHub/routeMaps/TestRouteMap",
        },
        propagatedRouteTables: { labels: ["default"] },
      },
      enableInternetSecurity: true,
    },
  });
  console.log(result);
}

async function main() {
  await connectionPolicyPut();
}

main().catch(console.error);
