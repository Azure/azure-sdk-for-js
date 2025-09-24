// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List managed database columns
 *
 * @summary List managed database columns
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedColumnsListByDatabaseMax.json
 */
async function filterManagedDatabaseColumns() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "myRG";
  const managedInstanceName = "serverName";
  const databaseName = "myDatabase";
  const schema = ["dbo"];
  const table = ["customer", "address"];
  const column = ["username"];
  const orderBy = ["schema asc", "table", "column desc"];
  const options = {
    schema,
    table,
    column,
    orderBy,
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseColumns.listByDatabase(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List managed database columns
 *
 * @summary List managed database columns
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedColumnsListByDatabaseMin.json
 */
async function listManagedDatabaseColumns() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "myRG";
  const managedInstanceName = "serverName";
  const databaseName = "myDatabase";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseColumns.listByDatabase(
    resourceGroupName,
    managedInstanceName,
    databaseName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await filterManagedDatabaseColumns();
  await listManagedDatabaseColumns();
}

main().catch(console.error);
