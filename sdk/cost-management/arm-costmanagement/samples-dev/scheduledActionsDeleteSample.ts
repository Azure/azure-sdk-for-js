// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a private scheduled action.
 *
 * @summary Delete a private scheduled action.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/scheduledActions/scheduledAction-delete-private.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateScheduledActionDelete(): Promise<void> {
  const name = "monthlyCostByResource";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.scheduledActions.delete(name);
  console.log(result);
}

async function main(): Promise<void> {
  await privateScheduledActionDelete();
}

main().catch(console.error);
