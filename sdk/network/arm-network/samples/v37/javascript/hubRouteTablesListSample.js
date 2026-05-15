// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of all RouteTables.
 *
 * @summary retrieves the details of all RouteTables.
 * x-ms-original-file: 2025-05-01/HubRouteTableList.json
 */
async function routeTableList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hubRouteTables.list("rg1", "virtualHub1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await routeTableList();
}

main().catch(console.error);
