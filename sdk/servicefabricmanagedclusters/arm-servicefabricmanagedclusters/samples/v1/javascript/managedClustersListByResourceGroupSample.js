// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all Service Fabric cluster resources created or in the process of being created in the resource group.
 *
 * @summary gets all Service Fabric cluster resources created or in the process of being created in the resource group.
 * x-ms-original-file: 2026-02-01/ManagedClusterListByResourceGroupOperation_example.json
 */
async function listClusterByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusters.listByResourceGroup("resRg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listClusterByResourceGroup();
}

main().catch(console.error);
