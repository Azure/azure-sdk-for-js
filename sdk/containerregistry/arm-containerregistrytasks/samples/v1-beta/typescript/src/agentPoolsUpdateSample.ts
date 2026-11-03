// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryTasksManagementClient } from "@azure/arm-containerregistrytasks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an agent pool with the specified parameters.
 *
 * @summary updates an agent pool with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/AgentPoolsUpdate.json
 */
async function agentPoolsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.agentPools.update("myResourceGroup", "myRegistry", "myAgentPool", {
    count: 1,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await agentPoolsUpdate();
}

main().catch(console.error);
