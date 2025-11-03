// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a queue from the specified namespace in a resource group.
 *
 * @summary deletes a queue from the specified namespace in a resource group.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueDelete.json
 */
async function queueDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.queues.delete("ArunMonocle", "sdk-Namespace-183", "sdk-Queues-8708");
}

async function main() {
  await queueDelete();
}

main().catch(console.error);
