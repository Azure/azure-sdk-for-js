// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of all RouteMaps.
 *
 * @summary retrieves the details of all RouteMaps.
 * x-ms-original-file: 2025-05-01/RouteMapList.json
 */
async function routeMapList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.routeMaps.list("rg1", "virtualHub1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await routeMapList();
}

main().catch(console.error);
