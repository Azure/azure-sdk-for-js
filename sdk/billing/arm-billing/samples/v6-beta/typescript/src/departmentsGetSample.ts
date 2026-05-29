// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a department by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary gets a department by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/departmentGet.json
 */
async function departmentGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.departments.get("456598", "164821");
  console.log(result);
}

async function main(): Promise<void> {
  await departmentGet();
}

main().catch(console.error);
