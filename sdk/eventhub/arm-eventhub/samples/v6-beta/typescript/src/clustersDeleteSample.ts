// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Event Hubs Cluster. This operation is idempotent.
 *
 * @summary deletes an existing Event Hubs Cluster. This operation is idempotent.
 * x-ms-original-file: 2026-01-01/Clusters/ClusterDelete.json
 */
async function clusterDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.clusters.delete("myResourceGroup", "testCluster");
}

async function main(): Promise<void> {
  await clusterDelete();
}

main().catch(console.error);
