// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates primary or secondary connection strings for the topic.
 *
 * @summary regenerates primary or secondary connection strings for the topic.
 * x-ms-original-file: 2025-05-01-preview/Topics/SBTopicAuthorizationRuleRegenerateKey.json
 */
async function topicAuthorizationRuleRegenerateKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e2f361f0-3b27-4503-a9cc-21cfba380093";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.topics.regenerateKeys(
    "Default-ServiceBus-WestUS",
    "sdk-Namespace8408",
    "sdk-Topics2075",
    "sdk-Authrules5067",
    { keyType: "PrimaryKey" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await topicAuthorizationRuleRegenerateKey();
}

main().catch(console.error);
