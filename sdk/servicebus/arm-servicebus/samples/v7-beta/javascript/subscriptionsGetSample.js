// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a subscription description for the specified topic.
 *
 * @summary returns a subscription description for the specified topic.
 * x-ms-original-file: 2025-05-01-preview/Subscriptions/SBSubscriptionGet.json
 */
async function subscriptionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.subscriptions.get(
    "ResourceGroup",
    "sdk-Namespace-1349",
    "sdk-Topics-8740",
    "sdk-Subscriptions-2178",
  );
  console.log(result);
}

async function main() {
  await subscriptionGet();
}

main().catch(console.error);
