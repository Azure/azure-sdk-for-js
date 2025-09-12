// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all long term retention backups for a managed database.
 *
 * @summary Lists all long term retention backups for a managed database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-05-01-preview/examples/ResourceGroupBasedManagedInstanceLongTermRetentionBackupListByDatabase.json
 */
async function getAllLongTermRetentionBackupsUnderTheDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testResourceGroup";
  const locationName = "japaneast";
  const managedInstanceName = "testInstance";
  const databaseName = "testDatabase";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionManagedInstanceBackups.listByResourceGroupDatabase(
    resourceGroupName,
    locationName,
    managedInstanceName,
    databaseName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAllLongTermRetentionBackupsUnderTheDatabase();
}

main().catch(console.error);
