// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the details of a RouteMap.
 *
 * @summary Retrieves the details of a RouteMap.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/RouteMapGet.json
 */
async function routeMapGet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub1";
  const routeMapName = "routeMap1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeMaps.get(resourceGroupName, virtualHubName, routeMapName);
  console.log(result);
}

async function main() {
  await routeMapGet();
}

main().catch(console.error);
