// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of a specific dashboard definition.
 *
 * @summary get the properties of a specific dashboard definition.
 * x-ms-original-file: 2025-09-01-preview/DashboardDefinition_Get.json
 */
async function dashboardDefinitionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.dashboardDefinitions.get("myResourceGroup", "myDashboard", "default");
  console.log(result);
}

async function main() {
  await dashboardDefinitionGet();
}

main().catch(console.error);
