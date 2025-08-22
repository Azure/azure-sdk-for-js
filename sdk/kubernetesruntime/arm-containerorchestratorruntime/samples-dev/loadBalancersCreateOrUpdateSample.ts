// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a LoadBalancer
 *
 * @summary create a LoadBalancer
 * x-ms-original-file: 2024-03-01/LoadBalancers_CreateOrUpdate.json
 */

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

async function loadBalancersCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const result = await client.loadBalancers.createOrUpdate(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "testlb",
    {
      properties: {
        addresses: ["192.168.50.1/24", "192.168.51.2-192.168.51.10"],
        serviceSelector: { app: "frontend" },
        advertiseMode: "ARP",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await loadBalancersCreateOrUpdate();
}

main().catch(console.error);
