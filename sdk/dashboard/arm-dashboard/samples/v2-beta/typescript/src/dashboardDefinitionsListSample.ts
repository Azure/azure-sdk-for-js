// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all dashboard definitions under the specified dashboard.
 *
 * @summary list all dashboard definitions under the specified dashboard.
 * x-ms-original-file: 2025-09-01-preview/DashboardDefinition_List.json
 */
async function dashboardDefinitionList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dashboardDefinitions.list("myResourceGroup", "myDashboard")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dashboardDefinitionList();
}

main().catch(console.error);
