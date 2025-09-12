// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a restorable dropped managed database.
 *
 * @summary Gets a restorable dropped managed database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-05-01-preview/examples/GetRestorableDroppedManagedDatabase.json
 */
async function getsARestorableDroppedManagedDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Test1";
  const managedInstanceName = "managedInstance";
  const restorableDroppedDatabaseId = "testdb,131403269876900000";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.restorableDroppedManagedDatabases.get(
    resourceGroupName,
    managedInstanceName,
    restorableDroppedDatabaseId,
  );
  console.log(result);
}

async function main() {
  await getsARestorableDroppedManagedDatabase();
}

main().catch(console.error);
