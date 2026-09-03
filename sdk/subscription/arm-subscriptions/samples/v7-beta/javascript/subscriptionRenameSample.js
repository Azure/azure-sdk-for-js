// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to rename a subscription
 *
 * @summary the operation to rename a subscription
 * x-ms-original-file: 2025-11-01-preview/renameSubscription.json
 */
async function renameSubscription() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscription.rename("83aa47df-e3e9-49ff-877b-94304bf3d3ad", {
    subscriptionName: "Test Sub",
  });
  console.log(result);
}

async function main() {
  await renameSubscription();
}

main().catch(console.error);
