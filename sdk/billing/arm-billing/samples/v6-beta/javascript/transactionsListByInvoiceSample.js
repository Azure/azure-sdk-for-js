// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the transactions for an invoice. Transactions include purchases, refunds and Azure usage charges.
 *
 * @summary lists the transactions for an invoice. Transactions include purchases, refunds and Azure usage charges.
 * x-ms-original-file: 2024-04-01/transactionsListByInvoice.json
 */
async function transactionsListByInvoice() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.transactions.listByInvoice(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "G123456789",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await transactionsListByInvoice();
}

main().catch(console.error);
