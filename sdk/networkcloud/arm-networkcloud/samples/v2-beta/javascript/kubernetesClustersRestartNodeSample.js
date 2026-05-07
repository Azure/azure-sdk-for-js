// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restart a targeted node of a Kubernetes cluster.
 *
 * @summary restart a targeted node of a Kubernetes cluster.
 * x-ms-original-file: 2026-05-01-preview/KubernetesClusters_RestartNode.json
 */
async function restartAKubernetesClusterNode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.kubernetesClusters.restartNode(
    "resourceGroupName",
    "kubernetesClusterName",
    { nodeName: "nodeName" },
  );
  console.log(result);
}

async function main() {
  await restartAKubernetesClusterNode();
}

main().catch(console.error);
