// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the transactions for an invoice. Transactions include purchases, refunds and Azure usage charges.
 *
 * @summary Lists the transactions for an invoice. Transactions include purchases, refunds and Azure usage charges.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/transactionsListByInvoice.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function transactionsListByInvoice(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const invoiceName = "G123456789";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.transactions.listByInvoice(billingAccountName, invoiceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await transactionsListByInvoice();
}

main().catch(console.error);
