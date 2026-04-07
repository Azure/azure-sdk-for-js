// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a collection of sync database ids.
 *
 * @summary gets a collection of sync database ids.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupGetSyncDatabaseId.json
 */
async function getASyncDatabaseID(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.syncGroups.listSyncDatabaseIds("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getASyncDatabaseID();
}

main().catch(console.error);
