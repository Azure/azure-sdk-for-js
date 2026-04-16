// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a AutonomousDatabaseBackup
 *
 * @summary update a AutonomousDatabaseBackup
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseBackups_Update_MaximumSet_Gen.json
 */
async function patchAutonomousDatabaseBackupGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseBackups.update(
    "rgopenapi",
    "databasedb1",
    "1711644130",
    { properties: { retentionPeriodInDays: 90 } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a AutonomousDatabaseBackup
 *
 * @summary update a AutonomousDatabaseBackup
 * x-ms-original-file: 2025-09-01/autonomousDatabaseBackup_patch.json
 */
async function autonomousDatabaseBackupsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseBackups.update(
    "rg000",
    "databasedb1",
    "1711644130",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchAutonomousDatabaseBackupGeneratedByMaximumSetRule();
  await autonomousDatabaseBackupsUpdate();
}

main().catch(console.error);
