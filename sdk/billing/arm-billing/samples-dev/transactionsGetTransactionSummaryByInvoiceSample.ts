// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the transaction summary for an invoice. Transactions include purchases, refunds and Azure usage charges.
 *
 * @summary Gets the transaction summary for an invoice. Transactions include purchases, refunds and Azure usage charges.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/transactionSummaryGetByInvoice.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function transactionSummaryGetByInvoice(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const invoiceName = "G123456789";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.transactions.getTransactionSummaryByInvoice(
    billingAccountName,
    invoiceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await transactionSummaryGetByInvoice();
}

main().catch(console.error);
