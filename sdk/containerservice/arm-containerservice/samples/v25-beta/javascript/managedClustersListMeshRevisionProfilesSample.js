// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to contains extra metadata on each revision, including supported revisions, cluster compatibility and available upgrades
 *
 * @summary contains extra metadata on each revision, including supported revisions, cluster compatibility and available upgrades
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersList_MeshRevisionProfiles.json
 */
async function listMeshRevisionProfilesInALocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusters.listMeshRevisionProfiles("location1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMeshRevisionProfilesInALocation();
}

main().catch(console.error);
