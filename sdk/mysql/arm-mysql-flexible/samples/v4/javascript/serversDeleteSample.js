// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a server.
 *
 * @summary deletes a server.
 * x-ms-original-file: 2024-12-30/ServerDelete.json
 */
async function deleteAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.delete("TestGroup", "testserver");
}

async function main() {
  await deleteAServer();
}

main().catch(console.error);
