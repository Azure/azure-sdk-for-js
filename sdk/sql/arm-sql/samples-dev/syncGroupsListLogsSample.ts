// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a collection of sync group logs.
 *
 * @summary gets a collection of sync group logs.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupGetLog.json
 */
async function getSyncGroupLogs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.syncGroups.listLogs(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    "2017-01-01T00:00:00",
    "2017-12-31T00:00:00",
    "All",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getSyncGroupLogs();
}

main().catch(console.error);
