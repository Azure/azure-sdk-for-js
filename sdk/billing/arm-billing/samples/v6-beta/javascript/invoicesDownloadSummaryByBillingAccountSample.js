// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a URL to download the summary document for an invoice. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary gets a URL to download the summary document for an invoice. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/invoicesDownloadSummaryByBillingAccount.json
 */
async function invoicesDownloadSummaryByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.invoices.downloadSummaryByBillingAccount("123456789", "G123456789");
  console.log(result);
}

async function main() {
  await invoicesDownloadSummaryByBillingAccount();
}

main().catch(console.error);
