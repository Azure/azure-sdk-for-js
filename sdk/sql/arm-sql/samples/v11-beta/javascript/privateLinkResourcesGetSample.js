// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private link resource for SQL server.
 *
 * @summary gets a private link resource for SQL server.
 * x-ms-original-file: 2025-02-01-preview/PrivateLinkResourcesGet.json
 */
async function getsAPrivateLinkResourceForSQL() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get("Default", "test-svr", "plr");
  console.log(result);
}

async function main() {
  await getsAPrivateLinkResourceForSQL();
}

main().catch(console.error);
