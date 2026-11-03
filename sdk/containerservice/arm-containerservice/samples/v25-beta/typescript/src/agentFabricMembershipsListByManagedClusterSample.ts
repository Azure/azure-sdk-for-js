// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the AgentFabric memberships of a managed cluster.
 *
 * @summary lists the AgentFabric memberships of a managed cluster.
 * x-ms-original-file: 2026-08-02-preview/AgentFabricMemberships_ListByManagedCluster.json
 */
async function listAgentFabricMembershipsByManagedCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agentFabricMemberships.listByManagedCluster(
    "rg1",
    "clustername1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAgentFabricMembershipsByManagedCluster();
}

main().catch(console.error);
