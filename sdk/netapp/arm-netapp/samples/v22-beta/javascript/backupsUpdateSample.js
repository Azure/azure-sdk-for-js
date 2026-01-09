// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch a Backup under the Backup Vault
 *
 * @summary patch a Backup under the Backup Vault
 * x-ms-original-file: 2025-09-01-preview/BackupsUnderBackupVault_Update.json
 */
async function backupsUnderBackupVaultUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backups.update("myRG", "account1", "backupVault1", "backup1", {
    body: {},
  });
  console.log(result);
}

async function main() {
  await backupsUnderBackupVaultUpdate();
}

main().catch(console.error);
