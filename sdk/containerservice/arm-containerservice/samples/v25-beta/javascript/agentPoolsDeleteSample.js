// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an agent pool in the specified managed cluster.
 *
 * @summary deletes an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsDelete.json
 */
async function deleteAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.agentPools.delete("rg1", "clustername1", "agentpool1");
}

/**
 * This sample demonstrates how to deletes an agent pool in the specified managed cluster.
 *
 * @summary deletes an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsDelete_IgnorePodDisruptionBudget.json
 */
async function deleteAgentPoolByIgnoringPodDisruptionBudget() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.agentPools.delete("rg1", "clustername1", "agentpool1");
}

async function main() {
  await deleteAgentPool();
  await deleteAgentPoolByIgnoringPodDisruptionBudget();
}

main().catch(console.error);
