// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private link resource for MySQL server.
 *
 * @summary gets a private link resource for MySQL server.
 * x-ms-original-file: 2024-12-30/PrivateLinkResourcesGet.json
 */
async function getsAPrivateLinkResourceForMySQL() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get("Default", "test-svr", "plr");
  console.log(result);
}

async function main() {
  await getsAPrivateLinkResourceForMySQL();
}

main().catch(console.error);
