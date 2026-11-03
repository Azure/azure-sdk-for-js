// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the definition for a department. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary list the definition for a department. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleDefinitionListByDepartment.json
 */
async function billingRoleDefinitionListByDepartment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRoleDefinition.listByDepartment("123456", "7368531")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingRoleDefinitionListByDepartment();
}

main().catch(console.error);
