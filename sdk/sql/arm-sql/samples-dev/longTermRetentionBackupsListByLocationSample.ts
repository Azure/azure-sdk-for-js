// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the long term retention backups for a given location.
 *
 * @summary lists the long term retention backups for a given location.
 * x-ms-original-file: 2025-08-01-preview/LongTermRetentionBackupListByLocation.json
 */
async function getAllLongTermRetentionBackupsUnderTheLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionBackups.listByLocation("japaneast")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the long term retention backups for a given location.
 *
 * @summary lists the long term retention backups for a given location.
 * x-ms-original-file: 2025-08-01-preview/LongTermRetentionBackupListByLocationWithPagination.json
 */
async function getLongTermRetentionBackupsUnderTheLocationWithPagination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionBackups.listByLocation("japaneast")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllLongTermRetentionBackupsUnderTheLocation();
  await getLongTermRetentionBackupsUnderTheLocationWithPagination();
}

main().catch(console.error);
