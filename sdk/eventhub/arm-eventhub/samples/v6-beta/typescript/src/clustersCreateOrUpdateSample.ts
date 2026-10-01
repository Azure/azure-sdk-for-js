// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an instance of an Event Hubs Cluster.
 *
 * @summary creates or updates an instance of an Event Hubs Cluster.
 * x-ms-original-file: 2026-01-01/Clusters/ClusterPut.json
 */
async function clusterPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate("myResourceGroup", "testCluster", {
    location: "South Central US",
    sku: { name: "Dedicated", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await clusterPut();
}

main().catch(console.error);
