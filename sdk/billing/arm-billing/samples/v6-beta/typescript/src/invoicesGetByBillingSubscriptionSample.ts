// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an invoice by subscription ID and invoice ID. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary gets an invoice by subscription ID and invoice ID. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/invoicesGetByBillingSubscription.json
 */
async function invoicesGetByBillingSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.invoices.getByBillingSubscription("E123456789");
  console.log(result);
}

async function main(): Promise<void> {
  await invoicesGetByBillingSubscription();
}

main().catch(console.error);
