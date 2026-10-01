// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the role assignments for the caller on a customer while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary lists the role assignments for the caller on a customer while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: 2024-04-01/resolveBillingRoleAssignmentByCustomer.json
 */
async function resolveBillingRoleAssignmentByCustomer() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleAssignments.resolveByCustomer(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30",
    "xxxx-xxxx-xxx-xxx",
    "703ab484-dda2-4402-827b-a74513b61e2d",
  );
  console.log(result);
}

async function main() {
  await resolveBillingRoleAssignmentByCustomer();
}

main().catch(console.error);
