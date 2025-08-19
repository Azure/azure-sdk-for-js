// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List the definition for a department. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary List the definition for a department. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingRoleDefinitionListByDepartment.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingRoleDefinitionListByDepartment(): Promise<void> {
  const billingAccountName = "123456";
  const departmentName = "7368531";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRoleDefinitionOperations.listByDepartment(
    billingAccountName,
    departmentName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await billingRoleDefinitionListByDepartment();
}

main().catch(console.error);
