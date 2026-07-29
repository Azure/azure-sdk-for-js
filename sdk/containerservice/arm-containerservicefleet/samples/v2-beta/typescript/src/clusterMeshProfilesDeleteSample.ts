// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ClusterMeshProfile
 *
 * @summary delete a ClusterMeshProfile
 * x-ms-original-file: 2026-03-02-preview/ClusterMeshProfiles_Delete.json
 */
async function deleteAnClusterMeshProfileResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.clusterMeshProfiles.delete("rg1", "fleet1", "clustermeshprofile1");
}

async function main(): Promise<void> {
  await deleteAnClusterMeshProfileResource();
}

main().catch(console.error);
