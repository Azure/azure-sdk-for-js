// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a queue authorization rule.
 *
 * @summary deletes a queue authorization rule.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueAuthorizationRuleDelete.json
 */
async function queueAuthorizationRuleDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.queues.deleteAuthorizationRule(
    "ArunMonocle",
    "sdk-namespace-7982",
    "sdk-Queues-2317",
    "sdk-AuthRules-5800",
  );
}

async function main(): Promise<void> {
  await queueAuthorizationRuleDelete();
}

main().catch(console.error);
