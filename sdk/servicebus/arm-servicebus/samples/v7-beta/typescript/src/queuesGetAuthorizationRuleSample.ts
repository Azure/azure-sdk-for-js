// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an authorization rule for a queue by rule name.
 *
 * @summary gets an authorization rule for a queue by rule name.
 * x-ms-original-file: 2025-05-01-preview/Queues/SBQueueAuthorizationRuleGet.json
 */
async function queueAuthorizationRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.queues.getAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-7982",
    "sdk-Queues-2317",
    "sdk-AuthRules-5800",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await queueAuthorizationRuleGet();
}

main().catch(console.error);
