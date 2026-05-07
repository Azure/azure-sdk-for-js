// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the provided Kubernetes cluster.
 *
 * @summary delete the provided Kubernetes cluster.
 * x-ms-original-file: 2026-05-01-preview/KubernetesClusters_Delete.json
 */
async function deleteKubernetesCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.kubernetesClusters.delete(
    "resourceGroupName",
    "kubernetesClusterName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteKubernetesCluster();
}

main().catch(console.error);
