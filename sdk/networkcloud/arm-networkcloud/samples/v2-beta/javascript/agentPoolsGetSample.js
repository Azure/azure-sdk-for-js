// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of the provided Kubernetes cluster agent pool.
 *
 * @summary get properties of the provided Kubernetes cluster agent pool.
 * x-ms-original-file: 2026-05-01-preview/AgentPools_Get.json
 */
async function getKubernetesClusterAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.agentPools.get(
    "resourceGroupName",
    "kubernetesClusterName",
    "agentPoolName",
  );
  console.log(result);
}

async function main() {
  await getKubernetesClusterAgentPool();
}

main().catch(console.error);
