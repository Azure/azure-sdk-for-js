// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicesafeguards";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a deploymentSafeguard
 *
 * @summary creates or updates a deploymentSafeguard
 * x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_Create.json
 */
async function createsADeploymentSafeguardsResourceWithALongRunningOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential);
  const result = await client.deploymentSafeguards.create(
    "subscriptions/subid1/resourceGroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster1",
    { properties: { level: "Warn", podSecurityStandardsLevel: "Baseline" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsADeploymentSafeguardsResourceWithALongRunningOperation();
}

main().catch(console.error);
