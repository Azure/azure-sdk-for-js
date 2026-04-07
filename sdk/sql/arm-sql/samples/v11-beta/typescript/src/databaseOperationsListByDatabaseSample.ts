// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of operations performed on the database.
 *
 * @summary gets a list of operations performed on the database.
 * x-ms-original-file: 2025-02-01-preview/ListDatabaseOperations.json
 */
async function listTheDatabaseManagementOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseOperations.listByDatabase(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheDatabaseManagementOperations();
}

main().catch(console.error);
