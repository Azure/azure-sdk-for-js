// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to updates the tags of an application type resource of a given managed cluster.
 *
 * @summary updates the tags of an application type resource of a given managed cluster.
 * x-ms-original-file: 2025-03-01-preview/ApplicationTypeNamePatchOperation_example.json
 */

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

async function patchAnApplicationType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applicationTypes.update("resRg", "myCluster", "myAppType", {
    tags: { a: "b" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchAnApplicationType();
}

main().catch(console.error);
