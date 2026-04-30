// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels a managed database move operation.
 *
 * @summary cancels a managed database move operation.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseCancelMove.json
 */
async function cancelsAManagedDatabaseMove(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.managedDatabases.cancelMove("group1", "testInstanceSrc", "testDatabase", {
    destinationManagedDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/managedInstances/testInstanceTgt/databases/testDatabase",
  });
}

async function main(): Promise<void> {
  await cancelsAManagedDatabaseMove();
}

main().catch(console.error);
