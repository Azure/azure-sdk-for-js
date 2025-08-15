// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all Event Hubs Namespace IDs in an Event Hubs Dedicated Cluster.
 *
 * @summary List all Event Hubs Namespace IDs in an Event Hubs Dedicated Cluster.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2018-01-01-preview/examples/Clusters/ListNamespacesInClusterGet.json
 */
async function listNamespacesInCluster(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName = process.env["EVENTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const clusterName = "testCluster";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.clusters.listNamespaces(resourceGroupName, clusterName);
  console.log(result);
}

async function main(): Promise<void> {
  await listNamespacesInCluster();
}

main().catch(console.error);
