// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a specific dashboard definition.
 *
 * @summary get the properties of a specific dashboard definition.
 * x-ms-original-file: 2025-09-01-preview/DashboardDefinition_Get.json
 */
async function dashboardDefinitionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.dashboardDefinitions.get("myResourceGroup", "myDashboard", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await dashboardDefinitionGet();
}

main().catch(console.error);
