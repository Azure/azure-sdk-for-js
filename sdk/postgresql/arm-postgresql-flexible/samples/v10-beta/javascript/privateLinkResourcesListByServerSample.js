// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources for PostgreSQL server.
 *
 * @summary gets the private link resources for PostgreSQL server.
 * x-ms-original-file: 2026-01-01-preview/PrivateLinkResourcesList.json
 */
async function getsPrivateLinkResourcesForPostgreSQL() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByServer(
    "exampleresourcegroup",
    "exampleserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsPrivateLinkResourcesForPostgreSQL();
}

main().catch(console.error);
