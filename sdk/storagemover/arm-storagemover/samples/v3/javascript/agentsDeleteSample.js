// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Agent resource.
 *
 * @summary deletes an Agent resource.
 * x-ms-original-file: 2025-07-01/Agents_Delete.json
 */
async function agentsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  await client.agents.delete("examples-rg", "examples-storageMoverName", "examples-agentName");
}

async function main() {
  await agentsDelete();
}

main().catch(console.error);
