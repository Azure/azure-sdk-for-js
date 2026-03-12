// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks availability and correctness of the name for a scheduled action.
 *
 * @summary Checks availability and correctness of the name for a scheduled action.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/scheduledActions/checkNameAvailability-private-scheduledAction.json
 */

import type { CheckNameAvailabilityRequest } from "@azure/arm-costmanagement";
import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function scheduledActionCheckNameAvailability(): Promise<void> {
  const checkNameAvailabilityRequest: CheckNameAvailabilityRequest = {
    name: "testName",
    type: "Microsoft.CostManagement/ScheduledActions",
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.scheduledActions.checkNameAvailability(checkNameAvailabilityRequest);
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionCheckNameAvailability();
}

main().catch(console.error);
