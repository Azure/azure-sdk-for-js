// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KubernetesRuntimeClient } = require("@azure/arm-containerorchestratorruntime");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a LoadBalancer
 *
 * @summary get a LoadBalancer
 * x-ms-original-file: 2024-03-01/LoadBalancers_Get.json
 */
async function loadBalancersGet() {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const result = await client.loadBalancers.get(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "testlb",
  );
  console.log(result);
}

async function main() {
  loadBalancersGet();
}

main().catch(console.error);
