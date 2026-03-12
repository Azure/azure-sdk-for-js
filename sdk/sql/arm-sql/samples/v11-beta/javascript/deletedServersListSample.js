// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of all deleted servers in a subscription.
 *
 * @summary Gets a list of all deleted servers in a subscription.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/DeletedServerListBySubscription.json
 */
async function listDeletedServersInASubscription() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedServers.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listDeletedServersInASubscription();
}

main().catch(console.error);
