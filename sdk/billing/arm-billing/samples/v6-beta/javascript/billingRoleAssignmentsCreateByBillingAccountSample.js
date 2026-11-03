// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to adds a role assignment on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary adds a role assignment on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentCreateByBillingAccount.json
 */
async function billingRoleAssignmentCreateByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleAssignments.createByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30",
    {
      principalId: "00000000-0000-0000-0000-000000000000",
      principalTenantId: "076915e7-de10-4323-bb34-a58c904068bb",
      roleDefinitionId:
        "/providers/Microsoft.Billing/billingAccounts/00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30/billingRoleDefinitions/10000000-aaaa-bbbb-cccc-100000000000",
      userEmailAddress: "john@contoso.com",
    },
  );
  console.log(result);
}

async function main() {
  await billingRoleAssignmentCreateByBillingAccount();
}

main().catch(console.error);
