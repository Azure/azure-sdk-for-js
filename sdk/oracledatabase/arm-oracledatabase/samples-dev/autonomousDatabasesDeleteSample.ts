// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AutonomousDatabase
 *
 * @summary delete a AutonomousDatabase
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_Delete_MaximumSet_Gen.json
 */
async function deleteAutonomousDatabaseGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.autonomousDatabases.delete("rgopenapi", "databasedb1");
}

/**
 * This sample demonstrates how to delete a AutonomousDatabase
 *
 * @summary delete a AutonomousDatabase
 * x-ms-original-file: 2025-09-01/autonomousDatabase_delete.json
 */
async function autonomousDatabasesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.autonomousDatabases.delete("rg000", "databasedb1");
}

async function main(): Promise<void> {
  await deleteAutonomousDatabaseGeneratedByMaximumSetRule();
  await autonomousDatabasesDelete();
}

main().catch(console.error);
