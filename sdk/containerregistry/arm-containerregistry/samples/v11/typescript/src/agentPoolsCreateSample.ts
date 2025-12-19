// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AgentPool} from "@azure/arm-containerregistry";
import {
  ContainerRegistryManagementClient,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates an agent pool for a container registry with the specified parameters.
 *
 * @summary Creates an agent pool for a container registry with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2019-06-01-preview/examples/AgentPoolsCreate.json
 */
async function agentPoolsCreate(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const agentPoolName = "myAgentPool";
  const agentPool: AgentPool = {
    count: 1,
    location: "WESTUS",
    os: "Linux",
    tags: { key: "value" },
    tier: "S1",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.agentPools.beginCreateAndWait(
    resourceGroupName,
    registryName,
    agentPoolName,
    agentPool,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await agentPoolsCreate();
}

main().catch(console.error);
