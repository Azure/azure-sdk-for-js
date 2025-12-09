// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all backups Under a Backup Vault
 *
 * @summary list all backups Under a Backup Vault
 * x-ms-original-file: 2025-09-01-preview/Backups_ListByVault.json
 */
async function backupsListByVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backups.listByVault("myRG", "account1", "backupVault1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await backupsListByVault();
}

main().catch(console.error);
