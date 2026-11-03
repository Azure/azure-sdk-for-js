// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the billing permissions the caller has for a department.
 *
 * @summary lists the billing permissions the caller has for a department.
 * x-ms-original-file: 2024-04-01/billingPermissionsListByDepartment.json
 */
async function billingPermissionsListByDepartment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingPermissions.listByDepartment("6100092", "123456")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingPermissionsListByDepartment();
}

main().catch(console.error);
