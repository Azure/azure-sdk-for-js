// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a URL to download the summary document for an invoice. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary gets a URL to download the summary document for an invoice. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/invoicesDownloadSummaryByBillingAccount.json
 */
async function invoicesDownloadSummaryByBillingAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.invoices.downloadSummaryByBillingAccount("123456789", "G123456789");
  console.log(result);
}

async function main(): Promise<void> {
  await invoicesDownloadSummaryByBillingAccount();
}

main().catch(console.error);
