// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to runs a shared scheduled action within the given scope.
 *
 * @summary runs a shared scheduled action within the given scope.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledAction-sendNow-shared.json
 */
async function scheduledActionRunByScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.scheduledActions.runByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "monthlyCostByResource",
  );
}

async function main(): Promise<void> {
  await scheduledActionRunByScope();
}

main().catch(console.error);
