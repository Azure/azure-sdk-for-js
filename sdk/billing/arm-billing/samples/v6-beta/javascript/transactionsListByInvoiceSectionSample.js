// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the billed or unbilled transactions by invoice section name for given start date and end date. Transactions include purchases, refunds and Azure usage charges. Unbilled transactions are listed under pending invoice Id and do not include tax. Tax is added to the amount once an invoice is generated.
 *
 * @summary lists the billed or unbilled transactions by invoice section name for given start date and end date. Transactions include purchases, refunds and Azure usage charges. Unbilled transactions are listed under pending invoice Id and do not include tax. Tax is added to the amount once an invoice is generated.
 * x-ms-original-file: 2024-04-01/transactionsListByInvoiceSection.json
 */
async function transactionsListByInvoiceSection() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.transactions.listByInvoiceSection(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "22000000-0000-0000-0000-000000000000",
    new Date("2024-04-01"),
    new Date("2023-05-30"),
    "Billed",
    { filter: "properties/date gt '2020-10-01'", search: "storage" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await transactionsListByInvoiceSection();
}

main().catch(console.error);
