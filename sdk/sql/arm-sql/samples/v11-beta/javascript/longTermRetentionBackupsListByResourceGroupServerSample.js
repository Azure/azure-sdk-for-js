// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the long term retention backups for a given server based on resource groups.
 *
 * @summary lists the long term retention backups for a given server based on resource groups.
 * x-ms-original-file: 2025-02-01-preview/ResourceGroupBasedLongTermRetentionBackupListByServer.json
 */
async function getAllLongTermRetentionBackupsUnderTheServerBasedOnResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionBackups.listByResourceGroupServer(
    "testResourceGroup",
    "japaneast",
    "testserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllLongTermRetentionBackupsUnderTheServerBasedOnResourceGroup();
}

main().catch(console.error);
