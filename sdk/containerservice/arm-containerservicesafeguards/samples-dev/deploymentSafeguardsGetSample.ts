// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicesafeguards";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetch a deployment safeguard by name
 *
 * @summary fetch a deployment safeguard by name
 * x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_Get.json
 */
async function getsADeploymentSafeguardResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential);
  const result = await client.deploymentSafeguards.get(
    "subscriptions/subid1/resourceGroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsADeploymentSafeguardResource();
}

main().catch(console.error);
