// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates Vault encryption config.
 *
 * @summary updates Vault encryption config.
 * x-ms-original-file: 2026-01-01-preview/BackupResourceEncryptionConfig_Put.json
 */
async function updateVaultEncryptionConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.backupResourceEncryptionConfigs.update("source-rsv", "test-rg", {
    properties: {
      encryptionAtRestType: "CustomerManaged",
      infrastructureEncryptionState: "true",
      keyUri: "https://gktestkv1.vault.azure.net/keys/Test1/ed2e8cdc7f86477ebf0c6462b504a9ed",
      subscriptionId: "1a2311d9-66f5-47d3-a9fb-7a37da63934b",
    },
  });
}

async function main(): Promise<void> {
  await updateVaultEncryptionConfiguration();
}

main().catch(console.error);
