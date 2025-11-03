// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates an authorization rule for a queue.
 *
 * @summary creates an authorization rule for a queue.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueAuthorizationRuleCreate.json
 */
async function queueAuthorizationRuleCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.queues.createOrUpdateAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-7982",
    "sdk-Queues-2317",
    "sdk-AuthRules-5800",
    { properties: { rights: ["Listen", "Send"] } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await queueAuthorizationRuleCreate();
}

main().catch(console.error);
