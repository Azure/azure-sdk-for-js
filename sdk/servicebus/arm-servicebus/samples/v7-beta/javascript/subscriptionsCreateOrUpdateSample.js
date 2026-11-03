// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a topic subscription.
 *
 * @summary creates a topic subscription.
 * x-ms-original-file: 2026-01-01/Subscriptions/SBSubscriptionCreate.json
 */
async function subscriptionCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.subscriptions.createOrUpdate(
    "ResourceGroup",
    "sdk-Namespace-1349",
    "sdk-Topics-8740",
    "sdk-Subscriptions-2178",
    { enableBatchedOperations: true },
  );
  console.log(result);
}

async function main() {
  await subscriptionCreate();
}

main().catch(console.error);
