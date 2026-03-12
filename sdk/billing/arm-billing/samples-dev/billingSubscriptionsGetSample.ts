// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a subscription by its ID. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement,  Microsoft Partner Agreement, and Enterprise Agreement.
 *
 * @summary Gets a subscription by its ID. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement,  Microsoft Partner Agreement, and Enterprise Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingSubscriptionsGet.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingSubscriptionsGet(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingSubscriptionName = "11111111-1111-1111-1111-111111111111";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingSubscriptions.get(billingAccountName, billingSubscriptionName);
  console.log(result);
}

async function main(): Promise<void> {
  await billingSubscriptionsGet();
}

main().catch(console.error);
