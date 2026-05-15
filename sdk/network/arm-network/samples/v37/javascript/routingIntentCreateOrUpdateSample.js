// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent.
 *
 * @summary creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent.
 * x-ms-original-file: 2025-05-01/RoutingIntentPut.json
 */
async function routeTablePut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routingIntent.createOrUpdate("rg1", "virtualHub1", "Intent1", {
    routingPolicies: [
      {
        name: "InternetTraffic",
        destinations: ["Internet"],
        nextHop:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azfw1",
      },
      {
        name: "PrivateTrafficPolicy",
        destinations: ["PrivateTraffic"],
        nextHop:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azfw1",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await routeTablePut();
}

main().catch(console.error);
