// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stop in-progress database migration to SQL VM.
 *
 * @summary stop in-progress database migration to SQL VM.
 * x-ms-original-file: 2025-09-01-preview/SqlVmCancelDatabaseMigration.json
 */
async function stopOngoingMigrationForTheDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  await client.databaseMigrationsSqlVm.cancel("testrg", "testvm", "db1", {
    migrationOperationId: "4124fe90-d1b6-4b50-b4d9-46d02381f59a",
  });
}

async function main(): Promise<void> {
  await stopOngoingMigrationForTheDatabase();
}

main().catch(console.error);
