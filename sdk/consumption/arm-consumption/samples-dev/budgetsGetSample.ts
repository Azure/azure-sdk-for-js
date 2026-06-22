// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the budget for the scope by budget name.
 *
 * @summary gets the budget for the scope by budget name.
 * x-ms-original-file: 2024-08-01/Budget.json
 */
async function budget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.budgets.get(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "TestBudget",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await budget();
}

main().catch(console.error);
