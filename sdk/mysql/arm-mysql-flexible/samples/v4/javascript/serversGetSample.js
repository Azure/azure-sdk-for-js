// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a server.
 *
 * @summary gets information about a server.
 * x-ms-original-file: 2024-12-30/ServerGet.json
 */
async function getAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.get("testrg", "mysqltestserver");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a server.
 *
 * @summary gets information about a server.
 * x-ms-original-file: 2024-12-30/ServerGetWithVnet.json
 */
async function getAServerWithVnet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.get("testrg", "mysqltestserver");
  console.log(result);
}

async function main() {
  await getAServer();
  await getAServerWithVnet();
}

main().catch(console.error);
