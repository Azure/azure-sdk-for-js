// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all available code versions for Service Fabric cluster resources by environment.
 *
 * @summary gets all available code versions for Service Fabric cluster resources by environment.
 * x-ms-original-file: 2025-03-01-preview/ManagedClusterVersionListByEnvironment.json
 */
async function listClusterVersionsByEnvironment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.managedClusterVersion.listByEnvironment("eastus", "Windows");
  console.log(result);
}

async function main(): Promise<void> {
  await listClusterVersionsByEnvironment();
}

main().catch(console.error);
