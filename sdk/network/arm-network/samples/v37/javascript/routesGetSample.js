// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified route from a route table.
 *
 * @summary gets the specified route from a route table.
 * x-ms-original-file: 2025-05-01/RouteTableRouteGet.json
 */
async function getRoute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routes.get("rg1", "testrt", "route1");
  console.log(result);
}

async function main() {
  await getRoute();
}

main().catch(console.error);
