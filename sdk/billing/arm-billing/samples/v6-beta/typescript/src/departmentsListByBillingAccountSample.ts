// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the departments that a user has access to. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary lists the departments that a user has access to. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/departmentsListByBillingAccount.json
 */
async function departmentsListByBillingAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.departments.listByBillingAccount("456598")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await departmentsListByBillingAccount();
}

main().catch(console.error);
