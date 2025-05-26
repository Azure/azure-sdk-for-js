// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Service Fabric node type of a given managed cluster.
 *
 * @summary delete a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/NodeTypeDeleteOperation_example.json
 */
async function deleteANodeType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  await client.nodeTypes.delete("resRg", "myCluster", "BE");
}

async function main(): Promise<void> {
  await deleteANodeType();
}

main().catch(console.error);
