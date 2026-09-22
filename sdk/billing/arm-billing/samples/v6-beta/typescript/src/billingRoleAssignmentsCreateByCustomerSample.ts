// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds a role assignment on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary adds a role assignment on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentCreateByCustomer.json
 */
async function billingRoleAssignmentCreateByCustomer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleAssignments.createByCustomer(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30",
    "BKM6-54VH-BG7-PGB",
    "703ab484-dda2-4402-827b-a74513b61e2d",
    {
      principalId: "00000000-0000-0000-0000-000000000000",
      principalTenantId: "076915e7-de10-4323-bb34-a58c904068bb",
      roleDefinitionId:
        "/providers/Microsoft.Billing/billingAccounts/00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30/billingProfileName/BKM6-54VH-BG7-PGB/customers/703ab484-dda2-4402-827b-a74513b61e2d/billingRoleDefinitions/30000000-aaaa-bbbb-cccc-100000000000",
      userEmailAddress: "john@contoso.com",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingRoleAssignmentCreateByCustomer();
}

main().catch(console.error);
