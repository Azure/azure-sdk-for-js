// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts one or more nodes on the node type. It will trigger an allocation of the fabric node if needed and activate them.
 *
 * @summary starts one or more nodes on the node type. It will trigger an allocation of the fabric node if needed and activate them.
 * x-ms-original-file: 2025-10-01-preview/StartNodes_example.json
 */
async function startNodes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.nodeTypes.start("resRg", "myCluster", "BE", {
    nodes: ["BE_0", "BE_1"],
  });
}

async function main(): Promise<void> {
  await startNodes();
}

main().catch(console.error);
