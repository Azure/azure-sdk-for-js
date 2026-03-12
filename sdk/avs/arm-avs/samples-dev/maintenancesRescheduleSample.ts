// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reschedule a maintenance
 *
 * @summary reschedule a maintenance
 * x-ms-original-file: 2025-09-01/Maintenances_Reschedule.json
 */
async function maintenancesReschedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.maintenances.reschedule("group1", "cloud1", "maintenance1", {
    rescheduleTime: new Date("2023-01-12T16:17:55.237Z"),
    message: "Rescheduled due to xyz",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await maintenancesReschedule();
}

main().catch(console.error);
