// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AutonomousDatabaseBackup
 *
 * @summary create a AutonomousDatabaseBackup
 * x-ms-original-file: 2025-11-01-preview/AutonomousDatabaseBackups_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createAutonomousDatabaseBackupGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseBackups.createOrUpdate(
    "rgopenapi",
    "databasedb1",
    "1711644130",
    { properties: { displayName: "Nightly Backup", retentionPeriodInDays: 365 } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a AutonomousDatabaseBackup
 *
 * @summary create a AutonomousDatabaseBackup
 * x-ms-original-file: 2025-11-01-preview/autonomousDatabaseBackup_create.json
 */
async function autonomousDatabaseBackupsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseBackups.createOrUpdate(
    "rg000",
    "databasedb1",
    "1711644130",
    { properties: { displayName: "Nightly Backup", retentionPeriodInDays: 365 } },
  );
  console.log(result);
}

async function main() {
  await createAutonomousDatabaseBackupGeneratedByMaximumSetRule();
  await autonomousDatabaseBackupsCreateOrUpdate();
}

main().catch(console.error);
