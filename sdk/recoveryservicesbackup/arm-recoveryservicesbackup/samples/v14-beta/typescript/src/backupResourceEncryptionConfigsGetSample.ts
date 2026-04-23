// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches Vault Encryption config.
 *
 * @summary fetches Vault Encryption config.
 * x-ms-original-file: 2026-01-01-preview/BackupResourceEncryptionConfig_Get.json
 */
async function getVaultEncryptionConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupResourceEncryptionConfigs.get("rishTestVault", "rishgrp");
  console.log(result);
}

async function main(): Promise<void> {
  await getVaultEncryptionConfiguration();
}

main().catch(console.error);
