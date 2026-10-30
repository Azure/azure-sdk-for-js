// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the AgentFabric membership of a managed cluster.
 *
 * @summary deletes the AgentFabric membership of a managed cluster.
 * x-ms-original-file: 2026-08-02-preview/AgentFabricMemberships_Delete.json
 */
async function deleteAgentFabricMembership() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.agentFabricMemberships.delete("rg1", "clustername1", "default");
}

async function main() {
  await deleteAgentFabricMembership();
}

main().catch(console.error);
