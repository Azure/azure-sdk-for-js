// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryTasksManagementClient } from "@azure/arm-containerregistrytasks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the detailed information for a given agent pool.
 *
 * @summary gets the detailed information for a given agent pool.
 * x-ms-original-file: 2025-03-01-preview/AgentPoolsGet.json
 */
async function agentPoolsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.agentPools.get("myResourceGroup", "myRegistry", "myAgentPool");
  console.log(result);
}

async function main(): Promise<void> {
  await agentPoolsGet();
}

main().catch(console.error);
