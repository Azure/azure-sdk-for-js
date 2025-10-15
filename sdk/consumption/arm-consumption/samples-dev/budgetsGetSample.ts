// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the budget for the scope by budget name.
 *
 * @summary Gets the budget for the scope by budget name.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/Budget.json
 */

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function budget(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const budgetName = "TestBudget";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.budgets.get(scope, budgetName);
  console.log(result);
}

async function main(): Promise<void> {
  await budget();
}

main().catch(console.error);
