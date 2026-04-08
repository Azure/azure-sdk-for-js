// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a managed database.
 *
 * @summary deletes a managed database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseDelete.json
 */
async function deleteManagedDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.managedDatabases.delete("Default-SQL-SouthEastAsia", "managedInstance", "testdb");
}

async function main(): Promise<void> {
  await deleteManagedDatabase();
}

main().catch(console.error);
