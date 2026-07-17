// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes a host subscription from the guest subscription's list of trusted hosts.
 *
 * @summary removes a host subscription from the guest subscription's list of trusted hosts.
 * x-ms-original-file: 2026-07-31/TrustedHostSubscriptions_Delete.json
 */
async function revokeTrustInAHostSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new ComputeLimitClient(credential, subscriptionId);
  await client.trustedHostSubscriptions.delete("eastus", "22222222-2222-2222-2222-222222222222");
}

async function main() {
  await revokeTrustInAHostSubscription();
}

main().catch(console.error);
