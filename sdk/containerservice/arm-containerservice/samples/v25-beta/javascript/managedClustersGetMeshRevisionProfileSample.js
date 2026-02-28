// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to contains extra metadata on the revision, including supported revisions, cluster compatibility and available upgrades
 *
 * @summary contains extra metadata on the revision, including supported revisions, cluster compatibility and available upgrades
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersGet_MeshRevisionProfile.json
 */
async function getAMeshRevisionProfileForAMeshMode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.getMeshRevisionProfile("location1", "istio");
  console.log(result);
}

async function main() {
  await getAMeshRevisionProfileForAMeshMode();
}

main().catch(console.error);
