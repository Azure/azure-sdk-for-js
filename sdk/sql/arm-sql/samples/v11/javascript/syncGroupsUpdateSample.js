// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a sync group.
 *
 * @summary updates a sync group.
 * x-ms-original-file: 2025-01-01/SyncGroupPatch.json
 */
async function updateASyncGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
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

async function main() {
  await updateASyncGroup();
}

main().catch(console.error);
