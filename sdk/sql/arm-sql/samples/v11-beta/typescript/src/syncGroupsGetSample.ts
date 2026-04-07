// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a sync group.
 *
 * @summary gets a sync group.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupGet.json
 */
async function getASyncGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.syncGroups.get(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a sync group.
 *
 * @summary gets a sync group.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupGetWithIdentity.json
 */
async function getASyncGroupWithUserAssignedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.syncGroups.get(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASyncGroup();
  await getASyncGroupWithUserAssignedIdentity();
}

main().catch(console.error);
