// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KubernetesRuntimeClient } = require("@azure/arm-containerorchestratorruntime");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ServiceResource
 *
 * @summary get a ServiceResource
 * x-ms-original-file: 2024-03-01/Services_Get.json
 */
async function servicesGet() {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const result = await client.services.get(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "storageclass",
  );
  console.log(result);
}

async function main() {
  servicesGet();
}

main().catch(console.error);
