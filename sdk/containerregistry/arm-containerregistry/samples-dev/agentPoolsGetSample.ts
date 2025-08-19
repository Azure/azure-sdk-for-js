// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the detailed information for a given agent pool.
 *
 * @summary Gets the detailed information for a given agent pool.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/preview/2025-03-01-preview/examples/AgentPoolsGet.json
 */

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function agentPoolsGet(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const agentPoolName = "myAgentPool";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.agentPools.get(
    resourceGroupName,
    registryName,
    agentPoolName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await agentPoolsGet();
}

main().catch(console.error);
