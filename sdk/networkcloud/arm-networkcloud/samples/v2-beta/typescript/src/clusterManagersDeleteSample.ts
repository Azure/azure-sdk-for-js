// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the provided cluster manager.
 *
 * @summary delete the provided cluster manager.
 * x-ms-original-file: 2026-05-01-preview/ClusterManagers_Delete.json
 */
async function deleteClusterManager(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.clusterManagers.delete("resourceGroupName", "clusterManagerName");
  console.log(result);
}

async function main(): Promise<void> {
  await deleteClusterManager();
}

main().catch(console.error);
