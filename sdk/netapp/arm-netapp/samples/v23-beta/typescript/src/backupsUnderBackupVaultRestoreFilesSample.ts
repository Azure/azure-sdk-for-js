// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restore the specified files from the specified backup to the active filesystem
 *
 * @summary restore the specified files from the specified backup to the active filesystem
 * x-ms-original-file: 2025-09-01-preview/BackupsUnderBackupVault_SingleFileRestore.json
 */
async function backupsSingleFileRestore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.backupsUnderBackupVault.restoreFiles("myRG", "account1", "backupVault1", "backup1", {
    destinationVolumeId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/netAppAccounts/account1/capacityPools/pool1/volumes/volume1",
    fileList: ["/dir1/customer1.db", "/dir1/customer2.db"],
  });
}

async function main(): Promise<void> {
  await backupsSingleFileRestore();
}

main().catch(console.error);
