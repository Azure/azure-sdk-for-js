// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a billing role assignment. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary create or update a billing role assignment. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentCreateOrUpdateByDepartment.json
 */
async function billingRoleAssignmentCreateOrUpdateByDepartment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleAssignments.createOrUpdateByDepartment(
    "7898901",
    "12345",
    "9dfd08c2-62a3-4d47-85bd-1cdba1408402",
    {
      properties: {
        principalId: "00000000-0000-0000-0000-000000000000",
        principalTenantId: "076915e7-de10-4323-bb34-a58c904068bb",
        roleDefinitionId:
          "/providers/Microsoft.Billing/billingAccounts/7898901/departments/12345/billingRoleDefinitions/9f1983cb-2574-400c-87e9-34cf8e2280db",
        userEmailAddress: "john@contoso.com",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingRoleAssignmentCreateOrUpdateByDepartment();
}

main().catch(console.error);
