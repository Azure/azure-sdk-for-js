// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a managed database move operation.
 *
 * @summary starts a managed database move operation.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseStartMoveMax.json
 */
async function startsAManagedDatabaseMoveWithAllOptionalParametersSpecified() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedDatabases.startMove("group1", "testInstanceSrc", "testDatabase", {
    destinationManagedDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/managedInstances/testInstanceTgt/databases/testDatabase",
    operationMode: "Copy",
  });
}

/**
 * This sample demonstrates how to starts a managed database move operation.
 *
 * @summary starts a managed database move operation.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseStartMoveMin.json
 */
async function startsAManagedDatabaseMoveWithNoOptionalParametersSpecified() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedDatabases.startMove("group1", "testInstanceSrc", "testDatabase", {
    destinationManagedDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/managedInstances/testInstanceTgt/databases/testDatabase",
  });
}

async function main() {
  await startsAManagedDatabaseMoveWithAllOptionalParametersSpecified();
  await startsAManagedDatabaseMoveWithNoOptionalParametersSpecified();
}

main().catch(console.error);
