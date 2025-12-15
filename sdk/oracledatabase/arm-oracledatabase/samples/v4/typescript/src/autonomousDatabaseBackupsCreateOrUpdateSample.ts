// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a AutonomousDatabaseBackup
 *
 * @summary create a AutonomousDatabaseBackup
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseBackups_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createAutonomousDatabaseBackupGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseBackups.createOrUpdate(
    "rgopenapi",
    "databasedb1",
    "1711644130",
    {
      properties: {
        autonomousDatabaseOcid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
        displayName: "Nightly Backup",
        retentionPeriodInDays: 365,
        ocid: "ocid1.autonomousdatabasebackup.oc1..aaaaaaaavwpj",
        lifecycleState: "Active",
        backupType: "Full",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a AutonomousDatabaseBackup
 *
 * @summary create a AutonomousDatabaseBackup
 * x-ms-original-file: 2025-09-01/autonomousDatabaseBackup_create.json
 */
async function autonomousDatabaseBackupsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseBackups.createOrUpdate(
    "rg000",
    "databasedb1",
    "1711644130",
    {
      properties: {
        autonomousDatabaseOcid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
        displayName: "Nightly Backup",
        retentionPeriodInDays: 365,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAutonomousDatabaseBackupGeneratedByMaximumSetRule();
  await autonomousDatabaseBackupsCreateOrUpdate();
}

main().catch(console.error);
