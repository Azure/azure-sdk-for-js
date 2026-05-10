// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all long term retention backups for a managed database.
 *
 * @summary lists all long term retention backups for a managed database.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceLongTermRetentionBackupListByDatabase.json
 */
async function getAllLongTermRetentionBackupsUnderTheDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionManagedInstanceBackups.listByDatabase(
    "japaneast",
    "testInstance",
    "testDatabase",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllLongTermRetentionBackupsUnderTheDatabase();
}

main().catch(console.error);
