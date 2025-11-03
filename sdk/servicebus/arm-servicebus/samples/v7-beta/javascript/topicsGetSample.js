// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a description for the specified topic.
 *
 * @summary returns a description for the specified topic.
 * x-ms-original-file: 2025-05-01-preview/Topics/SBTopicGet.json
 */
async function topicGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.topics.get("ArunMonocle", "sdk-Namespace-1617", "sdk-Topics-5488");
  console.log(result);
}

async function main() {
  await topicGet();
}

main().catch(console.error);
