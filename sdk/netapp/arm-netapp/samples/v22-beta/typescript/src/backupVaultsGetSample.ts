// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Backup Vault
 *
 * @summary get the Backup Vault
 * x-ms-original-file: 2025-09-01-preview/BackupVaults_Get.json
 */
async function backupVaultsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backupVaults.get("myRG", "account1", "backupVault1");
  console.log(result);
}

async function main(): Promise<void> {
  await backupVaultsGet();
}

main().catch(console.error);
