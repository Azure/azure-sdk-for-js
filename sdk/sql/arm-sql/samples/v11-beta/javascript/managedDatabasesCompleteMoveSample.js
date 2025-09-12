// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Completes a managed database move operation.
 *
 * @summary Completes a managed database move operation.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseCompleteMove.json
 */
async function completesAManagedDatabaseMove() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const managedInstanceName = "testInstanceSrc";
  const databaseName = "testDatabase";
  const parameters = {
    destinationManagedDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/managedInstances/testInstanceTgt/databases/testDatabase",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginCompleteMoveAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await completesAManagedDatabaseMove();
}

main().catch(console.error);
