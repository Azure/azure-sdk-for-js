// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a restore point.
 *
 * @summary Gets a restore point.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/DatabaseRestorePointsGet.json
 */
async function getsADatabaseRestorePoint() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testserver";
  const databaseName = "testDatabase";
  const restorePointName = "131546477590000000";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.restorePoints.get(
    resourceGroupName,
    serverName,
    databaseName,
    restorePointName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets a restore point.
 *
 * @summary Gets a restore point.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/DataWarehouseRestorePointsGet.json
 */
async function getsADatawarehouseDatabaseRestorePoint() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testserver";
  const databaseName = "testDatabase";
  const restorePointName = "131546477590000000";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.restorePoints.get(
    resourceGroupName,
    serverName,
    databaseName,
    restorePointName,
  );
  console.log(result);
}

async function main() {
  await getsADatabaseRestorePoint();
  await getsADatawarehouseDatabaseRestorePoint();
}

main().catch(console.error);
