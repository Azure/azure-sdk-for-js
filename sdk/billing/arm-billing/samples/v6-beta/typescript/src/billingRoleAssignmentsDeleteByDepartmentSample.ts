// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a role assignment on a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary deletes a role assignment on a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentDeleteByDepartment.json
 */
async function billingRoleAssignmentDeleteByDepartment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  await client.billingRoleAssignments.deleteByDepartment(
    "8608480",
    "123456",
    "9dfd08c2-62a3-4d47-85bd-1cdba1408402",
  );
}

async function main(): Promise<void> {
  await billingRoleAssignmentDeleteByDepartment();
}

main().catch(console.error);
