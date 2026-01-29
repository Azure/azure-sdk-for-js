// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch the specified NetApp Backup Vault
 *
 * @summary patch the specified NetApp Backup Vault
 * x-ms-original-file: 2025-09-01-preview/BackupVaults_Update.json
 */
async function backupVaultsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backupVaults.update("myRG", "account1", "backupVault1", {
    tags: { Tag1: "Value1" },
  });
  console.log(result);
}

async function main() {
  await backupVaultsUpdate();
}

main().catch(console.error);
