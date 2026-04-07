// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list database columns
 *
 * @summary list database columns
 * x-ms-original-file: 2025-02-01-preview/DatabaseColumnListByTable.json
 */
async function listDatabaseColumns(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseColumns.listByTable(
    "myRG",
    "serverName",
    "myDatabase",
    "dbo",
    "table1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDatabaseColumns();
}

main().catch(console.error);
