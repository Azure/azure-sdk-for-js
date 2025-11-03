// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Service Bus queue. This operation is idempotent.
 *
 * @summary creates or updates a Service Bus queue. This operation is idempotent.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueCreate.json
 */
async function queueCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.queues.createOrUpdate(
    "ArunMonocle",
    "sdk-Namespace-3174",
    "sdk-Queues-5647",
    { properties: { enablePartitioning: true } },
  );
  console.log(result);
}

async function main() {
  await queueCreate();
}

main().catch(console.error);
