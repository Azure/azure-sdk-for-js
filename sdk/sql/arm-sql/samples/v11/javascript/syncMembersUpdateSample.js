// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing sync member.
 *
 * @summary updates an existing sync member.
 * x-ms-original-file: 2025-01-01/SyncMemberPatch.json
 */
async function updateAnExistingSyncMember() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
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

async function main() {
  await updateAnExistingSyncMember();
}

main().catch(console.error);
