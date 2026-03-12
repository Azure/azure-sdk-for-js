// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a description for the specified consumer group.
 *
 * @summary Gets a description for the specified consumer group.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/stable/2017-04-01/examples/ConsumerGroup/EHConsumerGroupGet.json
 */

import { EventHubManagementClient } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function consumerGroupGet(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName = process.env["EVENTHUB_RESOURCE_GROUP"] || "ArunMonocle";
  const namespaceName = "sdk-Namespace-2661";
  const eventHubName = "sdk-EventHub-6681";
  const consumerGroupName = "sdk-ConsumerGroup-5563";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.consumerGroups.get(
    resourceGroupName,
    namespaceName,
    eventHubName,
    consumerGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await consumerGroupGet();
}

main().catch(console.error);
