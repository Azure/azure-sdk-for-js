// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a Service Fabric managed cluster resource created or in the process of being created in the specified resource group.
 *
 * @summary get a Service Fabric managed cluster resource created or in the process of being created in the specified resource group.
 * x-ms-original-file: 2025-03-01-preview/ManagedClusterGetOperation_example.json
 */

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

async function getACluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.managedClusters.get("resRg", "myCluster");
  console.log(result);
}

async function main(): Promise<void> {
  await getACluster();
}

main().catch(console.error);
