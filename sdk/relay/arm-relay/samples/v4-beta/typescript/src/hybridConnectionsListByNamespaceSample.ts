// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the hybrid connection within the namespace.
 *
 * @summary lists the hybrid connection within the namespace.
 * x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionListAll.json
 */
async function relayHybridConnectionListAll(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hybridConnections.listByNamespace(
    "resourcegroup",
    "example-RelayNamespace-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await relayHybridConnectionListAll();
}

main().catch(console.error);
