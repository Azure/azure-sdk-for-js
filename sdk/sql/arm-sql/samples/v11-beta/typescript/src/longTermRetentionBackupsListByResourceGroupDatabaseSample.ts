// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all long term retention backups for a database based on a particular resource group.
 *
 * @summary lists all long term retention backups for a database based on a particular resource group.
 * x-ms-original-file: 2025-02-01-preview/ResourceGroupBasedLongTermRetentionBackupListByDatabase.json
 */
async function getAllLongTermRetentionBackupsUnderTheDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionBackups.listByResourceGroupDatabase(
    "testResourceGroup",
    "japaneast",
    "testserver",
    "testDatabase",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllLongTermRetentionBackupsUnderTheDatabase();
}

main().catch(console.error);
