// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of the provided cluster manager.
 *
 * @summary get the properties of the provided cluster manager.
 * x-ms-original-file: 2026-05-01-preview/ClusterManagers_Get.json
 */
async function getClusterManager(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.clusterManagers.get("resourceGroupName", "clusterManagerName");
  console.log(result);
}

async function main(): Promise<void> {
  await getClusterManager();
}

main().catch(console.error);
