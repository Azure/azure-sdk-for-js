// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of recent fault simulations for the cluster.
 *
 * @summary gets the list of recent fault simulations for the cluster.
 * x-ms-original-file: 2025-10-01-preview/faultSimulation/ManagedClusterListFaultSimulation_example.json
 */
async function listManagedClusterFaultSimulation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusters.listFaultSimulation("resRg", "myCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedClusterFaultSimulation();
}

main().catch(console.error);
