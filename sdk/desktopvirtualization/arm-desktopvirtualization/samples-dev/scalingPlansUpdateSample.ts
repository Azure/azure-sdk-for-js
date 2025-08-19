// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a scaling plan.
 *
 * @summary Update a scaling plan.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/ScalingPlan_Update.json
 */

import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function scalingPlansUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const scalingPlanName = "scalingPlan1";
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.scalingPlans.update(resourceGroupName, scalingPlanName);
  console.log(result);
}

async function main(): Promise<void> {
  await scalingPlansUpdate();
}

main().catch(console.error);
