// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to applies the cluster mesh profile to selected fleet members.
 *
 * @summary applies the cluster mesh profile to selected fleet members.
 * x-ms-original-file: 2026-03-02-preview/ClusterMeshProfiles_Apply.json
 */
async function applyAClusterMeshProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.clusterMeshProfiles.apply(
    "rgfleets",
    "fleet1",
    "clustermeshprofile1",
  );
  console.log(result);
}

async function main() {
  await applyAClusterMeshProfile();
}

main().catch(console.error);
