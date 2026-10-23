// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of restorable dropped databases.
 *
 * @summary gets a list of restorable dropped databases.
 * x-ms-original-file: 2026-08-01-preview/ListRestorableDroppedDatabasesByServer.json
 */
async function getsAListOfRestorableDroppedDatabases(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.restorableDroppedDatabases.listByServer(
    "Default-SQL-SouthEastAsia",
    "testsvr",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of restorable dropped databases.
 *
 * @summary gets a list of restorable dropped databases.
 * x-ms-original-file: 2026-08-01-preview/ListRestorableDroppedDatabasesByServerWithOdata.json
 */
async function getsAListOfRestorableDroppedDatabasesWithODataFiltering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.restorableDroppedDatabases.listByServer(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    { top: 25 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsAListOfRestorableDroppedDatabases();
  await getsAListOfRestorableDroppedDatabasesWithODataFiltering();
}

main().catch(console.error);
