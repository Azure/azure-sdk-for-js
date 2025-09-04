// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicesafeguards");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DeploymentSafeguards by parent resource
 *
 * @summary list DeploymentSafeguards by parent resource
 * x-ms-original-file: 2025-05-02-preview/DeploymentSafeguards_List.json
 */
async function listsDeploymentSafeguardsByParentResource() {
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

async function main() {
  await listsDeploymentSafeguardsByParentResource();
}

main().catch(console.error);
