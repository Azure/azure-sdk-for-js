// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an authorization rule for the specified topic.
 *
 * @summary creates an authorization rule for the specified topic.
 * x-ms-original-file: 2025-05-01-preview/Topics/SBTopicAuthorizationRuleCreate.json
 */
async function topicAuthorizationRuleCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.topics.createOrUpdateAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-6261",
    "sdk-Topics-1984",
    "sdk-AuthRules-4310",
    { properties: { rights: ["Listen", "Send"] } },
  );
  console.log(result);
}

async function main() {
  await topicAuthorizationRuleCreate();
}

main().catch(console.error);
