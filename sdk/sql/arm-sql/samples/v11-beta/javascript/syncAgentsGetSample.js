// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a sync agent.
 *
 * @summary gets a sync agent.
 * x-ms-original-file: 2025-02-01-preview/SyncAgentGet.json
 */
async function getASyncAgent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncAgents.get(
    "syncagentcrud-65440",
    "syncagentcrud-8475",
    "syncagentcrud-3187",
  );
  console.log(result);
}

async function main() {
  await getASyncAgent();
}

main().catch(console.error);
