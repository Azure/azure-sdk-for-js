// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a role assignment for the caller on a enrollment Account. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary gets a role assignment for the caller on a enrollment Account. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentGetByEnrollmentAccount.json
 */
async function billingRoleAssignmentGetByEnrollmentAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleAssignments.getByEnrollmentAccount(
    "7898901",
    "225314",
    "9dfd08c2-62a3-4d47-85bd-1cdba1408402",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingRoleAssignmentGetByEnrollmentAccount();
}

main().catch(console.error);
