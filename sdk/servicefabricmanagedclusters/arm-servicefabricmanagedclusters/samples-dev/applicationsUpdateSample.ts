// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the tags of an application resource of a given managed cluster.
 *
 * @summary updates the tags of an application resource of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/ApplicationPatchOperation_example.json
 */
async function patchAnApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.applications.update("resRg", "myCluster", "myApp");
  console.log(result);
}

async function main(): Promise<void> {
  await patchAnApplication();
}

main().catch(console.error);
