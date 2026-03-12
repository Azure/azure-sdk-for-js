// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Remove a ScalingPlanPooledSchedule.
 *
 * @summary Remove a ScalingPlanPooledSchedule.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/ScalingPlanPooledSchedule_Delete.json
 */

import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function scalingPlanPooledSchedulesDelete(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const scalingPlanName = "scalingPlan1";
  const scalingPlanScheduleName = "scalingPlanScheduleWeekdays1";
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.scalingPlanPooledSchedules.delete(
    resourceGroupName,
    scalingPlanName,
    scalingPlanScheduleName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scalingPlanPooledSchedulesDelete();
}

main().catch(console.error);
