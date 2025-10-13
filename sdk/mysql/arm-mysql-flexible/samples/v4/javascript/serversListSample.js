// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the servers in a given subscription.
 *
 * @summary list all the servers in a given subscription.
 * x-ms-original-file: 2024-12-30/ServersList.json
 */
async function listServersInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.servers.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listServersInASubscription();
}

main().catch(console.error);
