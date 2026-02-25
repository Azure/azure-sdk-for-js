// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Backup Vault
 *
 * @summary get the Backup Vault
 * x-ms-original-file: 2025-09-01-preview/BackupVaults_Get.json
 */
async function backupVaultsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backupVaults.get("myRG", "account1", "backupVault1");
  console.log(result);
}

async function main() {
  await backupVaultsGet();
}

main().catch(console.error);
