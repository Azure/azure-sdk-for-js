// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the list of billing requests submitted for the billing profile.
 *
 * @summary the list of billing requests submitted for the billing profile.
 * x-ms-original-file: 2024-04-01/billingRequestsListByBillingProfile.json
 */
async function billingRequestsListByBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRequests.listByBillingProfile(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingRequestsListByBillingProfile();
}

main().catch(console.error);
