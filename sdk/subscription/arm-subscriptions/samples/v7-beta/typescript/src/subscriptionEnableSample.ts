// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to enable a subscription
 *
 * @summary the operation to enable a subscription
 * x-ms-original-file: 2025-11-01-preview/enableSubscription.json
 */
async function enableSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscription.enable("7948bcee-488c-47ce-941c-38e20ede803d");
  console.log(result);
}

async function main(): Promise<void> {
  await enableSubscription();
}

main().catch(console.error);
