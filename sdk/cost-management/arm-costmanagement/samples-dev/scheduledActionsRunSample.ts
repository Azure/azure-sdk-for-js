// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Processes a private scheduled action.
 *
 * @summary Processes a private scheduled action.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/scheduledActions/scheduledAction-sendNow-private.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function scheduledActionSendNow(): Promise<void> {
  const name = "monthlyCostByResource";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.scheduledActions.run(name);
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionSendNow();
}

main().catch(console.error);
