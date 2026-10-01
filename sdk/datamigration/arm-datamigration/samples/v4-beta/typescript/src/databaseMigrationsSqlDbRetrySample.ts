// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retry on going migration for the database.
 *
 * @summary retry on going migration for the database.
 * x-ms-original-file: 2025-09-01-preview/SqlDbRetryDatabaseMigration.json
 */
async function retryDatabaseMigrationResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlDb.retry("testrg", "sqldbinstance", "db1", {
    migrationOperationId: "9a90bb84-e70f-46f7-b0ae-1aef5b3b9f07",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await retryDatabaseMigrationResource();
}

main().catch(console.error);
