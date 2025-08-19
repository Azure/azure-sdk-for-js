// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates an existing Dashboard.
 *
 * @summary Updates an existing Dashboard.
 * x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/updateDashboard.json
 */

import type { PatchableDashboard } from "@azure/arm-portal";
import { Portal } from "@azure/arm-portal";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateADashboard(): Promise<void> {
  const subscriptionId =
    process.env["PORTAL_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["PORTAL_RESOURCE_GROUP"] || "testRG";
  const dashboardName = "testDashboard";
  const dashboard: PatchableDashboard = {
    tags: { aKey: "bValue", anotherKey: "anotherValue2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new Portal(credential, subscriptionId);
  const result = await client.dashboards.update(resourceGroupName, dashboardName, dashboard);
  console.log(result);
}

async function main(): Promise<void> {
  await updateADashboard();
}

main().catch(console.error);
