// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete backup for a given server with specified backup name
 *
 * @summary delete backup for a given server with specified backup name
 * x-ms-original-file: 2025-06-01-preview/LongRunningBackupDelete.json
 */
async function deleteBackupForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.longRunningBackup.delete("TestGroup", "mysqltestserver", "testback");
}

async function main() {
  await deleteBackupForAServer();
}

main().catch(console.error);
