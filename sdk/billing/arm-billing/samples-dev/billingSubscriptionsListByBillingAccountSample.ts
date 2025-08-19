// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingSubscriptionsListByBillingAccountOptionalParams } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the subscriptions for a billing account.
 *
 * @summary Lists the subscriptions for a billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingSubscriptionsListByBillingAccount.json
 */
async function billingSubscriptionsListByBillingAccount(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const includeDeleted = false;
  const includeTenantSubscriptions = false;
  const options: BillingSubscriptionsListByBillingAccountOptionalParams = {
    includeDeleted,
    includeTenantSubscriptions,
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingSubscriptions.listByBillingAccount(
    billingAccountName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await billingSubscriptionsListByBillingAccount();
}

main().catch(console.error);
