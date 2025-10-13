// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create backup for a given server with specified backup name.
 *
 * @summary create backup for a given server with specified backup name.
 * x-ms-original-file: 2024-12-30/BackupPut.json
 */
async function createBackupForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backups.put("TestGroup", "mysqltestserver", "mybackup");
  console.log(result);
}

async function main() {
  await createBackupForAServer();
}

main().catch(console.error);
