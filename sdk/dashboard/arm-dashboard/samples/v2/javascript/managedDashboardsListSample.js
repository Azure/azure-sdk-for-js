// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all resources of dashboards under the specified resource group.
 *
 * @summary list all resources of dashboards under the specified resource group.
 * x-ms-original-file: 2025-08-01/Dashboard_ListByResourceGroup.json
 */
async function dashboardListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDashboards.list("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dashboardListByResourceGroup();
}

main().catch(console.error);
