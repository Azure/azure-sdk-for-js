// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists available upgrades for all service meshes in a specific cluster.
 *
 * @summary lists available upgrades for all service meshes in a specific cluster.
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersList_MeshUpgradeProfiles.json
 */
async function listsVersionCompatibilityAndUpgradeProfileForAllServiceMeshesInACluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusters.listMeshUpgradeProfiles("rg1", "clustername1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsVersionCompatibilityAndUpgradeProfileForAllServiceMeshesInACluster();
}

main().catch(console.error);
