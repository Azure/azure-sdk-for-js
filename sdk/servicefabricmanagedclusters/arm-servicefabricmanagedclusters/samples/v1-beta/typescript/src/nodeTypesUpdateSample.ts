// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the configuration of a node type of a given managed cluster, only updating tags or capacity.
 *
 * @summary update the configuration of a node type of a given managed cluster, only updating tags or capacity.
 * x-ms-original-file: 2025-10-01-preview/NodeTypePatchOperationAutoScale_example.json
 */
async function patchANodeTypeWhileAutoScaling(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.update("resRg", "myCluster", "BE", {
    sku: { name: "Standard_S0", capacity: 10, tier: "Standard" },
    tags: { a: "b" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update the configuration of a node type of a given managed cluster, only updating tags or capacity.
 *
 * @summary update the configuration of a node type of a given managed cluster, only updating tags or capacity.
 * x-ms-original-file: 2025-10-01-preview/NodeTypePatchOperation_example.json
 */
async function patchANodeType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.update("resRg", "myCluster", "BE", {
    tags: { a: "b" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchANodeTypeWhileAutoScaling();
  await patchANodeType();
}

main().catch(console.error);
