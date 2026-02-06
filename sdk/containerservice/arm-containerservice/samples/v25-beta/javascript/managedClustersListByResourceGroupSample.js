// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists managed clusters in the specified subscription and resource group.
 *
 * @summary lists managed clusters in the specified subscription and resource group.
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersListByResourceGroup.json
 */
async function getManagedClustersByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusters.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getManagedClustersByResourceGroup();
}

main().catch(console.error);
