// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Accept subscription ownership status.
 *
 * @summary Accept subscription ownership status.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/acceptOwnershipStatus.json
 */
async function acceptOwnershipStatus() {
  const subscriptionId = "291bba3f-e0a5-47bc-a099-3bdcb2a50a05";
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscription.acceptOwnershipStatus(subscriptionId);
  console.log(result);
}

async function main() {
  await acceptOwnershipStatus();
}

main().catch(console.error);
