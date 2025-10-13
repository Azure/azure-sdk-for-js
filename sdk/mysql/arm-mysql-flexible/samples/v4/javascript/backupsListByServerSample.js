// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the backups for a given server.
 *
 * @summary list all the backups for a given server.
 * x-ms-original-file: 2024-12-30/BackupsListByServer.json
 */
async function listBackupsForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backups.listByServer("TestGroup", "mysqltestserver")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listBackupsForAServer();
}

main().catch(console.error);
