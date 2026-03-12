// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the consumer groups in a Namespace. An empty feed is returned if no consumer group exists in the Namespace.
 *
 * @summary Gets all the consumer groups in a Namespace. An empty feed is returned if no consumer group exists in the Namespace.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/stable/2017-04-01/examples/ConsumerGroup/EHConsumerGroupListByEventHub.json
 */

import { EventHubManagementClient } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function consumerGroupsListAll(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName = process.env["EVENTHUB_RESOURCE_GROUP"] || "ArunMonocle";
  const namespaceName = "sdk-Namespace-2661";
  const eventHubName = "sdk-EventHub-6681";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.consumerGroups.listByEventHub(
    resourceGroupName,
    namespaceName,
    eventHubName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await consumerGroupsListAll();
}

main().catch(console.error);
