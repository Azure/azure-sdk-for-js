// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List ScalingPlanPooledSchedules.
 *
 * @summary List ScalingPlanPooledSchedules.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/ScalingPlanPooledSchedule_List.json
 */

import type { ScalingPlanPooledSchedulesListOptionalParams } from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function scalingPlanPooledSchedulesList(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const scalingPlanName = "scalingPlan1";
  const pageSize = 10;
  const isDescending = true;
  const initialSkip = 0;
  const options: ScalingPlanPooledSchedulesListOptionalParams = {
    pageSize,
    isDescending,
    initialSkip,
  };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scalingPlanPooledSchedules.list(
    resourceGroupName,
    scalingPlanName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await scalingPlanPooledSchedulesList();
}

main().catch(console.error);
