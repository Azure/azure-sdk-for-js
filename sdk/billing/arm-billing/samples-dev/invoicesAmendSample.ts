// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerate an invoice by billing account name and invoice name. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary Regenerate an invoice by billing account name and invoice name. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/invoicesAmend.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function invoicesAmend(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const invoiceName = "G123456789";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.invoices.beginAmendAndWait(billingAccountName, invoiceName);
  console.log(result);
}

async function main(): Promise<void> {
  await invoicesAmend();
}

main().catch(console.error);
