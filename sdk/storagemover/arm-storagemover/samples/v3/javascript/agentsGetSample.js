// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an Agent resource.
 *
 * @summary gets an Agent resource.
 * x-ms-original-file: 2025-07-01/Agents_Get_MaximumSet.json
 */
async function agentsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.agents.get(
    "examples-rg",
    "examples-storageMoverName",
    "examples-agentName",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an Agent resource.
 *
 * @summary gets an Agent resource.
 * x-ms-original-file: 2025-07-01/Agents_Get_MinimumSet.json
 */
async function agentsGetMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.agents.get(
    "examples-rg",
    "examples-storageMoverName",
    "examples-agentName",
  );
  console.log(result);
}

async function main() {
  await agentsGetMaximumSet();
  await agentsGetMinimumSet();
}

main().catch(console.error);
