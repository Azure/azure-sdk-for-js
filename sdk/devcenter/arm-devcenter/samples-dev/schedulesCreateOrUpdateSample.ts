// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Schedule } from "@azure/arm-devcenter";
import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a Schedule.
 *
 * @summary Creates or updates a Schedule.
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/Schedules_CreateDailyShutdownPoolSchedule.json
 */
async function schedulesCreateDailyShutdownPoolSchedule(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const projectName = "DevProject";
  const poolName = "DevPool";
  const scheduleName = "autoShutdown";
  const body: Schedule = {
    typePropertiesType: "StopDevBox",
    frequency: "Daily",
    state: "Enabled",
    time: "17:30",
    timeZone: "America/Los_Angeles",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.schedules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    projectName,
    poolName,
    scheduleName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await schedulesCreateDailyShutdownPoolSchedule();
}

main().catch(console.error);
