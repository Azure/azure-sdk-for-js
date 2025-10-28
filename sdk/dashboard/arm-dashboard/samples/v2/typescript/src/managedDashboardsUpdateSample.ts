// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a dashboard for Grafana resource.
 *
 * @summary update a dashboard for Grafana resource.
 * x-ms-original-file: 2025-08-01/Dashboard_Update.json
 */
async function dashboardUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.managedDashboards.update("myResourceGroup", "myDashboard", {
    tags: { Environment: "Dev 2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await dashboardUpdate();
}

main().catch(console.error);
