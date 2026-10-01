// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a role assignment on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary deletes a role assignment on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentDeleteByBillingProfile.json
 */
async function billingRoleAssignmentDeleteByBillingProfile() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  await client.billingRoleAssignments.deleteByBillingProfile(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30",
    "BKM6-54VH-BG7-PGB",
    "10000000-aaaa-bbbb-cccc-100000000000_6fd330f6-7d26-4aff-b9cf-7bd699f965b9",
  );
}

async function main() {
  await billingRoleAssignmentDeleteByBillingProfile();
}

main().catch(console.error);
