// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingRequestsListByUserOptionalParams } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The list of billing requests submitted by a user.
 *
 * @summary The list of billing requests submitted by a user.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingRequestsListByUser.json
 */
async function billingRequestsListByUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRequests.listByUser()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to The list of billing requests submitted by a user.
 *
 * @summary The list of billing requests submitted by a user.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingRequestsListByUserWithFilter.json
 */
async function billingRequestsListByUserWithFilter(): Promise<void> {
  const filter = "properties/status eq 'Approved'";
  const options: BillingRequestsListByUserOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRequests.listByUser(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await billingRequestsListByUser();
  await billingRequestsListByUserWithFilter();
}

main().catch(console.error);
