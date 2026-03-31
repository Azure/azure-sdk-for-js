// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all route tables in a subscription.
 *
 * @summary gets all route tables in a subscription.
 * x-ms-original-file: 2025-05-01/RouteTableListAll.json
 */
async function listAllRouteTables() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.routeTables.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllRouteTables();
}

main().catch(console.error);
