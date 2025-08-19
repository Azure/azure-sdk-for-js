// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the subscriptions for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary Lists the subscriptions for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingSubscriptionsListByEnrollmentAccount.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingSubscriptionsListByEnrollmentAccount(): Promise<void> {
  const billingAccountName = "6564892";
  const enrollmentAccountName = "172988";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingSubscriptions.listByEnrollmentAccount(
    billingAccountName,
    enrollmentAccountName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await billingSubscriptionsListByEnrollmentAccount();
}

main().catch(console.error);
