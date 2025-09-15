// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all budgets for the defined scope.
 *
 * @summary Lists all budgets for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/BudgetsList.json
 */

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function budgetsList(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.budgets.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await budgetsList();
}

main().catch(console.error);
