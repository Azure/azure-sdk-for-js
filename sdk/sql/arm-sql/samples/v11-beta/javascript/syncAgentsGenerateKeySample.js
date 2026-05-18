// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates a sync agent key.
 *
 * @summary generates a sync agent key.
 * x-ms-original-file: 2025-02-01-preview/SyncAgentGenerateKey.json
 */
async function generateASyncAgentKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.syncAgents.generateKey(
    "syncagentcrud-65440",
    "syncagentcrud-8475",
    "syncagentcrud-3187",
  );
  console.log(result);
}

async function main() {
  await generateASyncAgentKey();
}

main().catch(console.error);
