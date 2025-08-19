// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a role assignment on a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary Deletes a role assignment on a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingRoleAssignmentDeleteByDepartment.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingRoleAssignmentDeleteByDepartment(): Promise<void> {
  const billingAccountName = "8608480";
  const departmentName = "123456";
  const billingRoleAssignmentName = "9dfd08c2-62a3-4d47-85bd-1cdba1408402";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleAssignments.deleteByDepartment(
    billingAccountName,
    departmentName,
    billingRoleAssignmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingRoleAssignmentDeleteByDepartment();
}

main().catch(console.error);
