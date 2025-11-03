// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets authorization rules for a topic.
 *
 * @summary gets authorization rules for a topic.
 * x-ms-original-file: 2025-05-01-preview/Topics/SBTopicAuthorizationRuleListAll.json
 */
async function topicAuthorizationRuleListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.topics.listAuthorizationRules(
    "ArunMonocle",
    "sdk-Namespace-6261",
    "sdk-Topics-1984",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await topicAuthorizationRuleListAll();
}

main().catch(console.error);
