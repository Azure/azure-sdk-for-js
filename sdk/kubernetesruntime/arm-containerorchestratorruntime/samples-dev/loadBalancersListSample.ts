// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list LoadBalancer resources by parent
 *
 * @summary list LoadBalancer resources by parent
 * x-ms-original-file: 2024-03-01/LoadBalancers_List.json
 */

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

async function loadBalancersList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const resArray = new Array();
  for await (const item of client.loadBalancers.list(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await loadBalancersList();
}

main().catch(console.error);
