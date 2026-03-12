// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicesafeguards");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetch a deployment safeguard by name
 *
 * @summary fetch a deployment safeguard by name
 * x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_Get.json
 */
async function getsADeploymentSafeguardResource() {
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential);
  const result = await client.deploymentSafeguards.get(
    "subscriptions/subid1/resourceGroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster1",
  );
  console.log(result);
}

async function main() {
  await getsADeploymentSafeguardResource();
}

main().catch(console.error);
