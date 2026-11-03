// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the status of the pending Microsoft.Subscription API operations.
 *
 * @summary get the status of the pending Microsoft.Subscription API operations.
 * x-ms-original-file: 2025-11-01-preview/getSubscriptionOperation.json
 */
async function getPendingSubscriptionOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptionOperation.get("e4b8d068-f574-462a-a76f-6fa0afc613c9");
  console.log(result);
}

async function main(): Promise<void> {
  await getPendingSubscriptionOperations();
}

main().catch(console.error);
