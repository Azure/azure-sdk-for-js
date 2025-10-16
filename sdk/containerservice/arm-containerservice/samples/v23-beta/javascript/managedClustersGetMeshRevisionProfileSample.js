// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Contains extra metadata on the revision, including supported revisions, cluster compatibility and available upgrades
 *
 * @summary Contains extra metadata on the revision, including supported revisions, cluster compatibility and available upgrades
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/ManagedClustersGet_MeshRevisionProfile.json
 */
async function getAMeshRevisionProfileForAMeshMode() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "location1";
  const mode = "istio";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.getMeshRevisionProfile(location, mode);
  console.log(result);
}

async function main() {
  await getAMeshRevisionProfileForAMeshMode();
}

main().catch(console.error);
