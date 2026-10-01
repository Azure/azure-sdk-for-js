// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to modifies mutable properties on the Event Hubs Cluster. This operation is idempotent.
 *
 * @summary modifies mutable properties on the Event Hubs Cluster. This operation is idempotent.
 * x-ms-original-file: 2026-01-01/Clusters/ClusterPatch.json
 */
async function clusterPatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.clusters.update("myResourceGroup", "testCluster", {
    location: "South Central US",
    tags: { tag3: "value3", tag4: "value4" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await clusterPatch();
}

main().catch(console.error);
