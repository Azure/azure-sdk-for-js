// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets available upgrades for a service mesh in a cluster.
 *
 * @summary Gets available upgrades for a service mesh in a cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/ManagedClustersGet_MeshUpgradeProfile.json
 */
async function getsVersionCompatibilityAndUpgradeProfileForAServiceMeshInACluster() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const mode = "istio";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.getMeshUpgradeProfile(
    resourceGroupName,
    resourceName,
    mode,
  );
  console.log(result);
}

async function main() {
  await getsVersionCompatibilityAndUpgradeProfileForAServiceMeshInACluster();
}

main().catch(console.error);
