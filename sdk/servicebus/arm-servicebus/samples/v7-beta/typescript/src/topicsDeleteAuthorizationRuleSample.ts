// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a topic authorization rule.
 *
 * @summary deletes a topic authorization rule.
 * x-ms-original-file: 2025-05-01-preview/Topics/SBTopicAuthorizationRuleDelete.json
 */
async function topicAuthorizationRuleDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.topics.deleteAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-6261",
    "sdk-Topics-1984",
    "sdk-AuthRules-4310",
  );
}

async function main(): Promise<void> {
  await topicAuthorizationRuleDelete();
}

main().catch(console.error);
