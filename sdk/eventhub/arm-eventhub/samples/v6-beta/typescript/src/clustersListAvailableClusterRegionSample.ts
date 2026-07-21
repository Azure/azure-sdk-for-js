// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the quantity of available pre-provisioned Event Hubs Clusters, indexed by Azure region.
 *
 * @summary list the quantity of available pre-provisioned Event Hubs Clusters, indexed by Azure region.
 * x-ms-original-file: 2026-01-01/Clusters/ListAvailableClustersGet.json
 */
async function listAvailableClusters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.clusters.listAvailableClusterRegion();
  console.log(result);
}

async function main(): Promise<void> {
  await listAvailableClusters();
}

main().catch(console.error);
