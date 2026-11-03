// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the definition for a role on a department. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary gets the definition for a role on a department. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleDefinitionGetByDepartment.json
 */
async function billingRoleDefinitionGetByDepartment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleDefinition.getByDepartment(
    "123456",
    "7368531",
    "50000000-aaaa-bbbb-cccc-100000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingRoleDefinitionGetByDepartment();
}

main().catch(console.error);
