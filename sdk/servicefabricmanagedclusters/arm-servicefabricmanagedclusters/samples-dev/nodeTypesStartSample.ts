// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts one or more nodes on the node type. It will trigger an allocation of the fabric node if needed and activate them.
 *
 * @summary starts one or more nodes on the node type. It will trigger an allocation of the fabric node if needed and activate them.
 * x-ms-original-file: 2025-03-01-preview/StartNodes_example.json
 */
async function startNodes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  await client.nodeTypes.start("resRg", "myCluster", "BE");
}

async function main(): Promise<void> {
  await startNodes();
}

main().catch(console.error);
