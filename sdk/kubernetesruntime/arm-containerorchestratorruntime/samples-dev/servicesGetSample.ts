// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a ServiceResource
 *
 * @summary get a ServiceResource
 * x-ms-original-file: 2024-03-01/Services_Get.json
 */

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

async function servicesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const result = await client.services.get(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "storageclass",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await servicesGet();
}

main().catch(console.error);
