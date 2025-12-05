// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all servers in a subscription.
 *
 * @summary Lists all servers in a subscription.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersListBySubscription.json
 */
async function listAllServersInASubscription() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.servers.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAllServersInASubscription();
}

main().catch(console.error);
