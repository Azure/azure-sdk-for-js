// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicesafeguards";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete DeploymentSafeguards
 *
 * @summary delete DeploymentSafeguards
 * x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_Delete.json
 */
async function deletesADeploymentSafeguardResourceAsynchronouslyWithALongRunningOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential);
  await client.deploymentSafeguards.delete(
    "subscriptions/subid1/resourceGroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster1",
  );
}

async function main(): Promise<void> {
  await deletesADeploymentSafeguardResourceAsynchronouslyWithALongRunningOperation();
}

main().catch(console.error);
