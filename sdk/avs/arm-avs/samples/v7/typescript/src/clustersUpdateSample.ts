// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Cluster
 *
 * @summary update a Cluster
 * x-ms-original-file: 2024-09-01/Clusters_Update.json
 */
async function clustersUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.clusters.update("group1", "cloud1", "cluster1", {
    properties: { clusterSize: 4 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await clustersUpdate();
}

main().catch(console.error);
