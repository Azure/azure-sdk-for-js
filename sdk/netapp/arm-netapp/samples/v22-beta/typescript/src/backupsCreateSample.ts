// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a backup under the Backup Vault
 *
 * @summary create a backup under the Backup Vault
 * x-ms-original-file: 2025-09-01-preview/BackupsUnderBackupVault_Create.json
 */
async function backupsUnderBackupVaultCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backups.create("myRG", "account1", "backupVault1", "backup1", {
    properties: {
      label: "myLabel",
      volumeResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/netAppAccounts/account1/capacityPool/pool1/volumes/volume1",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await backupsUnderBackupVaultCreate();
}

main().catch(console.error);
