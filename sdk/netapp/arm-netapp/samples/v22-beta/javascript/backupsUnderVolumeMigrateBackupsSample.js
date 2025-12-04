// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to migrate the backups under volume to backup vault
 *
 * @summary migrate the backups under volume to backup vault
 * x-ms-original-file: 2025-09-01-preview/BackupsUnderVolume_Migrate.json
 */
async function backupsUnderVolumeMigrate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.backupsUnderVolume.migrateBackups("myRG", "account1", "pool1", "volume1", {
    backupVaultId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/netAppAccounts/account1/backupVaults/backupVault1",
  });
}

async function main() {
  await backupsUnderVolumeMigrate();
}

main().catch(console.error);
