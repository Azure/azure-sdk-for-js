// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds a host subscription to the guest subscription's list of trusted hosts. A guest
 * subscription can trust multiple host subscriptions; this only establishes trust and
 * does not check the guest in to the host. Guest-to-host association is determined at
 * check-in time, where a subscription can be a guest of at most one host per region.
 *
 * @summary adds a host subscription to the guest subscription's list of trusted hosts. A guest
 * subscription can trust multiple host subscriptions; this only establishes trust and
 * does not check the guest in to the host. Guest-to-host association is determined at
 * check-in time, where a subscription can be a guest of at most one host per region.
 * x-ms-original-file: 2026-07-31/TrustedHostSubscriptions_Create.json
 */
async function trustAHostSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.trustedHostSubscriptions.create(
    "eastus",
    "22222222-2222-2222-2222-222222222222",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await trustAHostSubscription();
}

main().catch(console.error);
