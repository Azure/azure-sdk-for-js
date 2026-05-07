// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the provided Kubernetes cluster agent pool.
 *
 * @summary delete the provided Kubernetes cluster agent pool.
 * x-ms-original-file: 2026-05-01-preview/AgentPools_Delete.json
 */
async function deleteKubernetesClusterAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.agentPools.delete(
    "resourceGroupName",
    "kubernetesClusterName",
    "agentPoolName",
  );
  console.log(result);
}

async function main() {
  await deleteKubernetesClusterAgentPool();
}

main().catch(console.error);
