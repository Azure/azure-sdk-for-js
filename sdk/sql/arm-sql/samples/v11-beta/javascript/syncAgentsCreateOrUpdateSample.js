// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a sync agent.
 *
 * @summary Creates or updates a sync agent.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/SyncAgentCreate.json
 */
async function createANewSyncAgent() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "syncagentcrud-65440";
  const serverName = "syncagentcrud-8475";
  const syncAgentName = "syncagentcrud-3187";
  const parameters = {
    syncDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-Onebox/providers/Microsoft.Sql/servers/syncagentcrud-8475/databases/sync",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncAgents.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    syncAgentName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a sync agent.
 *
 * @summary Creates or updates a sync agent.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/SyncAgentUpdate.json
 */
async function updateASyncAgent() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "syncagentcrud-65440";
  const serverName = "syncagentcrud-8475";
  const syncAgentName = "syncagentcrud-3187";
  const parameters = {
    syncDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-Onebox/providers/Microsoft.Sql/servers/syncagentcrud-8475/databases/sync",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncAgents.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    syncAgentName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createANewSyncAgent();
  await updateASyncAgent();
}

main().catch(console.error);
