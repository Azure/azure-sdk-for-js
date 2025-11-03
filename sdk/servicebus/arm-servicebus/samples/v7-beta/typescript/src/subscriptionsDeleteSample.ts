// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a subscription from the specified topic.
 *
 * @summary deletes a subscription from the specified topic.
 * x-ms-original-file: 2025-05-01-preview/Subscriptions/SBSubscriptionDelete.json
 */
async function subscriptionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.subscriptions.delete(
    "ResourceGroup",
    "sdk-Namespace-5882",
    "sdk-Topics-1804",
    "sdk-Subscriptions-3670",
  );
}

async function main(): Promise<void> {
  await subscriptionDelete();
}

main().catch(console.error);
