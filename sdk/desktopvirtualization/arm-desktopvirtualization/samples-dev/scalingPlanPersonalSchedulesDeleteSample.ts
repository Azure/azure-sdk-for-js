// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Remove a ScalingPlanPersonalSchedule.
 *
 * @summary Remove a ScalingPlanPersonalSchedule.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/ScalingPlanPersonalSchedule_Delete.json
 */

import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function scalingPlanPersonalSchedulesDelete(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const scalingPlanName = "scalingPlan1";
  const scalingPlanScheduleName = "scalingPlanScheduleWeekdays1";
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.scalingPlanPersonalSchedules.delete(
    resourceGroupName,
    scalingPlanName,
    scalingPlanScheduleName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scalingPlanPersonalSchedulesDelete();
}

main().catch(console.error);
