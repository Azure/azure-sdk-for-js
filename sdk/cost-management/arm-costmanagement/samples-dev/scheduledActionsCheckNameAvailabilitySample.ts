// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks availability and correctness of the name for a scheduled action.
 *
 * @summary checks availability and correctness of the name for a scheduled action.
 * x-ms-original-file: 2025-03-01/scheduledActions/checkNameAvailability-private-scheduledAction.json
 */
async function scheduledActionCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.scheduledActions.checkNameAvailability({
    name: "testName",
    type: "Microsoft.CostManagement/ScheduledActions",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionCheckNameAvailability();
}

main().catch(console.error);
