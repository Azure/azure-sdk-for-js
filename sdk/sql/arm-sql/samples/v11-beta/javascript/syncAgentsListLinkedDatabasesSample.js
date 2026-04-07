// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists databases linked to a sync agent.
 *
 * @summary lists databases linked to a sync agent.
 * x-ms-original-file: 2025-02-01-preview/SyncAgentGetLinkedDatabases.json
 */
async function getSyncAgentLinkedDatabases() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.syncAgents.listLinkedDatabases(
    "syncagentcrud-65440",
    "syncagentcrud-8475",
    "syncagentcrud-3187",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getSyncAgentLinkedDatabases();
}

main().catch(console.error);
