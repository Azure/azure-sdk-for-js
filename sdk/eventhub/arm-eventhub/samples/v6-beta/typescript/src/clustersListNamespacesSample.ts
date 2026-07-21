// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all Event Hubs Namespace IDs in an Event Hubs Dedicated Cluster.
 *
 * @summary list all Event Hubs Namespace IDs in an Event Hubs Dedicated Cluster.
 * x-ms-original-file: 2026-01-01/Clusters/ListNamespacesInClusterGet.json
 */
async function listNamespacesInCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.clusters.listNamespaces("myResourceGroup", "testCluster");
  console.log(result);
}

async function main(): Promise<void> {
  await listNamespacesInCluster();
}

main().catch(console.error);
