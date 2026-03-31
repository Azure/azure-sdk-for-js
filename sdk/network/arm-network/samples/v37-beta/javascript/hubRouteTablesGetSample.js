// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a RouteTable.
 *
 * @summary retrieves the details of a RouteTable.
 * x-ms-original-file: 2025-05-01/HubRouteTableGet.json
 */
async function routeTableGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.hubRouteTables.get("rg1", "virtualHub1", "hubRouteTable1");
  console.log(result);
}

async function main() {
  await routeTableGet();
}

main().catch(console.error);
