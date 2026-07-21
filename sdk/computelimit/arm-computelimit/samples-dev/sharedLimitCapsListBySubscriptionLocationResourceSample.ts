// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all shared limit cap configurations visible to the caller's subscription.
 *
 * @summary lists all shared limit cap configurations visible to the caller's subscription.
 * x-ms-original-file: 2026-07-01/SharedLimitCaps_List.json
 */
async function listSharedLimitCapsInARegionForTheCallerSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sharedLimitCaps.listBySubscriptionLocationResource("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSharedLimitCapsInARegionForTheCallerSubscription();
}

main().catch(console.error);
