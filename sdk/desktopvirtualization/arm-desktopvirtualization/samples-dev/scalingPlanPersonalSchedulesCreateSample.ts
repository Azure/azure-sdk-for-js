// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a ScalingPlanPersonalSchedule.
 *
 * @summary Create or update a ScalingPlanPersonalSchedule.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/ScalingPlanPersonalSchedule_Create.json
 */

import type { ScalingPlanPersonalSchedule } from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function scalingPlanPersonalSchedulesCreate(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const scalingPlanName = "scalingPlan1";
  const scalingPlanScheduleName = "scalingPlanScheduleWeekdays1";
  const scalingPlanSchedule: ScalingPlanPersonalSchedule = {
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    offPeakActionOnDisconnect: "None",
    offPeakActionOnLogoff: "Deallocate",
    offPeakMinutesToWaitOnDisconnect: 10,
    offPeakMinutesToWaitOnLogoff: 10,
    offPeakStartTime: { hour: 20, minute: 0 },
    offPeakStartVMOnConnect: "Enable",
    peakActionOnDisconnect: "None",
    peakActionOnLogoff: "Deallocate",
    peakMinutesToWaitOnDisconnect: 10,
    peakMinutesToWaitOnLogoff: 10,
    peakStartTime: { hour: 8, minute: 0 },
    peakStartVMOnConnect: "Enable",
    rampDownActionOnDisconnect: "None",
    rampDownActionOnLogoff: "Deallocate",
    rampDownMinutesToWaitOnDisconnect: 10,
    rampDownMinutesToWaitOnLogoff: 10,
    rampDownStartTime: { hour: 18, minute: 0 },
    rampDownStartVMOnConnect: "Enable",
    rampUpActionOnDisconnect: "None",
    rampUpActionOnLogoff: "None",
    rampUpAutoStartHosts: "All",
    rampUpMinutesToWaitOnDisconnect: 10,
    rampUpMinutesToWaitOnLogoff: 10,
    rampUpStartTime: { hour: 6, minute: 0 },
    rampUpStartVMOnConnect: "Enable",
  };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.scalingPlanPersonalSchedules.create(
    resourceGroupName,
    scalingPlanName,
    scalingPlanScheduleName,
    scalingPlanSchedule,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scalingPlanPersonalSchedulesCreate();
}

main().catch(console.error);
