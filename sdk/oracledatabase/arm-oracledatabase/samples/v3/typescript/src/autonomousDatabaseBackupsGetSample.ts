// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AutonomousDatabaseBackup
 *
 * @summary get a AutonomousDatabaseBackup
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseBackups_Get_MaximumSet_Gen.json
 */
async function getAutonomousDatabaseBackupGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseBackups.get(
    "rgopenapi",
    "databasedb1",
    "1711644130",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a AutonomousDatabaseBackup
 *
 * @summary get a AutonomousDatabaseBackup
 * x-ms-original-file: 2025-09-01/autonomousDatabaseBackup_get.json
 */
async function autonomousDatabaseBackupsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseBackups.get("rg000", "databasedb1", "1711644130");
  console.log(result);
}

async function main(): Promise<void> {
  await getAutonomousDatabaseBackupGeneratedByMaximumSetRule();
  await autonomousDatabaseBackupsGet();
}

main().catch(console.error);
