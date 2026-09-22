// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the definition for a role on an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary gets the definition for a role on an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleDefinitionGetByEnrollmentAccount.json
 */
async function billingRoleDefinitionGetByEnrollmentAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleDefinition.getByEnrollmentAccount(
    "123456",
    "4568789",
    "50000000-aaaa-bbbb-cccc-100000000000",
  );
  console.log(result);
}

async function main() {
  await billingRoleDefinitionGetByEnrollmentAccount();
}

main().catch(console.error);
