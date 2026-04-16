// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns backup management server registered to Recovery Services Vault.
 *
 * @summary returns backup management server registered to Recovery Services Vault.
 * x-ms-original-file: 2026-01-01-preview/Dpm/BackupEngines_Get.json
 */
async function getDpmOrAzureBackupServerOrLajollaBackupEngineDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupEngines.get("testVault", "testRG", "testServer");
  console.log(result);
}

async function main() {
  await getDpmOrAzureBackupServerOrLajollaBackupEngineDetails();
}

main().catch(console.error);
