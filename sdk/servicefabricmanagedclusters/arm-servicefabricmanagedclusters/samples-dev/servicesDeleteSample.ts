// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Service Fabric managed service resource with the specified name.
 *
 * @summary delete a Service Fabric managed service resource with the specified name.
 * x-ms-original-file: 2025-03-01-preview/ServiceDeleteOperation_example.json
 */
async function deleteAService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  await client.services.delete("resRg", "myCluster", "myApp", "myService");
}

async function main(): Promise<void> {
  await deleteAService();
}

main().catch(console.error);
