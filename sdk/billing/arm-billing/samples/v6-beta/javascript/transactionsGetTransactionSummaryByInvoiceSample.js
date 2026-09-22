// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the transaction summary for an invoice. Transactions include purchases, refunds and Azure usage charges.
 *
 * @summary gets the transaction summary for an invoice. Transactions include purchases, refunds and Azure usage charges.
 * x-ms-original-file: 2024-04-01/transactionSummaryGetByInvoice.json
 */
async function transactionSummaryGetByInvoice() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.transactions.getTransactionSummaryByInvoice(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "G123456789",
  );
  console.log(result);
}

async function main() {
  await transactionSummaryGetByInvoice();
}

main().catch(console.error);
