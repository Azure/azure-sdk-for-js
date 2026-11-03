// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the billing permissions the caller has for an invoice section.
 *
 * @summary lists the billing permissions the caller has for an invoice section.
 * x-ms-original-file: 2024-04-01/billingPermissionsListByInvoiceSection.json
 */
async function billingPermissionsListByInvoiceSection() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingPermissions.listByInvoiceSection(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "XXXX-XXXX-XXX-XXX",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingPermissionsListByInvoiceSection();
}

main().catch(console.error);
