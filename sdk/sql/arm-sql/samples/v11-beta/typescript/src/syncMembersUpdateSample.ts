// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing sync member.
 *
 * @summary updates an existing sync member.
 * x-ms-original-file: 2025-02-01-preview/SyncMemberPatch.json
 */
async function updateAnExistingSyncMember(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.syncMembers.update(
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
 * This sample demonstrates how to updates an existing sync member.
 *
 * @summary updates an existing sync member.
 * x-ms-original-file: 2025-02-01-preview/SyncMemberPatchAddAndRemoveIdentity.json
 */
async function updateAnExistingSyncMemberWithNewUserAssignedIdentityAndRemovingOlderUserAssignedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.syncMembers.update(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
    "syncmembercrud-4879",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-umi-2":
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
 * This sample demonstrates how to updates an existing sync member.
 *
 * @summary updates an existing sync member.
 * x-ms-original-file: 2025-02-01-preview/SyncMemberPatchWithIdentity.json
 */
async function updateAnExistingSyncMemberWithUserAssignedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.syncMembers.update(
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

async function main(): Promise<void> {
  await updateAnExistingSyncMember();
  await updateAnExistingSyncMemberWithNewUserAssignedIdentityAndRemovingOlderUserAssignedIdentity();
  await updateAnExistingSyncMemberWithUserAssignedIdentity();
}

main().catch(console.error);
