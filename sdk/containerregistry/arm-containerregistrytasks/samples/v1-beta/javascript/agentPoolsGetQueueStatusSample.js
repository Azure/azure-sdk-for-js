// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the count of queued runs for a given agent pool.
 *
 * @summary gets the count of queued runs for a given agent pool.
 * x-ms-original-file: 2025-03-01-preview/AgentPoolsGetQueueStatus.json
 */
async function agentPoolsGetQueueStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.agentPools.getQueueStatus(
    "myResourceGroup",
    "myRegistry",
    "myAgentPool",
  );
  console.log(result);
}

async function main() {
  await agentPoolsGetQueueStatus();
}

main().catch(console.error);
