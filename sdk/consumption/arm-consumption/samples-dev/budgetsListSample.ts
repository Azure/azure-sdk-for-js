// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2024-08-01/BudgetsList.json
 */
async function budgetsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await budgetsList();
}

main().catch(console.error);
