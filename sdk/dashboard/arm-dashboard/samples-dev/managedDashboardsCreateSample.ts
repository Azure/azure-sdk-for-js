// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create or update a dashboard for grafana resource. This API is idempotent, so user can either create a new dashboard or update an existing dashboard.
 *
 * @summary create or update a dashboard for grafana resource. This API is idempotent, so user can either create a new dashboard or update an existing dashboard.
 * x-ms-original-file: 2024-11-01-preview/Dashboard_Create.json
 */

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

async function dashboardCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.managedDashboards.create("myResourceGroup", "myDashboard", {
    location: "West US",
    tags: { Environment: "Dev" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await dashboardCreate();
}

main().catch(console.error);
