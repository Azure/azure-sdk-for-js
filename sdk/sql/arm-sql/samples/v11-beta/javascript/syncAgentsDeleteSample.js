// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a sync agent.
 *
 * @summary deletes a sync agent.
 * x-ms-original-file: 2025-02-01-preview/SyncAgentDelete.json
 */
async function deleteASyncAgent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.syncAgents.delete("syncagentcrud-65440", "syncagentcrud-8475", "syncagentcrud-3187");
}

async function main() {
  await deleteASyncAgent();
}

main().catch(console.error);
