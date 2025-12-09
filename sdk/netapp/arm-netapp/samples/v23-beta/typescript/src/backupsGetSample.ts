// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified Backup under Backup Vault.
 *
 * @summary get the specified Backup under Backup Vault.
 * x-ms-original-file: 2025-09-01-preview/BackupsUnderBackupVault_Get.json
 */
async function backupsUnderBackupVaultGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backups.get("myRG", "account1", "backupVault1", "backup1");
  console.log(result);
}

async function main(): Promise<void> {
  await backupsUnderBackupVaultGet();
}

main().catch(console.error);
