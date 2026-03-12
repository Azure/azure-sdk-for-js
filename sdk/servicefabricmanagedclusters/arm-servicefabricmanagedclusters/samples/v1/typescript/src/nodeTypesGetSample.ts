// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Service Fabric node type of a given managed cluster.
 *
 * @summary get a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2026-02-01/NodeTypeGetOperation_example.json
 */
async function getANodeType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.get("resRg", "myCluster", "FE");
  console.log(result);
}

async function main(): Promise<void> {
  await getANodeType();
}

main().catch(console.error);
