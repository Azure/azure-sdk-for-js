// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the tags of of a Service Fabric managed cluster resource with the specified name.
 *
 * @summary update the tags of of a Service Fabric managed cluster resource with the specified name.
 * x-ms-original-file: 2025-03-01-preview/ManagedClusterPatchOperation_example.json
 */
async function patchAManagedCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.managedClusters.update("resRg", "myCluster");
  console.log(result);
}

async function main(): Promise<void> {
  await patchAManagedCluster();
}

main().catch(console.error);
