// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns pool-level bootstrap configuration for FlexNode machines.
 *
 * @summary returns pool-level bootstrap configuration for FlexNode machines.
 * x-ms-original-file: 2026-05-02-preview/AgentPoolsListBootstrapData.json
 */
async function listBootstrapDataForFlexNodeAgentPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.listBootstrapData("rg1", "clustername1", "flexnode1", {});
  console.log(result);
}

async function main(): Promise<void> {
  await listBootstrapDataForFlexNodeAgentPool();
}

main().catch(console.error);
