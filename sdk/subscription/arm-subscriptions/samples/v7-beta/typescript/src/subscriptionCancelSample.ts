// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to cancel a subscription
 *
 * @summary the operation to cancel a subscription
 * x-ms-original-file: 2025-11-01-preview/cancelSubscription.json
 */
async function cancelSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscription.cancel("83aa47df-e3e9-49ff-877b-94304bf3d3ad");
  console.log(result);
}

async function main(): Promise<void> {
  await cancelSubscription();
}

main().catch(console.error);
