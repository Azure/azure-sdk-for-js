// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets all Node types of the specified managed cluster.
 *
 * @summary gets all Node types of the specified managed cluster.
 * x-ms-original-file: 2025-03-01-preview/NodeTypeListOperation_example.json
 */

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

async function listNodeTypeOfTheSpecifiedManagedCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeTypes.listByManagedClusters("resRg", "myCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNodeTypeOfTheSpecifiedManagedCluster();
}

main().catch(console.error);
