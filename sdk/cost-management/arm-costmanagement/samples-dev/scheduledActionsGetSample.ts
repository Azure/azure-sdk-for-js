// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the private scheduled action by name.
 *
 * @summary get the private scheduled action by name.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledAction-get-private.json
 */
async function privateScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.scheduledActions.get("monthlyCostByResource");
  console.log(result);
}

async function main(): Promise<void> {
  await privateScheduledAction();
}

main().catch(console.error);
