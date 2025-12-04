// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified Backup Vault
 *
 * @summary delete the specified Backup Vault
 * x-ms-original-file: 2025-09-01-preview/BackupVaults_Delete.json
 */
async function backupVaultsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.backupVaults.delete("resourceGroup", "account1", "backupVault1");
}

async function main(): Promise<void> {
  await backupVaultsDelete();
}

main().catch(console.error);
