// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the role assignments for the caller on a enrollment account. The operation is supported for billing accounts of type Enterprise Agreement.
 *
 * @summary lists the role assignments for the caller on a enrollment account. The operation is supported for billing accounts of type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentListByEnrollmentAccount.json
 */
async function billingRoleAssignmentListByEnrollmentAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRoleAssignments.listByEnrollmentAccount(
    "6100092",
    "123456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingRoleAssignmentListByEnrollmentAccount();
}

main().catch(console.error);
