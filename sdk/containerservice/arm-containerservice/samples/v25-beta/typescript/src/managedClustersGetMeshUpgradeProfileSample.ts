// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets available upgrades for a service mesh in a cluster.
 *
 * @summary gets available upgrades for a service mesh in a cluster.
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersGet_MeshUpgradeProfile.json
 */
async function getsVersionCompatibilityAndUpgradeProfileForAServiceMeshInACluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.getMeshUpgradeProfile("rg1", "clustername1", "istio");
  console.log(result);
}

async function main(): Promise<void> {
  await getsVersionCompatibilityAndUpgradeProfileForAServiceMeshInACluster();
}

main().catch(console.error);
