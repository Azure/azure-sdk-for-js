// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all resources of dashboards under the specified subscription.
 *
 * @summary list all resources of dashboards under the specified subscription.
 * x-ms-original-file: 2024-11-01-preview/Dashboard_List.json
 */
async function dashboardListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDashboards.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dashboardListByResourceGroup();
}

main().catch(console.error);
