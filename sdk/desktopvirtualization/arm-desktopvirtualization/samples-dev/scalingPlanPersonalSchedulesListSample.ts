// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List ScalingPlanPersonalSchedules.
 *
 * @summary List ScalingPlanPersonalSchedules.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/ScalingPlanPersonalSchedule_List.json
 */

import type { ScalingPlanPersonalSchedulesListOptionalParams } from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function scalingPlanPersonalSchedulesList(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const scalingPlanName = "scalingPlan";
  const pageSize = 10;
  const isDescending = true;
  const initialSkip = 0;
  const options: ScalingPlanPersonalSchedulesListOptionalParams = {
    pageSize,
    isDescending,
    initialSkip,
  };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scalingPlanPersonalSchedules.list(
    resourceGroupName,
    scalingPlanName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await scalingPlanPersonalSchedulesList();
}

main().catch(console.error);
