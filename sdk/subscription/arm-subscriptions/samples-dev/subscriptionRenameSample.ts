// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to rename a subscription
 *
 * @summary The operation to rename a subscription
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/renameSubscription.json
 */

import type { SubscriptionName } from "@azure/arm-subscriptions";
import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

async function renameSubscription(): Promise<void> {
  const subscriptionId = "83aa47df-e3e9-49ff-877b-94304bf3d3ad";
  const body: SubscriptionName = { subscriptionName: "Test Sub" };
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptionOperations.rename(subscriptionId, body);
  console.log(result);
}

renameSubscription().catch(console.error);
