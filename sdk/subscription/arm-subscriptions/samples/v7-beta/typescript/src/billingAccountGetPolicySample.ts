// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Billing Account Policy.
 *
 * @summary get Billing Account Policy.
 * x-ms-original-file: 2025-11-01-preview/getBillingAccountPolicy.json
 */
async function getBillingAccountPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.billingAccount.getPolicy("testBillingAccountId");
  console.log(result);
}

async function main(): Promise<void> {
  await getBillingAccountPolicy();
}

main().catch(console.error);
