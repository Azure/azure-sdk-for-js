// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List managed database schemas
 *
 * @summary List managed database schemas
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedDatabaseSchemaListByDatabase.json
 */
async function listManagedDatabaseSchemas() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "myRG";
  const managedInstanceName = "myManagedInstanceName";
  const databaseName = "myDatabase";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseSchemas.listByDatabase(
    resourceGroupName,
    managedInstanceName,
    databaseName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listManagedDatabaseSchemas();
}

main().catch(console.error);
