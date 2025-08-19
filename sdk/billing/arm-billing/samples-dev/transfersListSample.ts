// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the transfer requests for an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary Lists the transfer requests for an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/transfersList.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function transfersList(): Promise<void> {
  const billingAccountName =
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingProfileName = "xxxx-xxxx-xxx-xxx";
  const invoiceSectionName = "yyyy-yyyy-yyy-yyy";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.transfers.list(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await transfersList();
}

main().catch(console.error);
