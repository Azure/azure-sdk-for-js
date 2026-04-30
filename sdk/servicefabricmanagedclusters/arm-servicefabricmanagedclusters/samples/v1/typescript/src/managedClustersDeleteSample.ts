// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Service Fabric managed cluster resource with the specified name.
 *
 * @summary delete a Service Fabric managed cluster resource with the specified name.
 * x-ms-original-file: 2026-02-01/ManagedClusterDeleteOperation_example.json
 */
async function deleteACluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.managedClusters.delete("resRg", "myCluster");
}

async function main(): Promise<void> {
  await deleteACluster();
}

main().catch(console.error);
