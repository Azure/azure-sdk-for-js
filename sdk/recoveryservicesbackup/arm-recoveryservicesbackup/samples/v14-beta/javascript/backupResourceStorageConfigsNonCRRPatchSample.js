// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates vault storage model type.
 *
 * @summary updates vault storage model type.
 * x-ms-original-file: 2026-01-01-preview/Common/BackupStorageConfig_Patch.json
 */
async function updateVaultStorageConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.backupResourceStorageConfigsNonCRR.patch(
    "PySDKBackupTestRsVault",
    "PythonSDKBackupTestRg",
    { properties: { storageType: "LocallyRedundant", storageTypeState: "Unlocked" } },
  );
}

async function main() {
  await updateVaultStorageConfiguration();
}

main().catch(console.error);
