// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a role assignment on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary deletes a role assignment on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentDeleteByCustomer.json
 */
async function billingRoleAssignmentDeleteByCustomer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  await client.billingRoleAssignments.deleteByCustomer(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30",
    "BKM6-54VH-BG7-PGB",
    "703ab484-dda2-4402-827b-a74513b61e2d",
    "30000000-aaaa-bbbb-cccc-100000000000_00000000-0000-0000-0000-000000000000",
  );
}

async function main(): Promise<void> {
  await billingRoleAssignmentDeleteByCustomer();
}

main().catch(console.error);
