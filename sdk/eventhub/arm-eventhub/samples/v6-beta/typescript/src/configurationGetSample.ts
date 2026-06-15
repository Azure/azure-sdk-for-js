// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all Event Hubs Cluster settings - a collection of key/value pairs which represent the quotas and settings imposed on the cluster.
 *
 * @summary get all Event Hubs Cluster settings - a collection of key/value pairs which represent the quotas and settings imposed on the cluster.
 * x-ms-original-file: 2026-01-01/Clusters/ClusterQuotaConfigurationGet.json
 */
async function clustersQuotasConfigurationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.configuration.get("myResourceGroup", "testCluster");
  console.log(result);
}

async function main(): Promise<void> {
  await clustersQuotasConfigurationGet();
}

main().catch(console.error);
