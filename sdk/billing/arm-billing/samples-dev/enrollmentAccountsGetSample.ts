// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an enrollment account by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary Gets an enrollment account by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/enrollmentAccountGet.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function enrollmentAccountGet(): Promise<void> {
  const billingAccountName = "6564892";
  const enrollmentAccountName = "257698";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.enrollmentAccounts.get(billingAccountName, enrollmentAccountName);
  console.log(result);
}

async function main(): Promise<void> {
  await enrollmentAccountGet();
}

main().catch(console.error);
