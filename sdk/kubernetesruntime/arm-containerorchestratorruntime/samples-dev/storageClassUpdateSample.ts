// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a StorageClassResource
 *
 * @summary update a StorageClassResource
 * x-ms-original-file: 2024-03-01/StorageClass_Update.json
 */

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

async function storageClassUpdate0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const result = await client.storageClass.update(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "testrwx",
    { properties: { typeProperties: { backingStorageClassName: "default" } } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageClassUpdate0();
}

main().catch(console.error);
