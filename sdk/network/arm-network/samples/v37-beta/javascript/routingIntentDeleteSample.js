// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a RoutingIntent.
 *
 * @summary deletes a RoutingIntent.
 * x-ms-original-file: 2025-05-01/RoutingIntentDelete.json
 */
async function routeTableDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.routingIntent.delete("rg1", "virtualHub1", "Intent1");
}

async function main() {
  await routeTableDelete();
}

main().catch(console.error);
