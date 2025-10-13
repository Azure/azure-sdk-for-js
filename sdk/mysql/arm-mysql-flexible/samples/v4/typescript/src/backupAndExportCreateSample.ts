// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to exports the backup of the given server by creating a backup if not existing.
 *
 * @summary exports the backup of the given server by creating a backup if not existing.
 * x-ms-original-file: 2024-12-30/BackupAndExport.json
 */
async function createAndExportBackup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backupAndExport.create("TestGroup", "mysqltestserver", {
    backupSettings: { backupName: "customer-backup-name" },
    targetDetails: {
      objectType: "FullBackupStoreDetails",
      sasUriList: ["sasuri1", "sasuri2"],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createAndExportBackup();
}

main().catch(console.error);
