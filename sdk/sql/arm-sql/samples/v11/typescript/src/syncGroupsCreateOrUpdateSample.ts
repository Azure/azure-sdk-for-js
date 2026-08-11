// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a sync group.
 *
 * @summary creates or updates a sync group.
 * x-ms-original-file: 2025-01-01/SyncGroupCreate.json
 */
async function createASyncGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncGroups.createOrUpdate(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    {
      conflictResolutionPolicy: "HubWin",
      hubDatabaseUserName: "hubUser",
      interval: -1,
      syncDatabaseId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/syncgroupcrud-3521/providers/Microsoft.Sql/servers/syncgroupcrud-8475/databases/syncgroupcrud-4328",
      usePrivateLinkConnection: true,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a sync group.
 *
 * @summary creates or updates a sync group.
 * x-ms-original-file: 2025-01-01/SyncGroupUpdate.json
 */
async function updateASyncGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncGroups.createOrUpdate(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    {
      conflictResolutionPolicy: "HubWin",
      hubDatabaseUserName: "hubUser",
      interval: -1,
      syncDatabaseId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/syncgroupcrud-3521/providers/Microsoft.Sql/servers/syncgroupcrud-8475/databases/syncgroupcrud-4328",
      usePrivateLinkConnection: true,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createASyncGroup();
  await updateASyncGroup();
}

main().catch(console.error);
