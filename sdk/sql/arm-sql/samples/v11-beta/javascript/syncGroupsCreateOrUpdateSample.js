// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a sync group.
 *
 * @summary creates or updates a sync group.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupCreate.json
 */
async function createASyncGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
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
 * x-ms-original-file: 2025-02-01-preview/SyncGroupCreateWithIdentity.json
 */
async function createASyncGroupWithUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.syncGroups.createOrUpdate(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-umi":
            {},
        },
      },
      interval: -1,
      conflictResolutionPolicy: "HubWin",
      syncDatabaseId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/syncgroupcrud-3521/providers/Microsoft.Sql/servers/syncgroupcrud-8475/databases/syncgroupcrud-4328",
      usePrivateLinkConnection: false,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a sync group.
 *
 * @summary creates or updates a sync group.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupUpdate.json
 */
async function updateASyncGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
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

async function main() {
  await createASyncGroup();
  await createASyncGroupWithUserAssignedIdentity();
  await updateASyncGroup();
}

main().catch(console.error);
