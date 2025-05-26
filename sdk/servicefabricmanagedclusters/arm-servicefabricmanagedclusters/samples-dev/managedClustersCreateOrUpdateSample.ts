// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Service Fabric managed cluster resource with the specified name.
 *
 * @summary create or update a Service Fabric managed cluster resource with the specified name.
 * x-ms-original-file: 2025-03-01-preview/ManagedClusterPutOperation_example_max.json
 */
async function putAClusterWithMaximumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.managedClusters.createOrUpdate("resRg", "mycluster");
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric managed cluster resource with the specified name.
 *
 * @summary create or update a Service Fabric managed cluster resource with the specified name.
 * x-ms-original-file: 2025-03-01-preview/ManagedClusterPutOperation_example_min.json
 */
async function putAClusterWithMinimumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.managedClusters.createOrUpdate("resRg", "myCluster");
  console.log(result);
}

async function main(): Promise<void> {
  await putAClusterWithMaximumParameters();
  await putAClusterWithMinimumParameters();
}

main().catch(console.error);
