// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of database restore points.
 *
 * @summary gets a list of database restore points.
 * x-ms-original-file: 2025-02-01-preview/DataWarehouseRestorePointsListByDatabase.json
 */
async function listDatawarehouseDatabaseRestorePoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.restorePoints.listByDatabase(
    "Default-SQL-SouthEastAsia",
    "testserver",
    "testDatabase",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of database restore points.
 *
 * @summary gets a list of database restore points.
 * x-ms-original-file: 2025-02-01-preview/DatabaseRestorePointsListByDatabase.json
 */
async function listDatabaseRestorePoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.restorePoints.listByDatabase(
    "sqlcrudtest-6730",
    "sqlcrudtest-9007",
    "3481",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDatawarehouseDatabaseRestorePoints();
  await listDatabaseRestorePoints();
}

main().catch(console.error);
