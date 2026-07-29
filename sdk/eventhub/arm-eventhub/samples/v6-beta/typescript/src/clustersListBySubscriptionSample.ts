// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the available Event Hubs Clusters within an ARM resource group
 *
 * @summary lists the available Event Hubs Clusters within an ARM resource group
 * x-ms-original-file: 2026-01-01/Clusters/ClustersListBySubscription.json
 */
async function clustersListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await clustersListBySubscription();
}

main().catch(console.error);
