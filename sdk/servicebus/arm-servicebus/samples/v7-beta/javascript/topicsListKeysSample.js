// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the primary and secondary connection strings for the topic.
 *
 * @summary gets the primary and secondary connection strings for the topic.
 * x-ms-original-file: 2025-05-01-preview/Topics/SBTopicAuthorizationRuleListKey.json
 */
async function topicAuthorizationRuleListKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e2f361f0-3b27-4503-a9cc-21cfba380093";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.topics.listKeys(
    "Default-ServiceBus-WestUS",
    "sdk-Namespace8408",
    "sdk-Topics2075",
    "sdk-Authrules5067",
  );
  console.log(result);
}

async function main() {
  await topicAuthorizationRuleListKey();
}

main().catch(console.error);
