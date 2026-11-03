// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the Database Migration resource.
 *
 * @summary retrieve the Database Migration resource.
 * x-ms-original-file: 2025-09-01-preview/SqlDbGetDatabaseMigration.json
 */
async function getSqlDBDatabaseMigrationWithoutTheExpandParameter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlDb.get("testrg", "sqldbinstance", "db1");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve the Database Migration resource.
 *
 * @summary retrieve the Database Migration resource.
 * x-ms-original-file: 2025-09-01-preview/SqlDbGetDatabaseMigrationExpanded.json
 */
async function getSqlDBDatabaseMigrationWithTheExpandParameter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlDb.get("testrg", "sqldbinstance", "db1", {
    expand: "MigrationStatusDetails",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getSqlDBDatabaseMigrationWithoutTheExpandParameter();
  await getSqlDBDatabaseMigrationWithTheExpandParameter();
}

main().catch(console.error);
