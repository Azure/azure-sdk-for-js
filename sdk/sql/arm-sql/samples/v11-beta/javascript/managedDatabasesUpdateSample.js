// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates an existing database.
 *
 * @summary Updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseUpdateMax.json
 */
async function updatesAManagedDatabaseWithMaximalProperties() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const databaseName = "testdb";
  const parameters = { tags: { tagKey1: "TagValue1" } };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing database.
 *
 * @summary Updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseUpdateMin.json
 */
async function updatesAManagedDatabaseWithMinimalProperties() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const databaseName = "testdb";
  const parameters = { tags: { tagKey1: "TagValue1" } };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updatesAManagedDatabaseWithMaximalProperties();
  await updatesAManagedDatabaseWithMinimalProperties();
}

main().catch(console.error);
