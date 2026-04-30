// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the soft deleted containers registered to Recovery Services Vault.
 *
 * @summary lists the soft deleted containers registered to Recovery Services Vault.
 * x-ms-original-file: 2026-01-01-preview/AzureStorage/SoftDeletedContainers_List.json
 */
async function listBackupProtectionContainers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedProtectionContainers.list("testRg", "testVault", {
    filter: "backupManagementType eq 'AzureWorkload'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listBackupProtectionContainers();
}

main().catch(console.error);
