// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list database columns
 *
 * @summary list database columns
 * x-ms-original-file: 2025-02-01-preview/ColumnsListByDatabaseMax.json
 */
async function filterDatabaseColumns(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseColumns.listByDatabase(
    "myRG",
    "serverName",
    "myDatabase",
    {
      schema: ["dbo"],
      table: ["customer", "address"],
      column: ["username"],
      orderBy: ["schema asc", "table", "column desc"],
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list database columns
 *
 * @summary list database columns
 * x-ms-original-file: 2025-02-01-preview/ColumnsListByDatabaseMin.json
 */
async function listDatabaseColumns(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseColumns.listByDatabase(
    "myRG",
    "serverName",
    "myDatabase",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await filterDatabaseColumns();
  await listDatabaseColumns();
}

main().catch(console.error);
