// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a dashboard definition to update dashboard resource.
 *
 * @summary create a dashboard definition to update dashboard resource.
 * x-ms-original-file: 2025-09-01-preview/DashboardDefinition_Create.json
 */
async function dashboardDefinitionCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.dashboardDefinitions.create(
    "myResourceGroup",
    "myDashboard",
    "default",
    { properties: { serializedData: "<escapedDashboardJsonString>" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dashboardDefinitionCreate();
}

main().catch(console.error);
