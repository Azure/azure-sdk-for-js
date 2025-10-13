// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restarts a server.
 *
 * @summary restarts a server.
 * x-ms-original-file: 2024-12-30/ServerRestart.json
 */
async function restartAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.restart("TestGroup", "testserver", {
    maxFailoverSeconds: 60,
    restartWithFailover: "Enabled",
  });
}

async function main() {
  await restartAServer();
}

main().catch(console.error);
