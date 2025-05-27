// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the tags of a service resource of a given managed cluster.
 *
 * @summary updates the tags of a service resource of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/ServicePatchOperation_example.json
 */
async function patchAService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.services.update("resRg", "myCluster", "myApp", "myService");
  console.log(result);
}

async function main(): Promise<void> {
  await patchAService();
}

main().catch(console.error);
