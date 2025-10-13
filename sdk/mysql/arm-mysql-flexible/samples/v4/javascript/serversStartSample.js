// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a server.
 *
 * @summary starts a server.
 * x-ms-original-file: 2024-12-30/ServerStart.json
 */
async function startAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.start("TestGroup", "testserver");
}

async function main() {
  await startAServer();
}

main().catch(console.error);
