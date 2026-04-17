// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a subscription as a guest to stop consuming the compute limits shared by the host subscription.
 *
 * @summary deletes a subscription as a guest to stop consuming the compute limits shared by the host subscription.
 * x-ms-original-file: 2025-08-15/GuestSubscriptions_Delete.json
 */
async function deleteAGuestSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  await client.guestSubscriptions.delete("eastus", "11111111-1111-1111-1111-111111111111");
}

async function main() {
  await deleteAGuestSubscription();
}

main().catch(console.error);
