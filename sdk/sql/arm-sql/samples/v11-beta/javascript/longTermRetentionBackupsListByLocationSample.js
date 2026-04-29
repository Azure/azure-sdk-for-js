// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the long term retention backups for a given location.
 *
 * @summary lists the long term retention backups for a given location.
 * x-ms-original-file: 2025-02-01-preview/LongTermRetentionBackupListByLocation.json
 */
async function getAllLongTermRetentionBackupsUnderTheLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionBackups.listByLocation("japaneast")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllLongTermRetentionBackupsUnderTheLocation();
}

main().catch(console.error);
