// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to initiate cutover for in-progress online database migration to SQL VM.
 *
 * @summary initiate cutover for in-progress online database migration to SQL VM.
 * x-ms-original-file: 2025-09-01-preview/SqlVmCutoverDatabaseMigration.json
 */
async function cutoverOnlineMigrationOperationForTheDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  await client.databaseMigrationsSqlVm.cutover("testrg", "testvm", "db1", {
    migrationOperationId: "4124fe90-d1b6-4b50-b4d9-46d02381f59a",
  });
}

async function main() {
  await cutoverOnlineMigrationOperationForTheDatabase();
}

main().catch(console.error);
