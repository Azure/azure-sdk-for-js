// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels the asynchronous operation on the database.
 *
 * @summary cancels the asynchronous operation on the database.
 * x-ms-original-file: 2025-02-01-preview/CancelDatabaseOperation.json
 */
async function cancelTheDatabaseManagementOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.databaseOperations.cancel(
    "sqlcrudtest-7398",
    "sqlcrudtest-6661",
    "testdb",
    "f779414b-e748-4925-8cfe-c8598f7660ae",
  );
}

async function main(): Promise<void> {
  await cancelTheDatabaseManagementOperation();
}

main().catch(console.error);
