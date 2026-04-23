// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates vault storage model type.
 *
 * @summary updates vault storage model type.
 * x-ms-original-file: 2026-01-01-preview/Common/BackupStorageConfig_Put.json
 */
async function updateVaultStorageConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupResourceStorageConfigsNonCRR.update(
    "PySDKBackupTestRsVault",
    "PythonSDKBackupTestRg",
    { properties: { storageType: "LocallyRedundant", storageTypeState: "Unlocked" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateVaultStorageConfiguration();
}

main().catch(console.error);
