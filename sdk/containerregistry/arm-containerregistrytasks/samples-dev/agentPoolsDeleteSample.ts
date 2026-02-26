// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryTasksManagementClient } from "@azure/arm-containerregistrytasks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a specified agent pool resource.
 *
 * @summary deletes a specified agent pool resource.
 * x-ms-original-file: 2025-03-01-preview/AgentPoolsDelete.json
 */
async function agentPoolsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  await client.agentPools.delete("myResourceGroup", "myRegistry", "myAgentPool");
}

async function main(): Promise<void> {
  await agentPoolsDelete();
}

main().catch(console.error);
