// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an invoice by subscription ID and invoice ID. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary Gets an invoice by subscription ID and invoice ID. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/invoicesGetByBillingSubscription.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function invoicesGetByBillingSubscription(): Promise<void> {
  const subscriptionId =
    process.env["BILLING_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const invoiceName = "E123456789";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.invoices.getByBillingSubscription(invoiceName);
  console.log(result);
}

async function main(): Promise<void> {
  await invoicesGetByBillingSubscription();
}

main().catch(console.error);
