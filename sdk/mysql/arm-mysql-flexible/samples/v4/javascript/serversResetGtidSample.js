// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resets GTID on a server.
 *
 * @summary resets GTID on a server.
 * x-ms-original-file: 2024-12-30/ServerResetGtid.json
 */
async function resetGtidOnAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.resetGtid("TestGroup", "testserver", {
    gtidSet: "4aff5b51-97ba-11ed-a955-002248036acc:1-16",
  });
}

async function main() {
  await resetGtidOnAServer();
}

main().catch(console.error);
