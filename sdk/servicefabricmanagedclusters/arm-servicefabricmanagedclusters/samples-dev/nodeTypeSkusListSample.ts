// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Service Fabric node type supported SKUs.
 *
 * @summary get a Service Fabric node type supported SKUs.
 * x-ms-original-file: 2025-03-01-preview/NodeTypeSkusListOperation_example.json
 */
async function listANodeTypeSKUs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeTypeSkus.list("resRg", "myCluster", "BE")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listANodeTypeSKUs();
}

main().catch(console.error);
