// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagementClient } from "@azure/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the list of available Service Fabric resource provider API operations.
 *
 * @summary get the list of available Service Fabric resource provider API operations.
 * x-ms-original-file: 2026-03-01-preview/Operations_example.json
 */
async function listAvailableOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAvailableOperations();
}

main().catch(console.error);
