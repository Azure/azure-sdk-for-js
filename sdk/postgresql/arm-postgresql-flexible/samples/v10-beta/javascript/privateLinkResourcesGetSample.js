// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private link resource for PostgreSQL server.
 *
 * @summary gets a private link resource for PostgreSQL server.
 * x-ms-original-file: 2026-01-01-preview/PrivateLinkResourcesGet.json
 */
async function getsAPrivateLinkResourceForPostgreSQL() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "exampleresourcegroup",
    "exampleserver",
    "exampleprivatelink",
  );
  console.log(result);
}

async function main() {
  await getsAPrivateLinkResourceForPostgreSQL();
}

main().catch(console.error);
