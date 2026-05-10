// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a sync member.
 *
 * @summary creates or updates a sync member.
 * x-ms-original-file: 2025-02-01-preview/SyncMemberCreate.json
 */
async function createANewSyncMember() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncMembers.createOrUpdate(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    "syncmembercrud-4879",
    {
      databaseName: "syncgroupcrud-7421",
      databaseType: "AzureSqlDatabase",
      serverName: "syncgroupcrud-3379.database.windows.net",
      syncDirection: "Bidirectional",
      syncMemberAzureDatabaseResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/syncgroupcrud-65440/providers/Microsoft.Sql/servers/syncgroupcrud-8475/databases/syncgroupcrud-4328",
      usePrivateLinkConnection: true,
      userName: "myUser",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a sync member.
 *
 * @summary creates or updates a sync member.
 * x-ms-original-file: 2025-02-01-preview/SyncMemberCreateWithIdentity.json
 */
async function createANewSyncMemberWithUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncMembers.createOrUpdate(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    "syncmembercrud-4879",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-umi":
            {},
        },
      },
      databaseType: "AzureSqlDatabase",
      serverName: "syncgroupcrud-3379.database.windows.net",
      databaseName: "syncgroupcrud-7421",
      syncDirection: "Bidirectional",
      usePrivateLinkConnection: true,
      syncMemberAzureDatabaseResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/syncgroupcrud-65440/providers/Microsoft.Sql/servers/syncgroupcrud-8475/databases/syncgroupcrud-4328",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a sync member.
 *
 * @summary creates or updates a sync member.
 * x-ms-original-file: 2025-02-01-preview/SyncMemberUpdate.json
 */
async function updateASyncMember() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncMembers.createOrUpdate(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    "syncmembercrud-4879",
    {
      databaseName: "syncgroupcrud-7421",
      databaseType: "AzureSqlDatabase",
      serverName: "syncgroupcrud-3379.database.windows.net",
      syncDirection: "Bidirectional",
      syncMemberAzureDatabaseResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/syncgroupcrud-65440/providers/Microsoft.Sql/servers/syncgroupcrud-8475/databases/syncgroupcrud-4328",
      usePrivateLinkConnection: true,
      userName: "myUser",
    },
  );
  console.log(result);
}

async function main() {
  await createANewSyncMember();
  await createANewSyncMemberWithUserAssignedIdentity();
  await updateASyncMember();
}

main().catch(console.error);
