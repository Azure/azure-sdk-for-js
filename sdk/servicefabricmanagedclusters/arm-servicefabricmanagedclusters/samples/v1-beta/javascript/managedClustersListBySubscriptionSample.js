// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all Service Fabric cluster resources created or in the process of being created in the subscription.
 *
 * @summary gets all Service Fabric cluster resources created or in the process of being created in the subscription.
 * x-ms-original-file: 2025-10-01-preview/ManagedClusterListBySubscriptionOperation_example.json
 */
async function listManagedClusters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedClusters();
}

main().catch(console.error);
