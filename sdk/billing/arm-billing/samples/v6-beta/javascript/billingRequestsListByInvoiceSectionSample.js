// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the list of billing requests submitted for the invoice section.
 *
 * @summary the list of billing requests submitted for the invoice section.
 * x-ms-original-file: 2024-04-01/billingRequestsListByInvoiceSection.json
 */
async function billingRequestsListByInvoiceSection() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRequests.listByInvoiceSection(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "yyyy-yyyy-yyy-yyy",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingRequestsListByInvoiceSection();
}

main().catch(console.error);
