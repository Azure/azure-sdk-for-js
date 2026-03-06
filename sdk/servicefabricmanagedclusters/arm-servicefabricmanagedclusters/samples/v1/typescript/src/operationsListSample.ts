// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the list of available Service Fabric resource provider API operations.
 *
 * @summary get the list of available Service Fabric resource provider API operations.
 * x-ms-original-file: 2026-02-01/OperationsList_example.json
 */
async function listTheOperationsForTheProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricManagedClustersManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheOperationsForTheProvider();
}

main().catch(console.error);
