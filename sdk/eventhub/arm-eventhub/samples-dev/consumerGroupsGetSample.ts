// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a description for the specified consumer group.
 *
 * @summary gets a description for the specified consumer group.
 * x-ms-original-file: 2026-01-01/ConsumerGroup/EHConsumerGroupGet.json
 */
async function consumerGroupGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.consumerGroups.get(
    "ArunMonocle",
    "sdk-Namespace-2661",
    "sdk-EventHub-6681",
    "sdk-ConsumerGroup-5563",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await consumerGroupGet();
}

main().catch(console.error);
