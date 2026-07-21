// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagementClient } from "@azure/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all available code versions for Service Fabric cluster resources by location.
 *
 * @summary gets all available code versions for Service Fabric cluster resources by location.
 * x-ms-original-file: 2026-03-01-preview/ClusterVersionsList_example.json
 */
async function listClusterVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusterVersions.list("eastus");
  console.log(result);
}

async function main(): Promise<void> {
  await listClusterVersions();
}

main().catch(console.error);
