// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a scheduled action within the given scope.
 *
 * @summary delete a scheduled action within the given scope.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledAction-delete-shared.json
 */
async function scheduledActionDeleteByScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.scheduledActions.deleteByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "monthlyCostByResource",
  );
}

async function main(): Promise<void> {
  await scheduledActionDeleteByScope();
}

main().catch(console.error);
