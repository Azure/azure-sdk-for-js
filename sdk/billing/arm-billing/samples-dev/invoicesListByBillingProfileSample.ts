// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the invoices for a billing profile for a given start date and end date. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary Lists the invoices for a billing profile for a given start date and end date. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/invoicesListByBillingProfile.json
 */

import type { InvoicesListByBillingProfileOptionalParams } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function invoicesListByBillingProfile(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingProfileName = "xxxx-xxxx-xxx-xxx";
  const periodStartDate = new Date("2023-01-01");
  const periodEndDate = new Date("2023-06-30");
  const options: InvoicesListByBillingProfileOptionalParams = {
    periodStartDate,
    periodEndDate,
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.invoices.listByBillingProfile(
    billingAccountName,
    billingProfileName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await invoicesListByBillingProfile();
}

main().catch(console.error);
