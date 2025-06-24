// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Cluster
 *
 * @summary delete a Cluster
 * x-ms-original-file: 2024-09-01/Clusters_Delete.json
 */
async function clustersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.clusters.delete("group1", "cloud1", "cluster1");
}

async function main(): Promise<void> {
  await clustersDelete();
}

main().catch(console.error);
