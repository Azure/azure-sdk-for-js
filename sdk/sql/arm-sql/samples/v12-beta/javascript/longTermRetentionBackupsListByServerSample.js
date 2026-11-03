// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the long term retention backups for a given server.
 *
 * @summary lists the long term retention backups for a given server.
 * x-ms-original-file: 2025-08-01-preview/LongTermRetentionBackupListByServer.json
 */
async function getAllLongTermRetentionBackupsUnderTheServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionBackups.listByServer(
    "japaneast",
    "testserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the long term retention backups for a given server.
 *
 * @summary lists the long term retention backups for a given server.
 * x-ms-original-file: 2025-08-01-preview/LongTermRetentionBackupListByServerWithPagination.json
 */
async function getLongTermRetentionBackupsUnderTheServerWithPagination() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionBackups.listByServer(
    "japaneast",
    "testserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllLongTermRetentionBackupsUnderTheServer();
  await getLongTermRetentionBackupsUnderTheServerWithPagination();
}

main().catch(console.error);
