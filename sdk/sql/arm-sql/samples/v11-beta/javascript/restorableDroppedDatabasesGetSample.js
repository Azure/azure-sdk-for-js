// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a restorable dropped database.
 *
 * @summary Gets a restorable dropped database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/GetRestorableDroppedDatabaseWithExpandEqualsKeys.json
 */
async function getsARestorableDroppedDatabaseWithExpandEqualsKeys() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const restorableDroppedDatabaseId = "testdb,131403269876900000";
  const expand = "keys";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.restorableDroppedDatabases.get(
    resourceGroupName,
    serverName,
    restorableDroppedDatabaseId,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets a restorable dropped database.
 *
 * @summary Gets a restorable dropped database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/GetRestorableDroppedDatabase.json
 */
async function getsARestorableDroppedDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const restorableDroppedDatabaseId = "testdb,131403269876900000";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.restorableDroppedDatabases.get(
    resourceGroupName,
    serverName,
    restorableDroppedDatabaseId,
  );
  console.log(result);
}

async function main() {
  await getsARestorableDroppedDatabaseWithExpandEqualsKeys();
  await getsARestorableDroppedDatabase();
}

main().catch(console.error);
