// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an invoice by ID. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary Gets an invoice by ID. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/invoicesGet.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function invoicesGet(): Promise<void> {
  const invoiceName = "G123456789";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.invoices.get(invoiceName);
  console.log(result);
}

async function main(): Promise<void> {
  await invoicesGet();
}

main().catch(console.error);
