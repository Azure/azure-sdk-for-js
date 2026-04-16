// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to schedule a maintenance
 *
 * @summary schedule a maintenance
 * x-ms-original-file: 2025-09-01/Maintenances_Schedule.json
 */
async function maintenancesSchedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.maintenances.schedule("group1", "cloud1", "maintenance1", {
    scheduleTime: new Date("2025-09-12T16:17:55.237Z"),
    message: "scheduled due to xyz",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await maintenancesSchedule();
}

main().catch(console.error);
