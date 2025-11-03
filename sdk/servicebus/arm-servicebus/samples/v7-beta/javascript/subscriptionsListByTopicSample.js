// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the subscriptions under a specified topic.
 *
 * @summary list all the subscriptions under a specified topic.
 * x-ms-original-file: 2025-05-01-preview/Subscriptions/SBSubscriptionListByTopic.json
 */
async function subscriptionListByTopic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.subscriptions.listByTopic(
    "ResourceGroup",
    "sdk-Namespace-1349",
    "sdk-Topics-8740",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await subscriptionListByTopic();
}

main().catch(console.error);
