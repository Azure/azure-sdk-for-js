// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicesafeguards");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a deploymentSafeguard
 *
 * @summary creates or updates a deploymentSafeguard
 * x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_Create.json
 */
async function createsADeploymentSafeguardsResourceWithALongRunningOperation() {
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential);
  const result = await client.deploymentSafeguards.create(
    "subscriptions/subid1/resourceGroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster1",
    { properties: { level: "Warn", podSecurityStandardsLevel: "Baseline" } },
  );
  console.log(result);
}

async function main() {
  await createsADeploymentSafeguardsResourceWithALongRunningOperation();
}

main().catch(console.error);
