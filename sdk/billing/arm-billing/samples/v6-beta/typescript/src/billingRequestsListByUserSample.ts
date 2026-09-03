// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the list of billing requests submitted by a user.
 *
 * @summary the list of billing requests submitted by a user.
 * x-ms-original-file: 2024-04-01/billingRequestsListByUser.json
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
 * This sample demonstrates how to the list of billing requests submitted by a user.
 *
 * @summary the list of billing requests submitted by a user.
 * x-ms-original-file: 2024-04-01/billingRequestsListByUserWithFilter.json
 */
async function billingRequestsListByUserWithFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRequests.listByUser({
    filter: "properties/status eq 'Approved'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingRequestsListByUser();
  await billingRequestsListByUserWithFilter();
}

main().catch(console.error);
