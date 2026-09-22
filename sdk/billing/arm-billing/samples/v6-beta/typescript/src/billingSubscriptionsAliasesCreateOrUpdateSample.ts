// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a billing subscription by its alias ID.  The operation is supported for seat based billing subscriptions.
 *
 * @summary creates or updates a billing subscription by its alias ID.  The operation is supported for seat based billing subscriptions.
 * x-ms-original-file: 2024-04-01/billingSubscriptionAliasCreateOrUpdate.json
 */
async function billingSubscriptionAliasCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingSubscriptionsAliases.createOrUpdate(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "c356b7c7-7545-4686-b843-c1a49cf853fc",
    {
      billingFrequency: "P1M",
      displayName: "Subscription 3",
      quantity: 1,
      skuId: "0001",
      termDuration: "P1M",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingSubscriptionAliasCreateOrUpdate();
}

main().catch(console.error);
