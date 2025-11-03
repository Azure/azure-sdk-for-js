// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a queue from the specified namespace in a resource group.
 *
 * @summary deletes a queue from the specified namespace in a resource group.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueDelete.json
 */
async function queueDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.queues.delete("ArunMonocle", "sdk-Namespace-183", "sdk-Queues-8708");
}

async function main(): Promise<void> {
  await queueDelete();
}

main().catch(console.error);
