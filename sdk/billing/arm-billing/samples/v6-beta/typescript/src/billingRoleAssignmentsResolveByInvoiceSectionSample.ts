// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the role assignments for the caller on an invoice section while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary lists the role assignments for the caller on an invoice section while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/resolveBillingRoleAssignmentByInvoiceSection.json
 */
async function resolveBillingRoleAssignmentByInvoiceSection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleAssignments.resolveByInvoiceSection(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30",
    "BKM6-54VH-BG7-PGB",
    "xxxx-xxxx-xxx-xxx",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await resolveBillingRoleAssignmentByInvoiceSection();
}

main().catch(console.error);
