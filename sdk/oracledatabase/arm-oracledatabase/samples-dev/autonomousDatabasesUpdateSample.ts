// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a AutonomousDatabase
 *
 * @summary update a AutonomousDatabase
 * x-ms-original-file: 2025-03-01/autonomousDatabase_patch.json
 */
async function autonomousDatabasesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.update("rg000", "databasedb1", {});
  console.log(result);
}

async function main(): Promise<void> {
  await autonomousDatabasesUpdate();
}

main().catch(console.error);
