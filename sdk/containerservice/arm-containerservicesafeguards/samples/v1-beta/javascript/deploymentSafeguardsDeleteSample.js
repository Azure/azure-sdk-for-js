// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicesafeguards");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete DeploymentSafeguards
 *
 * @summary delete DeploymentSafeguards
 * x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_Delete.json
 */
async function deletesADeploymentSafeguardResourceAsynchronouslyWithALongRunningOperation() {
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential);
  await client.deploymentSafeguards.delete(
    "subscriptions/subid1/resourceGroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster1",
  );
}

async function main() {
  await deletesADeploymentSafeguardResourceAsynchronouslyWithALongRunningOperation();
}

main().catch(console.error);
