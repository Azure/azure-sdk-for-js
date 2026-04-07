// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the long term retention backups for managed databases in a given location.
 *
 * @summary lists the long term retention backups for managed databases in a given location.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceLongTermRetentionBackupListByLocation.json
 */
async function getAllLongTermRetentionBackupsUnderTheLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionManagedInstanceBackups.listByLocation(
    "japaneast",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the long term retention backups for managed databases in a given location.
 *
 * @summary lists the long term retention backups for managed databases in a given location.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceLongTermRetentionBackupListByLocationMax.json
 */
async function getAllLongTermRetentionBackupsUnderTheLocationWithMaximalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionManagedInstanceBackups.listByLocation(
    "japaneast",
    { skip: 0, top: 2, filter: "Properties/ManagedInstanceName eq 'testInstance1'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllLongTermRetentionBackupsUnderTheLocation();
  await getAllLongTermRetentionBackupsUnderTheLocationWithMaximalParameters();
}

main().catch(console.error);
