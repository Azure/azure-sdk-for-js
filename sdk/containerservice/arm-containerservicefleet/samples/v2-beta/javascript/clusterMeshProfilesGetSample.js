// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ClusterMeshProfile
 *
 * @summary get a ClusterMeshProfile
 * x-ms-original-file: 2026-03-02-preview/ClusterMeshProfiles_Get.json
 */
async function getAClusterMeshProfileResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.clusterMeshProfiles.get("rgfleets", "fleet1", "clustermeshprofile1");
  console.log(result);
}

async function main() {
  await getAClusterMeshProfileResource();
}

main().catch(console.error);
