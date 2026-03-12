// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a billing request by its ID.
 *
 * @summary Gets a billing request by its ID.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingRequestsGet.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingRequestsGet(): Promise<void> {
  const billingRequestName = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRequests.get(billingRequestName);
  console.log(result);
}

async function main(): Promise<void> {
  await billingRequestsGet();
}

main().catch(console.error);
