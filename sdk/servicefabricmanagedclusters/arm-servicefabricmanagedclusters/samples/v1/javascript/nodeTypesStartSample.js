// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts one or more nodes on the node type. It will trigger an allocation of the fabric node if needed and activate them.
 *
 * @summary starts one or more nodes on the node type. It will trigger an allocation of the fabric node if needed and activate them.
 * x-ms-original-file: 2026-02-01/StartNodes_example.json
 */
async function startNodes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.nodeTypes.start("resRg", "myCluster", "BE", { nodes: ["BE_0", "BE_1"] });
}

async function main() {
  await startNodes();
}

main().catch(console.error);
