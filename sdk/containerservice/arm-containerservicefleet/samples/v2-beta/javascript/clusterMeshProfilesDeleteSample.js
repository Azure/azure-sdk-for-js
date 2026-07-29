// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ClusterMeshProfile
 *
 * @summary delete a ClusterMeshProfile
 * x-ms-original-file: 2026-03-02-preview/ClusterMeshProfiles_Delete.json
 */
async function deleteAnClusterMeshProfileResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.clusterMeshProfiles.delete("rg1", "fleet1", "clustermeshprofile1");
}

async function main() {
  await deleteAnClusterMeshProfileResource();
}

main().catch(console.error);
