// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a BackupVault resource belonging to a resource group. For example, updating tags for a resource.
 *
 * @summary updates a BackupVault resource belonging to a resource group. For example, updating tags for a resource.
 * x-ms-original-file: 2025-07-01/VaultCRUD/PatchBackupVault.json
 */
async function patchBackupVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupVaults.update("SampleResourceGroup", "swaggerExample", {
    properties: {
      monitoringSettings: {
        azureMonitorAlertSettings: { alertsForAllJobFailures: "Enabled" },
      },
    },
    tags: { newKey: "newVal" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a BackupVault resource belonging to a resource group. For example, updating tags for a resource.
 *
 * @summary updates a BackupVault resource belonging to a resource group. For example, updating tags for a resource.
 * x-ms-original-file: 2025-07-01/VaultCRUD/PatchBackupVaultWithCMK.json
 */
async function patchBackupVaultWithCMK() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupVaults.update("SampleResourceGroup", "swaggerExample", {
    properties: {
      monitoringSettings: {
        azureMonitorAlertSettings: { alertsForAllJobFailures: "Enabled" },
      },
      securitySettings: {
        encryptionSettings: {
          infrastructureEncryption: "Enabled",
          kekIdentity: { identityType: "SystemAssigned" },
          keyVaultProperties: {
            keyUri: "https://cmk2xkv.vault.azure.net/keys/Key1/0767b348bb1a4c07baa6c4ec0055d2b3",
          },
          state: "Enabled",
        },
        immutabilitySettings: { state: "Disabled" },
        softDeleteSettings: { retentionDurationInDays: 90, state: "On" },
      },
    },
    tags: { newKey: "newVal" },
  });
  console.log(result);
}

async function main() {
  await patchBackupVault();
  await patchBackupVaultWithCMK();
}

main().catch(console.error);
