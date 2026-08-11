// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a budget.
 *
 * @summary the operation to delete a budget.
 * x-ms-original-file: 2024-08-01/DeleteBudget.json
 */
async function deleteBudget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  await client.budgets.delete("subscriptions/00000000-0000-0000-0000-000000000000", "TestBudget");
}

async function main(): Promise<void> {
  await deleteBudget();
}

main().catch(console.error);
