// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KubernetesRuntimeClient } = require("@azure/arm-containerorchestratorruntime");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a StorageClassResource
 *
 * @summary delete a StorageClassResource
 * x-ms-original-file: 2024-03-01/StorageClass_Delete.json
 */
async function storageClassDelete0() {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  await client.storageClass.delete(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
    "testrwx",
  );
}

async function main() {
  storageClassDelete0();
}

main().catch(console.error);
