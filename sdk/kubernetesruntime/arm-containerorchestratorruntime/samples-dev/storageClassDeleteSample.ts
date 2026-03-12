// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a StorageClassResource
 *
 * @summary delete a StorageClassResource
 * x-ms-original-file: 2024-03-01/StorageClass_Delete.json
 */

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

async function storageClassDelete0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  await client.storageClass.delete(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "testrwx",
  );
}

async function main(): Promise<void> {
  await storageClassDelete0();
}

main().catch(console.error);
