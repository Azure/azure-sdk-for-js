// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all host subscriptions that the guest subscription trusts in a location.
 *
 * @summary lists all host subscriptions that the guest subscription trusts in a location.
 * x-ms-original-file: 2026-07-31/TrustedHostSubscriptions_List.json
 */
async function listTrustedHostSubscriptionsForAScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.trustedHostSubscriptions.listBySubscriptionLocationResource(
    "eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTrustedHostSubscriptionsForAScope();
}

main().catch(console.error);
