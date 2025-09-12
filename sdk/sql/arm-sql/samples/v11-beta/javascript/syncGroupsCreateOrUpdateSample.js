// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a sync group.
 *
 * @summary Creates or updates a sync group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/SyncGroupCreate.json
 */
async function createASyncGroup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "syncgroupcrud-65440";
  const serverName = "syncgroupcrud-8475";
  const databaseName = "syncgroupcrud-4328";
  const syncGroupName = "syncgroupcrud-3187";
  const parameters = {
    conflictResolutionPolicy: "HubWin",
    hubDatabaseUserName: "hubUser",
    interval: -1,
    syncDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/syncgroupcrud-3521/providers/Microsoft.Sql/servers/syncgroupcrud-8475/databases/syncgroupcrud-4328",
    usePrivateLinkConnection: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    syncGroupName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a sync group.
 *
 * @summary Creates or updates a sync group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/SyncGroupUpdate.json
 */
async function updateASyncGroup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "syncgroupcrud-65440";
  const serverName = "syncgroupcrud-8475";
  const databaseName = "syncgroupcrud-4328";
  const syncGroupName = "syncgroupcrud-3187";
  const parameters = {
    conflictResolutionPolicy: "HubWin",
    hubDatabaseUserName: "hubUser",
    interval: -1,
    syncDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/syncgroupcrud-3521/providers/Microsoft.Sql/servers/syncgroupcrud-8475/databases/syncgroupcrud-4328",
    usePrivateLinkConnection: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    syncGroupName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createASyncGroup();
  await updateASyncGroup();
}

main().catch(console.error);
