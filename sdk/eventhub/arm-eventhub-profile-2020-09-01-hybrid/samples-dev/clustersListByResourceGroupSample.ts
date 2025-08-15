// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the available Event Hubs Clusters within an ARM resource group
 *
 * @summary Lists the available Event Hubs Clusters within an ARM resource group
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2018-01-01-preview/examples/Clusters/ClustersListByResourceGroup.json
 */
async function clustersListByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName = process.env["EVENTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await clustersListByResourceGroup();
}

main().catch(console.error);
