// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stop in-progress database migration to SQL Managed Instance.
 *
 * @summary stop in-progress database migration to SQL Managed Instance.
 * x-ms-original-file: 2025-09-01-preview/SqlMiCancelDatabaseMigration.json
 */
async function stopOngoingMigrationForTheDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  await client.databaseMigrationsSqlMi.cancel("testrg", "managedInstance1", "db1", {
    migrationOperationId: "4124fe90-d1b6-4b50-b4d9-46d02381f59a",
  });
}

async function main() {
  await stopOngoingMigrationForTheDatabase();
}

main().catch(console.error);
