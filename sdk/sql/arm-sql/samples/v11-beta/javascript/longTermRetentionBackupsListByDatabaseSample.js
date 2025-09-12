// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all long term retention backups for a database.
 *
 * @summary Lists all long term retention backups for a database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/LongTermRetentionBackupListByDatabase.json
 */
async function getAllLongTermRetentionBackupsUnderTheDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const locationName = "japaneast";
  const longTermRetentionServerName = "testserver";
  const longTermRetentionDatabaseName = "testDatabase";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionBackups.listByDatabase(
    locationName,
    longTermRetentionServerName,
    longTermRetentionDatabaseName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAllLongTermRetentionBackupsUnderTheDatabase();
}

main().catch(console.error);
