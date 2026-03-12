// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List the definition for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary List the definition for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingRoleDefinitionListByEnrollmentAccount.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingRoleDefinitionListByEnrollmentAccount(): Promise<void> {
  const billingAccountName = "123456";
  const enrollmentAccountName = "4568789";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRoleDefinitionOperations.listByEnrollmentAccount(
    billingAccountName,
    enrollmentAccountName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await billingRoleDefinitionListByEnrollmentAccount();
}

main().catch(console.error);
