// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a topic in the specified namespace.
 *
 * @summary creates a topic in the specified namespace.
 * x-ms-original-file: 2025-05-01-preview/Topics/SBTopicCreate.json
 */
async function topicCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.topics.createOrUpdate(
    "ArunMonocle",
    "sdk-Namespace-1617",
    "sdk-Topics-5488",
    { properties: { enableExpress: true } },
  );
  console.log(result);
}

async function main() {
  await topicCreate();
}

main().catch(console.error);
