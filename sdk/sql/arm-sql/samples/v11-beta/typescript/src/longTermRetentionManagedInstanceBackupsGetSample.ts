// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a long term retention backup for a managed database.
 *
 * @summary gets a long term retention backup for a managed database.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceLongTermRetentionBackupGet.json
 */
async function getTheLongTermRetentionBackupOfAManagedDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.longTermRetentionManagedInstanceBackups.get(
    "japaneast",
    "testInstance",
    "testDatabase",
    "55555555-6666-7777-8888-999999999999;131637960820000000;Archive",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheLongTermRetentionBackupOfAManagedDatabase();
}

main().catch(console.error);
