// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the upgrade profile for an agent pool.
 *
 * @summary gets the upgrade profile for an agent pool.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsGetUpgradeProfile.json
 */
async function getUpgradeProfileForAgentPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.getUpgradeProfile("rg1", "clustername1", "agentpool1");
  console.log(result);
}

async function main(): Promise<void> {
  await getUpgradeProfileForAgentPool();
}

main().catch(console.error);
