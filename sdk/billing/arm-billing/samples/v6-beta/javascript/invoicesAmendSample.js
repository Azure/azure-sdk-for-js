// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerate an invoice by billing account name and invoice name. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary regenerate an invoice by billing account name and invoice name. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/invoicesAmend.json
 */
async function invoicesAmend() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  await client.invoices.amend(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "G123456789",
  );
}

async function main() {
  await invoicesAmend();
}

main().catch(console.error);
