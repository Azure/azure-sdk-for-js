// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the enrollment accounts for a billing account. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary Lists the enrollment accounts for a billing account. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/enrollmentAccountsListByBillingAccount.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function enrollmentAccountsListByBillingAccount(): Promise<void> {
  const billingAccountName = "6564892";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.enrollmentAccounts.listByBillingAccount(billingAccountName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await enrollmentAccountsListByBillingAccount();
}

main().catch(console.error);
