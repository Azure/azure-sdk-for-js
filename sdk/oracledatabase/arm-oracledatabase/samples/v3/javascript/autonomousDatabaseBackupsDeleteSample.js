// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a AutonomousDatabaseBackup
 *
 * @summary delete a AutonomousDatabaseBackup
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseBackups_Delete_MaximumSet_Gen.json
 */
async function deleteAutonomousDatabaseBackupGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.autonomousDatabaseBackups.delete("rgopenapi", "databasedb1", "1711644130");
}

/**
 * This sample demonstrates how to delete a AutonomousDatabaseBackup
 *
 * @summary delete a AutonomousDatabaseBackup
 * x-ms-original-file: 2025-09-01/autonomousDatabaseBackup_delete.json
 */
async function autonomousDatabaseBackupsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.autonomousDatabaseBackups.delete("rg000", "databasedb1", "1711644130");
}

async function main() {
  await deleteAutonomousDatabaseBackupGeneratedByMaximumSetRule();
  await autonomousDatabaseBackupsDelete();
}

main().catch(console.error);
