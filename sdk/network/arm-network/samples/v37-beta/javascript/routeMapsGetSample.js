// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a RouteMap.
 *
 * @summary retrieves the details of a RouteMap.
 * x-ms-original-file: 2025-05-01/RouteMapGet.json
 */
async function routeMapGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeMaps.get("rg1", "virtualHub1", "routeMap1");
  console.log(result);
}

async function main() {
  await routeMapGet();
}

main().catch(console.error);
