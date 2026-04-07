// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a sync agent.
 *
 * @summary deletes a sync agent.
 * x-ms-original-file: 2025-02-01-preview/SyncAgentDelete.json
 */
async function deleteASyncAgent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.syncAgents.delete("syncagentcrud-65440", "syncagentcrud-8475", "syncagentcrud-3187");
}

async function main(): Promise<void> {
  await deleteASyncAgent();
}

main().catch(console.error);
