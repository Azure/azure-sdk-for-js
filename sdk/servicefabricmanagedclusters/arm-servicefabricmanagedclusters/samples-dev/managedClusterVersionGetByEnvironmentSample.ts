// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about an available Service Fabric cluster code version by environment.
 *
 * @summary gets information about an available Service Fabric cluster code version by environment.
 * x-ms-original-file: 2025-03-01-preview/ManagedClusterVersionGetByEnvironment_example.json
 */
async function getClusterVersionByEnvironment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.managedClusterVersion.getByEnvironment(
    "eastus",
    "Windows",
    "7.2.477.9590",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getClusterVersionByEnvironment();
}

main().catch(console.error);
