// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to accept subscription ownership.
 *
 * @summary accept subscription ownership.
 * x-ms-original-file: 2025-11-01-preview/acceptSubscriptionOwnership.json
 */
async function acceptOwnership(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  await client.subscription.acceptOwnership("291bba3f-e0a5-47bc-a099-3bdcb2a50a05", {
    properties: {
      displayName: "Test Subscription",
      tags: { tag1: "Messi", tag2: "Ronaldo", tag3: "Lebron" },
    },
  });
}

async function main(): Promise<void> {
  await acceptOwnership();
}

main().catch(console.error);
