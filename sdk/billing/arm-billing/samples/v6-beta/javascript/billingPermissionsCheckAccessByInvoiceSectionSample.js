// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides a list of check access response objects for an invoice section.
 *
 * @summary provides a list of check access response objects for an invoice section.
 * x-ms-original-file: 2024-04-01/checkAccessByInvoiceSection.json
 */
async function checkAccessByInvoiceSection() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingPermissions.checkAccessByInvoiceSection(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "Q7GV-UUVA-PJA-TGB",
    {
      actions: [
        "Microsoft.Billing/billingAccounts/read",
        "Microsoft.Subscription/subscriptions/write",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await checkAccessByInvoiceSection();
}

main().catch(console.error);
