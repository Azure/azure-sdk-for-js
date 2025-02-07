// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KubernetesRuntimeClient } = require("@azure/arm-containerorchestratorruntime");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a StorageClassResource
 *
 * @summary update a StorageClassResource
 * x-ms-original-file: 2024-03-01/StorageClass_Update.json
 */
async function storageClassUpdate0() {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const result = await client.storageClass.update(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "testrwx",
    { properties: { typeProperties: { backingStorageClassName: "default" } } },
  );
  console.log(result);
}

async function main() {
  storageClassUpdate0();
}

main().catch(console.error);
