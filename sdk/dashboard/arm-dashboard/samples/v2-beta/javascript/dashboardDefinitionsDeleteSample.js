// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a dashboard definition.
 *
 * @summary delete a dashboard definition.
 * x-ms-original-file: 2025-09-01-preview/DashboardDefinition_Delete.json
 */
async function dashboardDefinitionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  await client.dashboardDefinitions.delete("myResourceGroup", "myDashboard", "default");
}

async function main() {
  await dashboardDefinitionDelete();
}

main().catch(console.error);
