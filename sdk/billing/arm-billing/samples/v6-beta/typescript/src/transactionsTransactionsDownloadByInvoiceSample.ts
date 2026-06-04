// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a URL to download the transactions document for an invoice. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary gets a URL to download the transactions document for an invoice. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/transactionsDownloadByInvoice.json
 */
async function transactionsDownloadByInvoice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.transactions.transactionsDownloadByInvoice(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "G123456789",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await transactionsDownloadByInvoice();
}

main().catch(console.error);
