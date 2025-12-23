// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all guest subscriptions in a location.
 *
 * @summary lists all guest subscriptions in a location.
 * x-ms-original-file: 2025-08-15/GuestSubscriptions_List.json
 */
async function listGuestSubscriptionsForAScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.guestSubscriptions.listBySubscriptionLocationResource("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGuestSubscriptionsForAScope();
}

main().catch(console.error);
