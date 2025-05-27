// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to action to get Az Resiliency Status of all the Base resources constituting Service Fabric Managed Clusters.
 *
 * @summary action to get Az Resiliency Status of all the Base resources constituting Service Fabric Managed Clusters.
 * x-ms-original-file: 2025-03-01-preview/managedAzResiliencyStatusGet_example.json
 */
async function azResiliencyStatusOfBaseResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.managedAzResiliencyStatus.get("resourceGroup1", "mycluster1");
  console.log(result);
}

async function main(): Promise<void> {
  await azResiliencyStatusOfBaseResources();
}

main().catch(console.error);
