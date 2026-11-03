// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a billing request by its ID.
 *
 * @summary gets a billing request by its ID.
 * x-ms-original-file: 2024-04-01/billingRequestsGet.json
 */
async function billingRequestsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRequests.get("00000000-0000-0000-0000-000000000000");
  console.log(result);
}

async function main(): Promise<void> {
  await billingRequestsGet();
}

main().catch(console.error);
