// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a private scheduled action.
 *
 * @summary delete a private scheduled action.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledAction-delete-private.json
 */
async function privateScheduledActionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.scheduledActions.delete("monthlyCostByResource");
}

async function main(): Promise<void> {
  await privateScheduledActionDelete();
}

main().catch(console.error);
