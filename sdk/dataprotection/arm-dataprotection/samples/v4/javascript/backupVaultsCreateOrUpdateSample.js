// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a BackupVault resource belonging to a resource group.
 *
 * @summary creates or updates a BackupVault resource belonging to a resource group.
 * x-ms-original-file: 2025-07-01/VaultCRUD/PutBackupVault.json
 */
async function createBackupVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupVaults.createOrUpdate("SampleResourceGroup", "swaggerExample", {
    location: "WestUS",
    properties: {
      featureSettings: { crossRegionRestoreSettings: { state: "Enabled" } },
      monitoringSettings: {
        azureMonitorAlertSettings: { alertsForAllJobFailures: "Enabled" },
      },
      securitySettings: {
        softDeleteSettings: { retentionDurationInDays: 14, state: "Enabled" },
      },
      storageSettings: [{ type: "LocallyRedundant", datastoreType: "VaultStore" }],
    },
    tags: { key1: "val1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a BackupVault resource belonging to a resource group.
 *
 * @summary creates or updates a BackupVault resource belonging to a resource group.
 * x-ms-original-file: 2025-07-01/VaultCRUD/PutBackupVaultWithCMK.json
 */
async function createBackupVaultWithCMK() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupVaults.createOrUpdate("SampleResourceGroup", "swaggerExample", {
    location: "WestUS",
    properties: {
      monitoringSettings: {
        azureMonitorAlertSettings: { alertsForAllJobFailures: "Enabled" },
      },
      securitySettings: {
        encryptionSettings: {
          infrastructureEncryption: "Enabled",
          kekIdentity: {
            identityId:
              "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi",
            identityType: "UserAssigned",
          },
          keyVaultProperties: {
            keyUri: "https://cmk2xkv.vault.azure.net/keys/Key1/0767b348bb1a4c07baa6c4ec0055d2b3",
          },
          state: "Enabled",
        },
        immutabilitySettings: { state: "Disabled" },
        softDeleteSettings: { retentionDurationInDays: 0, state: "Off" },
      },
      storageSettings: [{ type: "LocallyRedundant", datastoreType: "VaultStore" }],
    },
    tags: { key1: "val1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a BackupVault resource belonging to a resource group.
 *
 * @summary creates or updates a BackupVault resource belonging to a resource group.
 * x-ms-original-file: 2025-07-01/VaultCRUD/PutBackupVaultWithMSI.json
 */
async function createBackupVaultWithMSI() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupVaults.createOrUpdate("SampleResourceGroup", "swaggerExample", {
    location: "WestUS",
    properties: {
      featureSettings: { crossRegionRestoreSettings: { state: "Enabled" } },
      monitoringSettings: {
        azureMonitorAlertSettings: { alertsForAllJobFailures: "Enabled" },
      },
      securitySettings: {
        softDeleteSettings: { retentionDurationInDays: 14, state: "Enabled" },
      },
      storageSettings: [{ type: "LocallyRedundant", datastoreType: "VaultStore" }],
    },
    tags: { key1: "val1" },
  });
  console.log(result);
}

async function main() {
  await createBackupVault();
  await createBackupVaultWithCMK();
  await createBackupVaultWithMSI();
}

main().catch(console.error);
