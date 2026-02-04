// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to completes the upgrade operation for the specified agent pool.
 *
 * @summary completes the upgrade operation for the specified agent pool.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCompleteUpgrade.json
 */
async function completeAgentPoolUpgrade() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.agentPools.completeUpgrade("rg1", "clustername1", "agentpool1");
}

async function main() {
  await completeAgentPoolUpgrade();
}

main().catch(console.error);
