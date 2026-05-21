// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the billing permissions the caller has for a customer.
 *
 * @summary lists the billing permissions the caller has for a customer.
 * x-ms-original-file: 2024-04-01/billingPermissionsListByCustomer.json
 */
async function billingPermissionsListByCustomer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingPermissions.listByCustomer(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "BKM6-54VH-BG7-PGB",
    "11111111-1111-1111-1111-111111111111",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingPermissionsListByCustomer();
}

main().catch(console.error);
