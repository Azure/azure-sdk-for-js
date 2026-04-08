// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to completes a managed database move operation.
 *
 * @summary completes a managed database move operation.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseCompleteMove.json
 */
async function completesAManagedDatabaseMove() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.managedDatabases.completeMove("group1", "testInstanceSrc", "testDatabase", {
    destinationManagedDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/managedInstances/testInstanceTgt/databases/testDatabase",
  });
}

async function main() {
  await completesAManagedDatabaseMove();
}

main().catch(console.error);
