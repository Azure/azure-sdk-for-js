// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a LoadBalancer
 *
 * @summary get a LoadBalancer
 * x-ms-original-file: 2024-03-01/LoadBalancers_Get.json
 */

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

async function loadBalancersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const result = await client.loadBalancers.get(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "testlb",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await loadBalancersGet();
}

main().catch(console.error);
