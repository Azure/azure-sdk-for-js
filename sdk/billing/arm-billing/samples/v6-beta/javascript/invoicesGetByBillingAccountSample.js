// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an invoice by billing account name and ID. The operation is supported for all billing account types.
 *
 * @summary gets an invoice by billing account name and ID. The operation is supported for all billing account types.
 * x-ms-original-file: 2024-04-01/invoicesGetByBillingAccount.json
 */
async function invoicesGetByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.invoices.getByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "G123456789",
  );
  console.log(result);
}

async function main() {
  await invoicesGetByBillingAccount();
}

main().catch(console.error);
