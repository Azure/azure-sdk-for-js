// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the specified Backup Vault in the NetApp account
 *
 * @summary create or update the specified Backup Vault in the NetApp account
 * x-ms-original-file: 2025-07-01-preview/BackupVaults_Create.json
 */
async function backupVaultCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backupVaults.createOrUpdate("myRG", "account1", "backupVault1", {
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await backupVaultCreateOrUpdate();
}

main().catch(console.error);
