// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the billing permissions the caller has for an enrollment account.
 *
 * @summary lists the billing permissions the caller has for an enrollment account.
 * x-ms-original-file: 2024-04-01/billingPermissionsListByEnrollmentAccount.json
 */
async function billingPermissionsListByEnrollmentAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingPermissions.listByEnrollmentAccount("6100092", "123456")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingPermissionsListByEnrollmentAccount();
}

main().catch(console.error);
