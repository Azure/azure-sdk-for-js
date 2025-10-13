// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to manual failover a server.
 *
 * @summary manual failover a server.
 * x-ms-original-file: 2024-12-30/ServerFailover.json
 */
async function restartAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.failover("TestGroup", "testserver");
}

async function main() {
  await restartAServer();
}

main().catch(console.error);
