// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the version of the provided cluster to one of the available supported versions.
 *
 * @summary update the version of the provided cluster to one of the available supported versions.
 * x-ms-original-file: 2026-05-01-preview/Clusters_UpdateVersion.json
 */
async function updateClusterVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.clusters.updateVersion("resourceGroupName", "clusterName", {
    safeguardMode: "All",
    targetClusterVersion: "2.0",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateClusterVersion();
}

main().catch(console.error);
