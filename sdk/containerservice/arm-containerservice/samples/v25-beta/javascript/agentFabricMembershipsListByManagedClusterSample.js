// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the AgentFabric memberships of a managed cluster.
 *
 * @summary lists the AgentFabric memberships of a managed cluster.
 * x-ms-original-file: 2026-08-02-preview/AgentFabricMemberships_ListByManagedCluster.json
 */
async function listAgentFabricMembershipsByManagedCluster() {
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

async function main() {
  await listAgentFabricMembershipsByManagedCluster();
}

main().catch(console.error);
