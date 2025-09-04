// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicesafeguards";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DeploymentSafeguards by parent resource
 *
 * @summary list DeploymentSafeguards by parent resource
 * x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_List.json
 */
async function listsDeploymentSafeguardsByParentResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential);
  const resArray = new Array();
  for await (const item of client.deploymentSafeguards.list(
    "subscriptions/subid1/resourceGroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsDeploymentSafeguardsByParentResource();
}

main().catch(console.error);
