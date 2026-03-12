// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Accept subscription ownership.
 *
 * @summary Accept subscription ownership.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/acceptSubscriptionOwnership.json
 */
async function acceptOwnership() {
  const subscriptionId = "291bba3f-e0a5-47bc-a099-3bdcb2a50a05";
  const body = {
    properties: {
      displayName: "Test Subscription",
      managementGroupId: undefined,
      tags: { tag1: "Messi", tag2: "Ronaldo", tag3: "Lebron" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscription.beginAcceptOwnershipAndWait(subscriptionId, body);
  console.log(result);
}

async function main() {
  await acceptOwnership();
}

main().catch(console.error);
