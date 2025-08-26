// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a department by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary Gets a department by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/departmentGet.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function departmentGet(): Promise<void> {
  const billingAccountName = "456598";
  const departmentName = "164821";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.departments.get(billingAccountName, departmentName);
  console.log(result);
}

async function main(): Promise<void> {
  await departmentGet();
}

main().catch(console.error);
