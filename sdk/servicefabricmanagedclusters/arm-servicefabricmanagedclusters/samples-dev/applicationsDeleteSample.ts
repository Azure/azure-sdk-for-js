// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Service Fabric managed application resource with the specified name.
 *
 * @summary delete a Service Fabric managed application resource with the specified name.
 * x-ms-original-file: 2025-03-01-preview/ApplicationDeleteOperation_example.json
 */
async function deleteAnApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  await client.applications.delete("resRg", "myCluster", "myApp");
}

async function main(): Promise<void> {
  await deleteAnApplication();
}

main().catch(console.error);
