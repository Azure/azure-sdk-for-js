// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the billing permissions the caller has for a customer at billing account level.
 *
 * @summary lists the billing permissions the caller has for a customer at billing account level.
 * x-ms-original-file: 2024-04-01/billingPermissionsListByCustomerAtBillingAccount.json
 */
async function billingPermissionsListByCustomerAtBillingAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingPermissions.listByCustomerAtBillingAccount(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "11111111-1111-1111-1111-111111111111",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingPermissionsListByCustomerAtBillingAccount();
}

main().catch(console.error);
