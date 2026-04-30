// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to used to remove intent from an item
 *
 * @summary used to remove intent from an item
 * x-ms-original-file: 2026-01-01-preview/AzureWorkload/BackupProtectionIntent_Delete.json
 */
async function deleteProtectionIntentFromItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.protectionIntent.delete(
    "myVault",
    "myRG",
    "Azure",
    "249D9B07-D2EF-4202-AA64-65F35418564E",
  );
}

async function main() {
  await deleteProtectionIntentFromItem();
}

main().catch(console.error);
