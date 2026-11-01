// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the AgentFabric membership of a managed cluster.
 *
 * @summary gets the AgentFabric membership of a managed cluster.
 * x-ms-original-file: 2026-08-02-preview/AgentFabricMemberships_Get.json
 */
async function getAgentFabricMembership() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentFabricMemberships.get("rg1", "clustername1", "default");
  console.log(result);
}

async function main() {
  await getAgentFabricMembership();
}

main().catch(console.error);
