// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an enrollment account by department. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary gets an enrollment account by department. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/enrollmentAccountByDepartment.json
 */
async function enrollmentAccountByDepartment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.enrollmentAccounts.getByDepartment("6564892", "164821", "257698");
  console.log(result);
}

async function main(): Promise<void> {
  await enrollmentAccountByDepartment();
}

main().catch(console.error);
