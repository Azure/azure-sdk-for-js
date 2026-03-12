// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a transfer request by ID. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary Gets a transfer request by ID. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/transfersGet.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function transferGet(): Promise<void> {
  const billingAccountName =
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingProfileName = "xxxx-xxxx-xxx-xxx";
  const invoiceSectionName = "yyyy-yyyy-yyy-yyy";
  const transferName = "aabb123";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.transfers.get(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    transferName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await transferGet();
}

main().catch(console.error);
