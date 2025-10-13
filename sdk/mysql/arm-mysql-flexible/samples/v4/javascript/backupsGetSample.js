// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the backups for a given server.
 *
 * @summary list all the backups for a given server.
 * x-ms-original-file: 2024-12-30/BackupGet.json
 */
async function getABackupForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backups.get("TestGroup", "mysqltestserver", "daily_20210615T160516");
  console.log(result);
}

async function main() {
  await getABackupForAServer();
}

main().catch(console.error);
