// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch properties of the provided cluster manager, or update the tags assigned to the cluster manager. Properties and tag updates can be done independently.
 *
 * @summary patch properties of the provided cluster manager, or update the tags assigned to the cluster manager. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-08-01-preview/ClusterManagers_Patch.json
 */
async function patchClusterManager(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusterManagers.update("resourceGroupName", "clusterManagerName", {
    clusterManagerUpdateParameters: {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity1":
            {},
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity2":
            {},
        },
      },
      properties: { rolloutRing: 3 },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to patch properties of the provided cluster manager, or update the tags assigned to the cluster manager. Properties and tag updates can be done independently.
 *
 * @summary patch properties of the provided cluster manager, or update the tags assigned to the cluster manager. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-08-01-preview/ClusterManagers_Patch_RolloutRing.json
 */
async function patchClusterManagerRolloutRing(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusterManagers.update("resourceGroupName", "clusterManagerName", {
    clusterManagerUpdateParameters: { properties: { rolloutRing: 2 } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchClusterManager();
  await patchClusterManagerRolloutRing();
}

main().catch(console.error);
