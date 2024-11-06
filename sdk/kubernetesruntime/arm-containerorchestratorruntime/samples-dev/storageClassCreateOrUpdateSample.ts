// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a StorageClassResource
 *
 * @summary create a StorageClassResource
 * x-ms-original-file: 2024-03-01/StorageClass_CreateOrUpdate.json
 */
async function storageClassCreateOrUpdate0() {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const result = await client.storageClass.createOrUpdate(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "testrwx",
    {
      properties: {
        typeProperties: { type: "RWX", backingStorageClassName: "default" },
      },
    },
  );
  console.log(result);
}

async function main() {
  storageClassCreateOrUpdate0();
}

main().catch(console.error);
