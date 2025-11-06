// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to adds a subscription as a guest to consume the compute limits shared by the host subscription.
 *
 * @summary adds a subscription as a guest to consume the compute limits shared by the host subscription.
 * x-ms-original-file: 2025-08-15/GuestSubscriptions_Create.json
 */
async function createAGuestSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.guestSubscriptions.create(
    "eastus",
    "11111111-1111-1111-1111-111111111111",
    { properties: {} },
  );
  console.log(result);
}

async function main() {
  await createAGuestSubscription();
}

main().catch(console.error);
