// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a URL to download an invoice by billing subscription. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary gets a URL to download an invoice by billing subscription. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/invoicesDownloadByBillingSubscription.json
 */
async function invoicesDownloadByBillingSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.invoices.downloadByBillingSubscription("E123456789", {
    documentName: "12345678",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await invoicesDownloadByBillingSubscription();
}

main().catch(console.error);
