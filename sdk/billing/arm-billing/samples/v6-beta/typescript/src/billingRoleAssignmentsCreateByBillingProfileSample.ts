// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds a role assignment on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary adds a role assignment on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentCreateByBillingProfile.json
 */
async function billingRoleAssignmentCreateByBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleAssignments.createByBillingProfile(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30",
    "BKM6-54VH-BG7-PGB",
    {
      principalId: "00000000-0000-0000-0000-000000000000",
      principalTenantId: "076915e7-de10-4323-bb34-a58c904068bb",
      roleDefinitionId:
        "/providers/Microsoft.Billing/billingAccounts/00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30/billingProfiles/BKM6-54VH-BG7-PGB/billingRoleDefinitions/10000000-aaaa-bbbb-cccc-100000000000",
      userEmailAddress: "john@contoso.com",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingRoleAssignmentCreateByBillingProfile();
}

main().catch(console.error);
