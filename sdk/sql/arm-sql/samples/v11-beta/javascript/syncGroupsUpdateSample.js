// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a sync group.
 *
 * @summary updates a sync group.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupPatch.json
 */
async function updateASyncGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.syncGroups.update(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    {
      conflictResolutionPolicy: "HubWin",
      hubDatabasePassword: "hubPassword",
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
 * This sample demonstrates how to updates a sync group.
 *
 * @summary updates a sync group.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupPatchAddAndRemoveIdentity.json
 */
async function updateASyncGroupWithNewUserAssignedIdentityAndRemoveOlderAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.syncGroups.update(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-umi-2":
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
 * This sample demonstrates how to updates a sync group.
 *
 * @summary updates a sync group.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupPatchWithIdentity.json
 */
async function updateASyncGroupWithUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.syncGroups.update(
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
      usePrivateLinkConnection: true,
    },
  );
  console.log(result);
}

async function main() {
  await updateASyncGroup();
  await updateASyncGroupWithNewUserAssignedIdentityAndRemoveOlderAssignedIdentity();
  await updateASyncGroupWithUserAssignedIdentity();
}

main().catch(console.error);
