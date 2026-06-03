// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the billed or unbilled transactions by billing profile name for given start and end date. Transactions include purchases, refunds and Azure usage charges. Unbilled transactions are listed under pending invoice Id and do not include tax. Tax is added to the amount once an invoice is generated.
 *
 * @summary lists the billed or unbilled transactions by billing profile name for given start and end date. Transactions include purchases, refunds and Azure usage charges. Unbilled transactions are listed under pending invoice Id and do not include tax. Tax is added to the amount once an invoice is generated.
 * x-ms-original-file: 2024-04-01/transactionsListByBillingProfile.json
 */
async function transactionsListByBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.transactions.listByBillingProfile(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    new Date("2024-04-01"),
    new Date("2023-05-30"),
    "Billed",
    { filter: "properties/date gt '2020-10-01'", search: "storage" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await transactionsListByBillingProfile();
}

main().catch(console.error);
