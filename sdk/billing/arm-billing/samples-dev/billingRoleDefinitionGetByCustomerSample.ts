// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the definition for a role on a customer. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary Gets the definition for a role on a customer. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingRoleDefinitionGetByCustomer.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingRoleDefinitionGetByCustomer(): Promise<void> {
  const billingAccountName =
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingProfileName = "xxxx-xxxx-xxx-xxx";
  const customerName = "11111111-1111-1111-1111-111111111111";
  const roleDefinitionName = "30000000-aaaa-bbbb-cccc-100000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleDefinitionOperations.getByCustomer(
    billingAccountName,
    billingProfileName,
    customerName,
    roleDefinitionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingRoleDefinitionGetByCustomer();
}

main().catch(console.error);
