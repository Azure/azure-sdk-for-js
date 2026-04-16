// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of a guest subscription.
 *
 * @summary gets the properties of a guest subscription.
 * x-ms-original-file: 2025-08-15/GuestSubscriptions_Get.json
 */
async function getAGuestSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.guestSubscriptions.get(
    "eastus",
    "11111111-1111-1111-1111-111111111111",
  );
  console.log(result);
}

async function main() {
  await getAGuestSubscription();
}

main().catch(console.error);
