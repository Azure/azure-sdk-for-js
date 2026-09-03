// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the subscriptions for a billing account.
 *
 * @summary lists the subscriptions for a billing account.
 * x-ms-original-file: 2024-04-01/billingSubscriptionsListByBillingAccount.json
 */
async function billingSubscriptionsListByBillingAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingSubscriptions.listByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    { includeDeleted: false, includeTenantSubscriptions: false },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingSubscriptionsListByBillingAccount();
}

main().catch(console.error);
