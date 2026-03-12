// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a BackupVault resource from the resource group.
 *
 * @summary deletes a BackupVault resource from the resource group.
 * x-ms-original-file: 2025-07-01/VaultCRUD/DeleteBackupVault.json
 */
async function deleteBackupVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.backupVaults.delete("SampleResourceGroup", "swaggerExample");
}

async function main() {
  await deleteBackupVault();
}

main().catch(console.error);
