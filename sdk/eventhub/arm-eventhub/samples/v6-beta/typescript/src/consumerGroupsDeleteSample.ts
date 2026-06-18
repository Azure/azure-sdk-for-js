// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a consumer group from the specified Event Hub and resource group.
 *
 * @summary deletes a consumer group from the specified Event Hub and resource group.
 * x-ms-original-file: 2026-01-01/ConsumerGroup/EHConsumerGroupDelete.json
 */
async function consumerGroupDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.consumerGroups.delete(
    "ArunMonocle",
    "sdk-Namespace-2661",
    "sdk-EventHub-6681",
    "sdk-ConsumerGroup-5563",
  );
}

async function main(): Promise<void> {
  await consumerGroupDelete();
}

main().catch(console.error);
