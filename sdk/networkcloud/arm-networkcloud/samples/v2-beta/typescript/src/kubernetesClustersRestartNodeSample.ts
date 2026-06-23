// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restart a targeted node of a Kubernetes cluster.
 *
 * @summary restart a targeted node of a Kubernetes cluster.
 * x-ms-original-file: 2026-05-01-preview/KubernetesClusters_RestartNode.json
 */
async function restartAKubernetesClusterNode(): Promise<void> {
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

async function main(): Promise<void> {
  await restartAKubernetesClusterNode();
}

main().catch(console.error);
