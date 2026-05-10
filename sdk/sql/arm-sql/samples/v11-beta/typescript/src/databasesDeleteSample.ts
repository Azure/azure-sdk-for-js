// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the database.
 *
 * @summary deletes the database.
 * x-ms-original-file: 2025-02-01-preview/DeleteDatabase.json
 */
async function deletesADatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.databases.delete("Default-SQL-SouthEastAsia", "testsvr", "testdb");
}

async function main(): Promise<void> {
  await deletesADatabase();
}

main().catch(console.error);
