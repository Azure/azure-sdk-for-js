// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a subscription by its billing profile and ID. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary gets a subscription by its billing profile and ID. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingSubscriptionGetByBillingProfile.json
 */
async function billingSubscriptionGetByBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingSubscriptions.getByBillingProfile(
    "pcn.94077792",
    "6478903",
    "6b96d3f2-9008-4a9d-912f-f87744185aa3",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingSubscriptionGetByBillingProfile();
}

main().catch(console.error);
