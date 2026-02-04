// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a managed cluster.
 *
 * @summary deletes a managed cluster.
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersDelete.json
 */
async function deleteManagedCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.managedClusters.delete("rg1", "clustername1");
}

async function main(): Promise<void> {
  await deleteManagedCluster();
}

main().catch(console.error);
