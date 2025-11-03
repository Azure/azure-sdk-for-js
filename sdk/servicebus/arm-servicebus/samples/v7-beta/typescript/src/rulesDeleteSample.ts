// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing rule.
 *
 * @summary deletes an existing rule.
 * x-ms-original-file: 2025-05-01-preview/Rules/RuleDelete.json
 */
async function rulesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.rules.delete(
    "ArunMonocle",
    "sdk-Namespace-1319",
    "sdk-Topics-2081",
    "sdk-Subscriptions-8691",
    "sdk-Rules-6571",
  );
}

async function main(): Promise<void> {
  await rulesDelete();
}

main().catch(console.error);
