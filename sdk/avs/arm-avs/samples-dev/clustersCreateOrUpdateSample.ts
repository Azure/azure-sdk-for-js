// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Cluster
 *
 * @summary create a Cluster
 * x-ms-original-file: 2024-09-01/Clusters_CreateOrUpdate.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function clustersCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate("group1", "cloud1", "cluster1", {
    sku: { name: "AV20" },
    properties: { clusterSize: 3 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await clustersCreateOrUpdate();
}

main().catch(console.error);
