// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Service Fabric node type of a given managed cluster.
 *
 * @summary get a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/NodeTypeGetOperation_example.json
 */
async function getANodeType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.nodeTypes.get("resRg", "myCluster", "FE");
  console.log(result);
}

async function main(): Promise<void> {
  await getANodeType();
}

main().catch(console.error);
