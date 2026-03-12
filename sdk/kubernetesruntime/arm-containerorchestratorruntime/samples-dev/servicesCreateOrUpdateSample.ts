// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a ServiceResource
 *
 * @summary create a ServiceResource
 * x-ms-original-file: 2024-03-01/Services_CreateOrUpdate.json
 */

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

async function servicesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const result = await client.services.createOrUpdate(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "storageclass",
    { properties: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await servicesCreateOrUpdate();
}

main().catch(console.error);
