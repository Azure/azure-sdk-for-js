// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a description for the specified queue.
 *
 * @summary returns a description for the specified queue.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueGet.json
 */
async function queueGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.queues.get("ArunMonocle", "sdk-Namespace-3174", "sdk-Queues-5647");
  console.log(result);
}

async function main() {
  await queueGet();
}

main().catch(console.error);
