// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified managed cluster agent pool.
 *
 * @summary gets the specified managed cluster agent pool.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsGet.json
 */
async function getAgentPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.get("rg1", "clustername1", "agentpool1");
  console.log(result);
}

async function main(): Promise<void> {
  await getAgentPool();
}

main().catch(console.error);
