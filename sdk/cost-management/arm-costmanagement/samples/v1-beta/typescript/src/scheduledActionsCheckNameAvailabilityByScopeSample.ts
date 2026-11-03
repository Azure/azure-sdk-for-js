// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks availability and correctness of the name for a scheduled action within the given scope.
 *
 * @summary checks availability and correctness of the name for a scheduled action within the given scope.
 * x-ms-original-file: 2025-03-01/scheduledActions/checkNameAvailability-shared-scheduledAction.json
 */
async function scheduledActionCheckNameAvailabilityByScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.scheduledActions.checkNameAvailabilityByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { name: "testName", type: "Microsoft.CostManagement/ScheduledActions" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionCheckNameAvailabilityByScope();
}

main().catch(console.error);
