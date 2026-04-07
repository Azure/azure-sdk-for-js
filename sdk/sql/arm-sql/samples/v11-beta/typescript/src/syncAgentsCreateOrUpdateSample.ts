// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a sync agent.
 *
 * @summary creates or updates a sync agent.
 * x-ms-original-file: 2025-02-01-preview/SyncAgentCreate.json
 */
async function createANewSyncAgent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.syncAgents.createOrUpdate(
    "syncagentcrud-65440",
    "syncagentcrud-8475",
    "syncagentcrud-3187",
    {
      syncDatabaseId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-Onebox/providers/Microsoft.Sql/servers/syncagentcrud-8475/databases/sync",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a sync agent.
 *
 * @summary creates or updates a sync agent.
 * x-ms-original-file: 2025-02-01-preview/SyncAgentUpdate.json
 */
async function updateASyncAgent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.syncAgents.createOrUpdate(
    "syncagentcrud-65440",
    "syncagentcrud-8475",
    "syncagentcrud-3187",
    {
      syncDatabaseId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-Onebox/providers/Microsoft.Sql/servers/syncagentcrud-8475/databases/sync",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createANewSyncAgent();
  await updateASyncAgent();
}

main().catch(console.error);
