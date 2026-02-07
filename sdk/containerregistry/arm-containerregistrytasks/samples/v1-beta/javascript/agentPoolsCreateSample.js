// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an agent pool for a container registry with the specified parameters.
 *
 * @summary creates an agent pool for a container registry with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/AgentPoolsCreate.json
 */
async function agentPoolsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.agentPools.create("myResourceGroup", "myRegistry", "myAgentPool", {
    location: "WESTUS",
    properties: { count: 1, os: "Linux", tier: "S1" },
    tags: { key: "value" },
  });
  console.log(result);
}

async function main() {
  await agentPoolsCreate();
}

main().catch(console.error);
