// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a LoadBalancer
 *
 * @summary delete a LoadBalancer
 * x-ms-original-file: 2024-03-01/LoadBalancers_Delete.json
 */

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

async function loadBalancersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  await client.loadBalancers.delete(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "testlb",
  );
}

async function main(): Promise<void> {
  await loadBalancersDelete();
}

main().catch(console.error);
