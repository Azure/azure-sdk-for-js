// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the role assignments for the caller on a customer while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary Lists the role assignments for the caller on a customer while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/resolveBillingRoleAssignmentByCustomer.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function resolveBillingRoleAssignmentByCustomer(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30";
  const billingProfileName = "xxxx-xxxx-xxx-xxx";
  const customerName = "703ab484-dda2-4402-827b-a74513b61e2d";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleAssignments.beginResolveByCustomerAndWait(
    billingAccountName,
    billingProfileName,
    customerName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await resolveBillingRoleAssignmentByCustomer();
}

main().catch(console.error);
