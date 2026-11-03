// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to accept subscription ownership status.
 *
 * @summary accept subscription ownership status.
 * x-ms-original-file: 2025-11-01-preview/acceptOwnershipStatus.json
 */
async function acceptOwnershipStatus() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscription.acceptOwnershipStatus(
    "291bba3f-e0a5-47bc-a099-3bdcb2a50a05",
  );
  console.log(result);
}

async function main() {
  await acceptOwnershipStatus();
}

main().catch(console.error);
