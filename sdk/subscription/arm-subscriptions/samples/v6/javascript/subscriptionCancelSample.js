// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation to cancel a subscription
 *
 * @summary The operation to cancel a subscription
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/cancelSubscription.json
 */
async function cancelSubscription() {
  const subscriptionId = "83aa47df-e3e9-49ff-877b-94304bf3d3ad";
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscription.cancel(subscriptionId);
  console.log(result);
}

async function main() {
  await cancelSubscription();
}

main().catch(console.error);
