// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all elastic backups Under an elastic Backup Vault
 *
 * @summary list all elastic backups Under an elastic Backup Vault
 * x-ms-original-file: 2025-09-01-preview/ElasticBackups_ListByVault.json
 */
async function elasticBackupsListByVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticBackups.listByVault("myRG", "account1", "backupVault1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await elasticBackupsListByVault();
}

main().catch(console.error);
