// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a budget.
 *
 * @summary the operation to delete a budget.
 * x-ms-original-file: 2025-03-01/Budgets/Delete/DeleteBudget.json
 */
async function deleteBudget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.budgets.delete("subscriptions/00000000-0000-0000-0000-000000000000", "TestBudget");
}

async function main(): Promise<void> {
  await deleteBudget();
}

main().catch(console.error);
