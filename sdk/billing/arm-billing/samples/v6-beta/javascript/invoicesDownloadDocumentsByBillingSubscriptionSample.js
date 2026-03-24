// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a URL to download multiple invoice documents (invoice pdf, tax receipts, credit notes) as a zip file. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary gets a URL to download multiple invoice documents (invoice pdf, tax receipts, credit notes) as a zip file. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/invoicesDownloadDocumentsByBillingSubscription.json
 */
async function invoicesDownloadDocumentsByBillingSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.invoices.downloadDocumentsByBillingSubscription([
    { documentName: "12345678", invoiceName: "E123456789" },
    { documentName: "12345678", invoiceName: "E987654321" },
  ]);
  console.log(result);
}

async function main() {
  await invoicesDownloadDocumentsByBillingSubscription();
}

main().catch(console.error);
