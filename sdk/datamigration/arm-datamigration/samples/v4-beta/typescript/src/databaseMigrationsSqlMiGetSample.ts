// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the specified database migration for a given SQL Managed Instance.
 *
 * @summary retrieve the specified database migration for a given SQL Managed Instance.
 * x-ms-original-file: 2025-09-01-preview/SqlMiGetDatabaseMigration.json
 */
async function getSqlMIDatabaseMigrationWithoutTheExpandParameter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlMi.get("testrg", "managedInstance1", "db1");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve the specified database migration for a given SQL Managed Instance.
 *
 * @summary retrieve the specified database migration for a given SQL Managed Instance.
 * x-ms-original-file: 2025-09-01-preview/SqlMiGetDatabaseMigrationExpanded.json
 */
async function getSqlMIDatabaseMigrationWithTheExpandParameter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlMi.get("testrg", "managedInstance1", "db1", {
    expand: "MigrationStatusDetails",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getSqlMIDatabaseMigrationWithoutTheExpandParameter();
  await getSqlMIDatabaseMigrationWithTheExpandParameter();
}

main().catch(console.error);
