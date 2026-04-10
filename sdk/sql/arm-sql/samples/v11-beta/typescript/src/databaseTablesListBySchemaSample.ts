// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list database tables
 *
 * @summary list database tables
 * x-ms-original-file: 2025-02-01-preview/DatabaseTableListBySchema.json
 */
async function listDatabaseTables(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseTables.listBySchema(
    "myRG",
    "serverName",
    "myDatabase",
    "dbo",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDatabaseTables();
}

main().catch(console.error);
