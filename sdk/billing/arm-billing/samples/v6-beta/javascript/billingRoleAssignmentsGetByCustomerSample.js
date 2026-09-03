// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a role assignment for the caller on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary gets a role assignment for the caller on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentGetByCustomer.json
 */
async function billingRoleAssignmentGetByCustomer() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleAssignments.getByCustomer(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30",
    "xxxx-xxxx-xxx-xxx",
    "703ab484-dda2-4402-827b-a74513b61e2d",
    "30000000-aaaa-bbbb-cccc-100000000000_6fd330f6-7d26-4aff-b9cf-7bd699f965b9",
  );
  console.log(result);
}

async function main() {
  await billingRoleAssignmentGetByCustomer();
}

main().catch(console.error);
