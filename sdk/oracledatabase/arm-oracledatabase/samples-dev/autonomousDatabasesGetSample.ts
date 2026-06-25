// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AutonomousDatabase
 *
 * @summary get a AutonomousDatabase
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_Get_MaximumSet_Gen.json
 */
async function getAutonomousDatabaseGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.get("rgopenapi", "database1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a AutonomousDatabase
 *
 * @summary get a AutonomousDatabase
 * x-ms-original-file: 2025-09-01/autonomousDatabase_get.json
 */
async function autonomousDatabasesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.get("rg000", "databasedb1");
  console.log(result);
}

async function main(): Promise<void> {
  await getAutonomousDatabaseGeneratedByMaximumSetRule();
  await autonomousDatabasesGet();
}

main().catch(console.error);
