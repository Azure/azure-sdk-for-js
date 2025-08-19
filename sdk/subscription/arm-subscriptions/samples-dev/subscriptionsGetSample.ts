// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets details about a specified subscription.
 *
 * @summary Gets details about a specified subscription.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2016-06-01/examples/getSubscription.json
 */

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

async function getSubscription(): Promise<void> {
  const subscriptionId = "83aa47df-e3e9-49ff-877b-94304bf3d3ad";
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptions.get(subscriptionId);
  console.log(result);
}

getSubscription().catch(console.error);
