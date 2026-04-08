// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to copy an existing long term retention backup.
 *
 * @summary copy an existing long term retention backup.
 * x-ms-original-file: 2025-02-01-preview/LongTermRetentionBackupCopy.json
 */
async function copyTheLongTermRetentionBackup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.longTermRetentionBackups.copy(
    "japaneast",
    "testserver",
    "testDatabase",
    "55555555-6666-7777-8888-999999999999;131637960820000000",
    {
      targetBackupStorageRedundancy: "Geo",
      targetDatabaseName: "testDatabase2",
      targetServerResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Sql/resourceGroups/resourceGroup/servers/testserver2",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await copyTheLongTermRetentionBackup();
}

main().catch(console.error);
