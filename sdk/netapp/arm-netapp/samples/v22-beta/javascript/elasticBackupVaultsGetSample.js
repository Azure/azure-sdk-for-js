// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Elastic Backup Vault
 *
 * @summary get the Elastic Backup Vault
 * x-ms-original-file: 2025-09-01-preview/ElasticBackupVaults_Get.json
 */
async function elasticBackupVaultsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticBackupVaults.get("myRG", "account1", "backupVault1");
  console.log(result);
}

async function main() {
  await elasticBackupVaultsGet();
}

main().catch(console.error);
