// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to processes a private scheduled action.
 *
 * @summary processes a private scheduled action.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledAction-sendNow-private.json
 */
async function scheduledActionSendNow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.scheduledActions.run("monthlyCostByResource");
}

async function main(): Promise<void> {
  await scheduledActionSendNow();
}

main().catch(console.error);
