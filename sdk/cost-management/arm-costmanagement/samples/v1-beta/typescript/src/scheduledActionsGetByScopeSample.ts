// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the shared scheduled action from the given scope by name.
 *
 * @summary get the shared scheduled action from the given scope by name.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledAction-get-shared.json
 */
async function scheduledActionByScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.scheduledActions.getByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "monthlyCostByResource",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionByScope();
}

main().catch(console.error);
