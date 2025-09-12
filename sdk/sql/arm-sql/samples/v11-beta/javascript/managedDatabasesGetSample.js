// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a managed database.
 *
 * @summary Gets a managed database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseGet.json
 */
async function getsAManagedDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Test1";
  const managedInstanceName = "managedInstance";
  const databaseName = "managedDatabase";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.get(
    resourceGroupName,
    managedInstanceName,
    databaseName,
  );
  console.log(result);
}

async function main() {
  await getsAManagedDatabase();
}

main().catch(console.error);
