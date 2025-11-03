// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a topic from the specified namespace and resource group.
 *
 * @summary deletes a topic from the specified namespace and resource group.
 * x-ms-original-file: 2025-05-01-preview/Topics/SBTopicDelete.json
 */
async function topicDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.topics.delete("ArunMonocle", "sdk-Namespace-1617", "sdk-Topics-5488");
}

async function main(): Promise<void> {
  await topicDelete();
}

main().catch(console.error);
