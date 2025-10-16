// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of recent fault simulations for the node type.
 *
 * @summary gets the list of recent fault simulations for the node type.
 * x-ms-original-file: 2025-06-01-preview/faultSimulation/NodeTypeListFaultSimulation_example.json
 */
async function listNodeTypeFaultSimulation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeTypes.listFaultSimulation("resRg", "myCluster", "BE")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNodeTypeFaultSimulation();
}

main().catch(console.error);
