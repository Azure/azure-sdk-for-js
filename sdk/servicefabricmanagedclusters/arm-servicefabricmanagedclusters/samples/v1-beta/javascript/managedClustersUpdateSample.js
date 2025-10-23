// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the tags of of a Service Fabric managed cluster resource with the specified name.
 *
 * @summary update the tags of of a Service Fabric managed cluster resource with the specified name.
 * x-ms-original-file: 2025-06-01-preview/ManagedClusterPatchOperation_example.json
 */
async function patchAManagedCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.managedClusters.update("resRg", "myCluster", {
    tags: { a: "b" },
  });
  console.log(result);
}

async function main() {
  await patchAManagedCluster();
}

main().catch(console.error);
