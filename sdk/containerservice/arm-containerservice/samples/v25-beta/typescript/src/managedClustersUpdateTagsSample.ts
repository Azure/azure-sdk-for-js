// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags on a managed cluster.
 *
 * @summary updates tags on a managed cluster.
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersUpdateTags.json
 */
async function updateManagedClusterTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.updateTags("rg1", "clustername1", {
    tags: { archv3: "", tier: "testing" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateManagedClusterTags();
}

main().catch(console.error);
