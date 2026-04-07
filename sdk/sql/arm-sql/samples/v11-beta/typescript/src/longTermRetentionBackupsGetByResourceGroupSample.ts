// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a long term retention backup.
 *
 * @summary gets a long term retention backup.
 * x-ms-original-file: 2025-02-01-preview/ResourceGroupBasedLongTermRetentionBackupGet.json
 */
async function getTheLongTermRetentionBackup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.longTermRetentionBackups.getByResourceGroup(
    "testResourceGroup",
    "japaneast",
    "testserver",
    "testDatabase",
    "55555555-6666-7777-8888-999999999999;131637960820000000;Hot",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheLongTermRetentionBackup();
}

main().catch(console.error);
