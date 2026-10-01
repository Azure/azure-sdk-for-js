// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a role assignment on a enrollment Account. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary deletes a role assignment on a enrollment Account. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentDeleteByEnrollmentAccount.json
 */
async function billingRoleAssignmentDeleteByEnrollmentAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  await client.billingRoleAssignments.deleteByEnrollmentAccount(
    "8608480",
    "123456",
    "9dfd08c2-62a3-4d47-85bd-1cdba1408402",
  );
}

async function main() {
  await billingRoleAssignmentDeleteByEnrollmentAccount();
}

main().catch(console.error);
