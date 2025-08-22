// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a BackupVault resource belonging to a resource group. For example, updating tags for a resource.
 *
 * @summary Updates a BackupVault resource belonging to a resource group. For example, updating tags for a resource.
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/VaultCRUD/PatchBackupVault.json
 */

import type { PatchResourceRequestInput } from "@azure/arm-dataprotection";
import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchBackupVault(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "SampleResourceGroup";
  const vaultName = "swaggerExample";
  const parameters: PatchResourceRequestInput = {
    properties: {
      monitoringSettings: {
        azureMonitorAlertSettings: { alertsForAllJobFailures: "Enabled" },
      },
    },
    tags: { newKey: "newVal" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupVaults.beginUpdateAndWait(
    resourceGroupName,
    vaultName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates a BackupVault resource belonging to a resource group. For example, updating tags for a resource.
 *
 * @summary Updates a BackupVault resource belonging to a resource group. For example, updating tags for a resource.
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/VaultCRUD/PatchBackupVaultWithCMK.json
 */
async function patchBackupVaultWithCmk(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "SampleResourceGroup";
  const vaultName = "swaggerExample";
  const parameters: PatchResourceRequestInput = {
    properties: {
      monitoringSettings: {
        azureMonitorAlertSettings: { alertsForAllJobFailures: "Enabled" },
      },
      securitySettings: {
        encryptionSettings: {
          infrastructureEncryption: "Enabled",
          kekIdentity: { identityType: "SystemAssigned" },
          keyVaultProperties: {
            keyUri:
              "https://cmk2xkv.vault.azure.net/keys/Key1/0767b348bb1a4c07baa6c4ec0055d2b3",
          },
          state: "Enabled",
        },
        immutabilitySettings: { state: "Disabled" },
        softDeleteSettings: { retentionDurationInDays: 90, state: "On" },
      },
    },
    tags: { newKey: "newVal" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupVaults.beginUpdateAndWait(
    resourceGroupName,
    vaultName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchBackupVault();
  await patchBackupVaultWithCmk();
}

main().catch(console.error);
