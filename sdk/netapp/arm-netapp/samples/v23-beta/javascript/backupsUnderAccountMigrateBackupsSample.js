// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to migrate the backups under a NetApp account to backup vault
 *
 * @summary migrate the backups under a NetApp account to backup vault
 * x-ms-original-file: 2025-09-01-preview/BackupsUnderAccount_Migrate.json
 */
async function backupsUnderAccountMigrate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.backupsUnderAccount.migrateBackups("myRG", "account1", {
    backupVaultId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/netAppAccounts/account1/backupVaults/backupVault1",
  });
}

async function main() {
  await backupsUnderAccountMigrate();
}

main().catch(console.error);
