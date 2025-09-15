// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a specific dashboard for grafana resource.
 *
 * @summary get the properties of a specific dashboard for grafana resource.
 * x-ms-original-file: 2024-11-01-preview/Dashboard_Get.json
 */
async function dashboardGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.managedDashboards.get("myResourceGroup", "myDashboard");
  console.log(result);
}

async function main(): Promise<void> {
  await dashboardGet();
}

main().catch(console.error);
