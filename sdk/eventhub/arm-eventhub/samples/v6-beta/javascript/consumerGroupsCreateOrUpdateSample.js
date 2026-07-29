// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Event Hubs consumer group as a nested resource within a Namespace.
 *
 * @summary creates or updates an Event Hubs consumer group as a nested resource within a Namespace.
 * x-ms-original-file: 2026-01-01/ConsumerGroup/EHConsumerGroupCreate.json
 */
async function consumerGroupCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.consumerGroups.createOrUpdate(
    "ArunMonocle",
    "sdk-Namespace-2661",
    "sdk-EventHub-6681",
    "sdk-ConsumerGroup-5563",
    { userMetadata: "New consumergroup" },
  );
  console.log(result);
}

async function main() {
  await consumerGroupCreate();
}

main().catch(console.error);
