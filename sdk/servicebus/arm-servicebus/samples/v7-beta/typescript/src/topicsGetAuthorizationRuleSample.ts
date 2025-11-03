// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the specified authorization rule.
 *
 * @summary returns the specified authorization rule.
 * x-ms-original-file: 2025-05-01-preview/Topics/SBTopicAuthorizationRuleGet.json
 */
async function topicAuthorizationRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.topics.getAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-6261",
    "sdk-Topics-1984",
    "sdk-AuthRules-4310",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await topicAuthorizationRuleGet();
}

main().catch(console.error);
