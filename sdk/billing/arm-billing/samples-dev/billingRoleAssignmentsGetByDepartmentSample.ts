// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a role assignment for the caller on a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary Gets a role assignment for the caller on a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingRoleAssignmentGetByDepartment.json
 */
async function billingRoleAssignmentGetByDepartment(): Promise<void> {
  const billingAccountName = "7898901";
  const departmentName = "225314";
  const billingRoleAssignmentName = "9dfd08c2-62a3-4d47-85bd-1cdba1408402";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleAssignments.getByDepartment(
    billingAccountName,
    departmentName,
    billingRoleAssignmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingRoleAssignmentGetByDepartment();
}

main().catch(console.error);
