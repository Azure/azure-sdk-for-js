// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the transaction summary for an invoice. Transactions include purchases, refunds and Azure usage charges.
 *
 * @summary gets the transaction summary for an invoice. Transactions include purchases, refunds and Azure usage charges.
 * x-ms-original-file: 2024-04-01/transactionSummaryGetByInvoice.json
 */
async function transactionSummaryGetByInvoice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.transactions.getTransactionSummaryByInvoice(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "G123456789",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await transactionSummaryGetByInvoice();
}

main().catch(console.error);
