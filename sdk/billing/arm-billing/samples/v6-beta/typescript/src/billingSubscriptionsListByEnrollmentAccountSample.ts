// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the subscriptions for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary lists the subscriptions for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingSubscriptionsListByEnrollmentAccount.json
 */
async function billingSubscriptionsListByEnrollmentAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingSubscriptions.listByEnrollmentAccount(
    "6564892",
    "172988",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingSubscriptionsListByEnrollmentAccount();
}

main().catch(console.error);
