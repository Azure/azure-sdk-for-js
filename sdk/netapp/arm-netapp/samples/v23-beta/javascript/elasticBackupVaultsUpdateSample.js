// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch the specified NetApp Elastic Backup Vault
 *
 * @summary patch the specified NetApp Elastic Backup Vault
 * x-ms-original-file: 2025-09-01-preview/ElasticBackupVaults_Update.json
 */
async function elasticBackupVaultsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticBackupVaults.update("myRG", "account1", "backupVault1", {
    tags: { Tag1: "Value1" },
  });
  console.log(result);
}

async function main() {
  await elasticBackupVaultsUpdate();
}

main().catch(console.error);
