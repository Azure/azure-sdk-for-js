// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the invoices for a billing account for a given start date and end date. The operation is supported for all billing account types.
 *
 * @summary lists the invoices for a billing account for a given start date and end date. The operation is supported for all billing account types.
 * x-ms-original-file: 2024-04-01/invoicesListByBillingAccount.json
 */
async function invoicesListByBillingAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.invoices.listByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    { periodStartDate: new Date("2023-01-01"), periodEndDate: new Date("2023-06-30") },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await invoicesListByBillingAccount();
}

main().catch(console.error);
