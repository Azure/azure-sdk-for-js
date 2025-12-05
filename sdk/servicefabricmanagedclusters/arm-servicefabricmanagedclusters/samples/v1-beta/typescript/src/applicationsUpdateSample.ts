// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an application resource of a given managed cluster.
 *
 * @summary updates an application resource of a given managed cluster.
 * x-ms-original-file: 2025-10-01-preview/ApplicationPatchOperation_example.json
 */
async function patchAnApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applications.update("resRg", "myCluster", "myApp", {
    tags: { a: "b" },
    properties: { parameters: { param1: "value1", param2: "value2" } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchAnApplication();
}

main().catch(console.error);
