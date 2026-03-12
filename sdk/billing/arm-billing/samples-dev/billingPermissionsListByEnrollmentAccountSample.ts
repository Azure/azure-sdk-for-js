// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the billing permissions the caller has for an enrollment account.
 *
 * @summary Lists the billing permissions the caller has for an enrollment account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingPermissionsListByEnrollmentAccount.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingPermissionsListByEnrollmentAccount(): Promise<void> {
  const billingAccountName = "6100092";
  const enrollmentAccountName = "123456";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingPermissions.listByEnrollmentAccount(
    billingAccountName,
    enrollmentAccountName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await billingPermissionsListByEnrollmentAccount();
}

main().catch(console.error);
