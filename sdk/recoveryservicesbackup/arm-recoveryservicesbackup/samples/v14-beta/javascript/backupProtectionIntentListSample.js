// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides a pageable list of all intents that are present within a vault.
 *
 * @summary provides a pageable list of all intents that are present within a vault.
 * x-ms-original-file: 2026-01-01-preview/AzureWorkload/BackupProtectionIntent_List.json
 */
async function listProtectionIntentWithBackupManagementTypeFilter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupProtectionIntent.list("myVault", "myRG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listProtectionIntentWithBackupManagementTypeFilter();
}

main().catch(console.error);
