// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of agent pools for the provided Kubernetes cluster.
 *
 * @summary get a list of agent pools for the provided Kubernetes cluster.
 * x-ms-original-file: 2026-05-01-preview/AgentPools_ListByKubernetesCluster.json
 */
async function listAgentPoolsOfTheKubernetesCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agentPools.listByKubernetesCluster(
    "resourceGroupName",
    "kubernetesClusterName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAgentPoolsOfTheKubernetesCluster();
}

main().catch(console.error);
