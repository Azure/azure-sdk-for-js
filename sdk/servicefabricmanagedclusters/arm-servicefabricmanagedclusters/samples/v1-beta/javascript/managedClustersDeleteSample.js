// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Service Fabric managed cluster resource with the specified name.
 *
 * @summary delete a Service Fabric managed cluster resource with the specified name.
 * x-ms-original-file: 2025-06-01-preview/ManagedClusterDeleteOperation_example.json
 */
async function deleteACluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.managedClusters.delete("resRg", "myCluster");
}

async function main() {
  await deleteACluster();
}

main().catch(console.error);
