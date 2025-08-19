// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Runs a shared scheduled action within the given scope.
 *
 * @summary Runs a shared scheduled action within the given scope.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/scheduledActions/scheduledAction-sendNow-shared.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function scheduledActionRunByScope(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const name = "monthlyCostByResource";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.scheduledActions.runByScope(scope, name);
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionRunByScope();
}

main().catch(console.error);
