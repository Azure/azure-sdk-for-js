// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Contains extra metadata on the revision, including supported revisions, cluster compatibility and available upgrades
 *
 * @summary Contains extra metadata on the revision, including supported revisions, cluster compatibility and available upgrades
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-05-02-preview/examples/ManagedClustersGet_MeshRevisionProfile.json
 */

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAMeshRevisionProfileForAMeshMode(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const location = "location1";
  const mode = "istio";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.getMeshRevisionProfile(
    location,
    mode,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAMeshRevisionProfileForAMeshMode();
}

main().catch(console.error);
