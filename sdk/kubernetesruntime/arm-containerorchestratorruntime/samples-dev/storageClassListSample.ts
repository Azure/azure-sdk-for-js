// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list StorageClassResource resources by parent
 *
 * @summary list StorageClassResource resources by parent
 * x-ms-original-file: 2024-03-01/StorageClass_List.json
 */

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

async function storageClassList0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const resArray = new Array();
  for await (const item of client.storageClass.list(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await storageClassList0();
}

main().catch(console.error);
