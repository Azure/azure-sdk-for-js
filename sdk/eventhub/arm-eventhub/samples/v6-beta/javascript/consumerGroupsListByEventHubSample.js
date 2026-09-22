// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the consumer groups in a Namespace. An empty feed is returned if no consumer group exists in the Namespace.
 *
 * @summary gets all the consumer groups in a Namespace. An empty feed is returned if no consumer group exists in the Namespace.
 * x-ms-original-file: 2026-01-01/ConsumerGroup/EHConsumerGroupListByEventHub.json
 */
async function consumerGroupsListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.consumerGroups.listByEventHub(
    "ArunMonocle",
    "sdk-Namespace-2661",
    "sdk-EventHub-6681",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await consumerGroupsListAll();
}

main().catch(console.error);
