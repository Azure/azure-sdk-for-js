// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about an available Service Fabric managed cluster code version.
 *
 * @summary gets information about an available Service Fabric managed cluster code version.
 * x-ms-original-file: 2025-03-01-preview/ManagedClusterVersionGet_example.json
 */
async function getClusterVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.managedClusterVersion.get("eastus", "7.2.477.9590");
  console.log(result);
}

async function main(): Promise<void> {
  await getClusterVersion();
}

main().catch(console.error);
