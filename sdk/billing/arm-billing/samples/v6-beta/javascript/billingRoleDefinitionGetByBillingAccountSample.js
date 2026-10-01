// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the definition for a role on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement.
 *
 * @summary gets the definition for a role on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleDefinitionGetByBillingAccount.json
 */
async function billingRoleDefinitionGetByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleDefinition.getByBillingAccount(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "50000000-aaaa-bbbb-cccc-100000000000",
  );
  console.log(result);
}

async function main() {
  await billingRoleDefinitionGetByBillingAccount();
}

main().catch(console.error);
