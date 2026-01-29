// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch an elastic Backup under the Elastic Backup Vault
 *
 * @summary patch an elastic Backup under the Elastic Backup Vault
 * x-ms-original-file: 2025-09-01-preview/ElasticBackups_Update.json
 */
async function elasticBackupsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticBackups.update(
    "myRG",
    "account1",
    "backupVault1",
    "backup1",
    {},
  );
  console.log(result);
}

async function main() {
  await elasticBackupsUpdate();
}

main().catch(console.error);
